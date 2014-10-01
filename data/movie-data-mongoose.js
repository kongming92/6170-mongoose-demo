var Time = require('../util/time');
var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title: String,
	time: Number,
	theater: {type: Number, ref: 'Theater'}	// EXERCISE 4 SOLUTION
});

var theaterSchema = mongoose.Schema({
	_id: Number,
	name: String,
	location: String,
});

theaterSchema.methods.getDescription = function() {
	return this.name + " - " + this.location;
};

var Movie = mongoose.model('Movie', movieSchema);
var Theater = mongoose.model('Theater', theaterSchema);

var checkLength = function(s) {
	return s.length > 0;
};

var checkNegative = function(n) {
	return n >= 0;
};

Movie.schema.path('title').validate(checkLength, "Title cannot be empty");
Movie.schema.path('theater').validate(checkNegative, "Theater id cannot be negative");
Theater.schema.path('_id').validate(checkNegative, "Theater id cannot be negative");
Theater.schema.path('name').validate(checkLength, "Theater name cannot be empty");
Theater.schema.path('location').validate(checkLength, "Theater location cannot be empty");

exports.Movie = Movie;
exports.Theater = Theater;

exports.theaterArray = [
  {_id: 1, name: "Legacy Place", location: "Dedham"},
  {_id: 2, name: "West Newton Cinema", location: "Newton"},
  {_id: 3, name: "Fenway Stadium", location: "Boston"}
  ];

exports.movieArray = [
  {
    title: "Fury",
    time: Time.parse("7:00pm"),
    theater: 2
  }, {
    title: "Lucy",
    time: Time.parse("8:30pm"),
    theater: 2
  }, {
    title: "Boyhood",
    time: Time.parse("9:00pm"),
    theater: 2
  }, {
    title: "Chef",
    time: Time.parse("10:00pm"),
    theater: 2
  }, {
    title: "Lucy",
    time: Time.parse("7:00pm"),
    theater: 1
  }, {
    title: "Boyhood",
    time: Time.parse("7:00pm"),
    theater: 1
  }, {
    title: "Fury",
    time: Time.parse("9:00pm"),
    theater: 1
  }, {
    title: "Chef",
    time: Time.parse("9:00pm"),
    theater: 1
  }, {
    title: "Boyhood",
    time: Time.parse("9:00pm"),
    theater: 1
  }, {
    title: "Chef",
    time: Time.parse("7:00pm"),
    theater: 3
  }, {
    title: "Divergent",
    time: Time.parse("9:00pm"),
    theater: 3
  }, {
    title: "Neighbors",
    time: Time.parse("9:00pm"),
    theater: 3
  }, {
    title: "Maleficent",
    time: Time.parse("9:00pm"),
    theater: 3
  }];
