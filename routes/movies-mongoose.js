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
    // Exercise 2:
    // Get the list of Movies, sorted by ascending order of time
    // Remember, the Mongoose object is data.Movie
    // Look at views/movies/index.ejs to see what the view expects.

    // Exercise 5:
    // Extend the query below to populate each Movie with its Theater information
    // For more information, check out the Populate section here:
    // http://mongoosejs.com/docs/populate.html

    // ----- EXERCISE 2, 5 SOLUTION -----
    data.Movie.find({}).sort({time: 'asc'}).populate('theater').exec(function (error, movies) {
      res.render('movies/index', {movies: movies.map(formatMovie)});
    });
    // ----- EXERCISE 2, 5 SOLUTION -----
  });
};

// Exercise 6:
// Extend the object returned by the formatMovie function to include the Theater's name
// Remember that you've already replaced the reference to the Theater object with
// the actual object

// Exercise 8:
// Use the getDescription method created in Exercise 7 in place of movie.theater.name
var formatMovie = function(movie) {
  return {
    title: movie.title,
    time: Time.unparse(movie.time),
    theater: movie.theater.getDescription() // EXERCISE 8 SOLUTION
  };
};

module.exports = router;
