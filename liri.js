var keys = require('./keys');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
//var omdb = require('omdb')
// var inquirer = require('inquirer');
var fs = require('fs');


//LIRI BOT - Command line bot that executes commands based on input

//Grab user input with process.argv
var inputString = process.argv;

var userInput = inputString[2];
var userSearch = inputString[3];



//create a switch case to execute all of the functions based on the command entered

function userCommand(userInput, userSearch) {

    switch (userInput){
        case "my-tweets":
            reqTweets();
            break;
        case "spotify-this-song":
            reqSongs();
            break;
        case "movie-this":
            reqMovie();
            break;
        case "do-what-it-says":
            goLIRI();
            break;
        default: console.log("Sorry, not a recognized command");
    }
}

//command functions - my-tweets, spotify-this-song, movie-this, do-what-it-says

//my-tweets - This command will show the last 20 tweets in the console
function reqTweets(){
    //create a variable for the keys
	var client = new Twitter(
		keys.twitterKeys
	);
    //create a variable to input as parameters => Twitter username and count of tweets to grab
	var params = {
		screen_name: 'TheKingdomDev',
		count: 20
	};
        //use the twitter key and parameters to get data from the API - loop over and print out each of the tweets to the console
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  	
		  	if (!error) {
		    	for (i=0; i<tweets.length; i++){
		    		console.log(i + " " + tweets[i].text + " Time Created: " + tweets[i].created_at);
		    		// appendLog(i + " " + tweets[i].text + " Time Created: " + tweets[i].created_at);
                    //create a variable to store the data from the request append that JSON data
		    		var twitterLog ={
		    				tweetNumber: i,
		    				tweetText: tweets[i].text,
		    				tweetTime: tweets[i].created_at
		    		}
                    //append to log.txt
		    		appendLog(JSON.stringify(twitterLog));		    		    		
		    	}
		  	}else{
		  		return console.log("Error!");
		  		}
			});
}
//spotify-this-song - Make a request to the Spotify API about the song input and return Artist(s), Song Name, Preview Link, Album, if no song provided play "The Sign" by Ace of Base

//create a function that will log out the full song log for the search - append that data as JSON
// function showSong(track){
// 	console.log(track.artists[0].name);
// 	console.log(track.name);
// 	console.log(track.preview_url);
// 	console.log(track.album.name);
// 	// appendLog(track.artists[0].name);
// 	// appendLog(track.name);
// 	// appendLog(track.preview_url);
// 	// appendLog(track.album.name);
// 	var songLog ={
// 		Artist: track.artists[0].name,
// 		Name: track.name,
// 		PreviewURL: track.preview_url,
// 		Album: track.album.name
// 	}
//     //append to log.txt
// 	appendLog(JSON.stringify(songLog));
// }
//request to spotify based on the userSearch loop over the data and store the track - if nothing is entered by the user play "The Sign"
function reqSongs(song) {
    if (userSearch) {
        spotify.search({ type: 'track', query: userSearch }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("---------------------------------");
                console.log("ARTIST NAME: " + data.tracks.items[0].album.artists[0].name);
                console.log("SONG NAME: " + data.tracks.items[0].name);
                console.log("SONG PREVIEW URL: " + data.tracks.items[0].preview_url);
                console.log("ALBUM NAME: " + data.tracks.items[0].album.name);
            }
        });
    }

    // If the user doesn't type a song in, "The Sign by Ace of Base" is returned to console
    else {

        spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE" }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("\nSONG NAME: " + data.name);
                console.log("ALBUM: " + data.album.name);
                console.log("ARTIST: " + data.artists[0].name);
                console.log("SONG PREVIEW URL: " + data.preview_url);
            }
        });
    }
    if (userSearch) {
        appendLog(userInput, userSearch);
    } else {
        appendLog(userInput, "The Sign by Ace of Base");
    }

}
    //req to spotify - query is userSearch
	// spotify.search({ type: 'track', query: userSearch }, function(err, data) {
	//     if ( err ) {
	//         console.log('Error occurred: ' + err);
	//         return;
	//     	}else{
    //         //loop over the data
	//     	for(i=0; i<data.tracks.items.length; i++){
    //             //store it
	//     		var track = data.tracks.items[i];
    //             // check if they match and call the show song function
	//     		if (userSearch.length != 0){
	//     			showSong("The Sign");
	//     			return;
	//     		}else{
	// 				showSong(track);
	// 			}
	//     	}
            //req to spotify if no input, the req proceeds and returns "The Sign"
		 	// spotify.search({ type: 'track', query: userSearch }, function(err, data) {
		    // 		if ( err ) {
		    //     		console.log('Error occurred: ' + err);
		    //     		return;
		    // 		}else{
		    // 			for(i=0; i<data.tracks.items.length; i++){
		    // 				var track = data.tracks.items[i];
			// 				if (track.name.toLowerCase() === "The Sign".toLowerCase()){
			// 					showSong(track);
			// 					return;
			// 				}
		    // 			}
		    // 		}
		    // });
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

function reqMovie(){
    //Use the OMDB API link with the userSearch value
	var queryURL = ('http://www.omdbapi.com/?t=' + userSearch + '&y=&plot=short&r=json&tomatoes=true');
    //create a variable to hold parameters to pass into the request
	var params = {
		uri: queryURL,
		json: true
	};
        //request to the OMDB API, passing in the parameters - if the status code is good console out the correct data
		request(params, function (error, response, body) {
	  		if (!error && response.statusCode == 200) {
	  			console.log("Title: " + body.Title);
	    		console.log("Year: " + body.Year);
	    		console.log("IMDB Rating: " + body.imdbRating);
	    		console.log("Country: " + body.Country);
	    		console.log("Plot: " + body.Plot);
	    		console.log("Actors: " + body.Actors);
	    		console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
	    		console.log("Rotten Tomatoes URL: " + body.tomatoURL);
	    		appendLog(body);
	    		return; 
	  		}else{
	  			console.log(error);
	  		}
		});
}

//do-what-it-says - using the node fs package, take the text inside the random.txt file and use it to call one of LIRI's commands
function goLIRI(){
	//call the require and add the read method, pass in random.txt as a parameters
	fs.readFile('random.txt', 'utf8', function(error,data){
		//take the data and split it
		var defaultData = data.split(',');
        //log out the data
		console.log(defaultData);
        //modify the global variables to read the command and then the request
		userInput = defaultData[0];
		userSearch = defaultData[1];
        //log them out
		console.log(userInput);
		console.log(userSearch);
        //pass them into LIRI and you have your do-what-it-says
		userCommand(userInput, userSearch);
		
		return;
	});
}
//call user command function
userCommand(userInput, userSearch);

//bonus - output the data to the log.txt file (use append?) don't overwrite the file with each command
function appendLog(data){
	fs.appendFile('log.txt', data + '\n', function(err){
		if (err){
			console.log(err);
		}else{
			console.log("Log Updated");
		}
	})
}
