var keys = require('./keys');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
//var omdb = require('omdb')
var inquirer = require('inquirer');
var fs = require('fs');


//LIRI BOT - Command line bot that executes commands based on input

//Grab user input with process.argv
var inputString = proces.argv;

var userInput = inputString[2];
var userSearch = inputString[3];

//command functions - my-tweets, spotify-this-song, movie-this, do-what-it-says

//create a switch case to execute all of the functions based on the command entered

functions userCommand(userInput, userSearch) {

    switch (userInput){
        case "my-tweets":
            grabTweets();
            break;
        case "spotify-this-song":
            grabSong();
            break;
        case "movie-this":
            grabMovie();
            break;
        case "do-what-it-says":
            grabLIRI();
            break;
        default: console.log("Sorry, not a recognized command");
    }
}

//my-tweets - This command will show the last 20 tweets in the console

//spotify-this-song - Make a request to the Spotify API about the song input and return Artist(s), Song Name, Preview Link, Album, if no song provided play "The Sign" by Ace of Base

//movie-this - console the following data from a movie entered after the command.
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
//    * Rotten Tomatoes Rating.
//    * Rotten Tomatoes URL.

//do-what-it-says - using the node fs package, take the text inside the random.txt file and use it to call one of LIRI's commands

//bonus - output the data to the log.txt file (use append?) don't overwrite the file with each command