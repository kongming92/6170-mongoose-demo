var Time = require('../util/time');
var mongoose = require('mongoose');


// Exercise 1:
// Declare a schema and make a model for a Movie
// A Movie should have 2 things:
//	- a title, which is a String
//	- a time, which is a Number
//		- to get a Number, take a string like "3:00pm" and call Time.parse on it (see below)
//		- This will throw an error if the string is malformed; we will fix this later

// ----- EXERCISE 1 SOLUTION -----
var movieSchema = mongoose.Schema({
	title: String,
	time: Number,
	theater: {type: Number, ref: 'Theater'}	// EXERCISE 4 SOLUTION
});

exports.Movie = mongoose.model('Movie', movieSchema);
// ----- EXERCISE 1 SOLUTION -----

// Exercise 3:
// Declare a schema and make a model for a Theater
// A Theater should have 3 things:
//	- an _id, which is a Number
//	- a name, which is a String
//	- a location, which is a String

// ----- EXERCISE 3 SOLUTION -----
var theaterSchema = mongoose.Schema({
	_id: Number,
	name: String,
	location: String,
});

// Exercise 7:
// Define an instance method on theaterSchema called getDescription
// which should return the concatenation of the name and location, separated by a dash
// For more information, see the Instance Methods section here:
// http://mongoosejs.com/docs/guide.html

// YOUR CODE HERE

exports.Theater = mongoose.model('Theater', theaterSchema);
// ----- EXERCISE 3 SOLUTION -----

// Exercise 4:
// Extend the Movie schema above to include a reference to a Theater
// For some help on references, see the first example here:
// http://mongoosejs.com/docs/populate.html

// Below is a predefined array of movies and theaters to make populating our database easier

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
