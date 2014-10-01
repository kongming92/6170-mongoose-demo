var Time = require('../util/time');
var mongoose = require('mongoose');


// Exercise 1:
// Declare a schema and make a model for a Movie
// A Movie should have 2 things:
//	- a title, which is a String
//	- a time, which is a Number
//		- to get a Number, take a string like "3:00pm" and call Time.parse on it (see below)
//		- This will throw an error if the string is malformed; we will fix this later

// YOUR CODE HERE


// Below is a predefined array of movies to make populating our database easier

exports.movieArray = [
	{
		title: "Fury",
		time: Time.parse("7:00pm")
	}, {
		title: "Lucy",
		time: Time.parse("8:30pm")
	}, {
		title: "Boyhood",
		time: Time.parse("9:00pm")
	}, {
		title: "Chef",
		time: Time.parse("10:00pm")
	}, {
		title: "Lucy",
		time: Time.parse("7:00pm")
	}, {
		title: "Boyhood",
		time: Time.parse("7:00pm")
	}, {
		title: "Fury",
		time: Time.parse("9:00pm")
	}, {
		title: "Chef",
		time: Time.parse("9:00pm")
	}, {
		title: "Boyhood",
		time: Time.parse("9:00pm")
	}, {
		title: "Chef",
		time: Time.parse("7:00pm")
	}, {
		title: "Divergent",
		time: Time.parse("9:00pm")
	}, {
		title: "Neighbors",
		time: Time.parse("9:00pm")
	}, {
		title: "Maleficent",
		time: Time.parse("9:00pm")
	}];
