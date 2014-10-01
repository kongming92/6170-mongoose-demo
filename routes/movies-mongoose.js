var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Time = require('../util/time');
var data = require('../data/movie-data-mongoose');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-movie-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));

// Here we "open" the database. Remember, Node is single threaded
// Thus we must attach callbacks to every non-instantaneous operation
// The series of callbacks gives the sequence of execution:
// First, we open the database, then call insertMovies.
db.once('open', function callback () {
  mongoose.connection.db.dropDatabase(
    function (err, result) {
      insertMovies(db);
    }
  );
});

// When insertMovies is done, we insert theaters and then set up routes.
var insertMovies = function (db) {
  var inserted = 0;
  data.movieArray.forEach(function (movie) {
    var m = new data.Movie(movie);
    m.save(function (err) {
      // assume no errors
      inserted++;
      if (inserted == data.movieArray.length) {
        insertTheaters(db);
      }
    });
  });
};

var insertTheaters = function (db) {
  var inserted = 0;
  data.theaterArray.forEach(function (theater) {
    var t = new data.Theater(theater);
    t.save(function (err) {
      // assume no errors
      inserted++;
      if (inserted == data.theaterArray.length) {
        setupRoutes(db);
      }

    });
  });
};

var setupRoutes = function (db) {
  router.get('/', function(req, res) {
    var errorstr = '';
    if (req.query.error) {
      errorstr = req.query.error;
    }
    data.Movie.find({}).sort({time: 'asc'}).populate('theater').exec(function (error, movies) {
      res.render('movies/index', {movies: movies.map(formatMovie), error: errorstr});
    });
  });

  router.get('/new', function(req, res) {
    data.Theater.find({}).sort({name: 'asc'}).exec(function(error, theaters) {
      res.render('movies/new', {
        theaters: theaters.map(function(theater) {
          return {
            _id: theater._id,
            name: theater.name,
            location: theater.location
          };
        })
      });
    });
  });

  router.post('/', function(req, res) {
    var time = req.body.time;
    if (Time.canParse(time)) {
      time = Time.parse(time);
      var newMovie = new data.Movie({
        title: req.body.title,
        time: time,
        theater: req.body.theaterId
      });
      newMovie.save(function(error) {
        if (error) {
          handleValidateError(res, error.errors, '/movies');
        } else {
          res.redirect('/movies');
        }
      });
    } else {
      res.redirect('/movies?error=Invalid+time');
    }
  });
};

var handleValidateError = function(res, errors, redirURL) {
  for (var key in errors) {
    if (errors.hasOwnProperty(key)) {
      var redir = redirURL + "?error=" + errors[key].message;
      res.redirect(redir);
    }
  }
};

var formatMovie = function(movie) {
  return {
    title: movie.title,
    time: Time.unparse(movie.time),
    theater: movie.theater.getDescription()
  };
};

module.exports = router;
