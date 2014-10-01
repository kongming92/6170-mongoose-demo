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

// When insertMovies is done, we set up routes.
var insertMovies = function (db) {
  var inserted = 0;
  data.movieArray.forEach(function (movie) {
    var m = new data.Movie(movie);
    m.save(function (err) {
      // assume no errors
      inserted++;
      if (inserted == data.movieArray.length) {
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
    // YOUR CODE HERE
  });
};

module.exports = router;
