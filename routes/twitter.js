var express = require('express');
var router = express.Router();
var request = require('request');


/* Get OAuth token for Twitter */
getOAuth = function(){
	var encoded_bearer_token = 'Basic ' + new Buffer(encodeURIComponent(process.env.TWITTER_CONSUMER_KEY) + ':' + encodeURIComponent(process.env.TWITTER_SECRET_KEY)).toString('base64');
	return new Promise(function(resolve, reject){
		request.post({
		  headers: {
		  	'content-type' : 'application/x-www-form-urlencoded',
		  	'User-Agent': 'sport_dec_coding_challenge',
		  	'Authorization' : encoded_bearer_token
		  },
		  url: 'https://api.twitter.com/oauth2/token',
		  body: "grant_type=client_credentials"
		  
		}, function(error, response, body){
			if(!error){
				resolve(JSON.parse(body).access_token);
			}
		});
	});
}

/* GET Tweets based on query string */
router.get('/search/tweets/', function(req, res, next) {
	getOAuth().then(function(token){
		var twitterSearchUrl = process.env.TWITTER_SEARCH_URL + 'q=' + req.query.searchq + '&result_type=' + req.query.result_type + '&count=' + req.query.count
		var options = {
		  url: twitterSearchUrl,
		  headers: {
		    'content-type' : 'application/x-www-form-urlencoded',
		  	'User-Agent': 'sport_dec_coding_challenge',
		    'Authorization': 'Bearer ' + token
		  }
		};
		return new Promise(function(resolve, reject){
			request(options, function (error, response, body) {
			  if (!error) {
			  	resolve(JSON.parse(body).statuses);
			  	res.send(JSON.parse(body).statuses);
			  }
			});
		});
	});
});

module.exports = router;