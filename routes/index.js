var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

/* GET home page. */
router.get('/search', function(req, res, next) {
	var gitHubOptions = {
	  url: process.env.HOST + 'github/search/repositories?searchq='+ encodeURIComponent(req.query.q) +'&sort=stars&order=desc',
	  headers: {
	    'content-type' : 'application/x-www-form-urlencoded'
	  }
	};
  request(gitHubOptions, function (error, response, body) {
	  if (!error) {
	  	body = JSON.parse(body);
	  	async.map(body, function(project, callback) {
	  		var twitterOptions = {
	  			url: process.env.HOST + 'twitter/search/tweets?searchq=' + encodeURIComponent(project.project_name) + '&result_type=mixed&count=10',
				  headers: {
				    'content-type' : 'application/x-www-form-urlencoded'
				  }
	  		}
	  		request(twitterOptions, function(error, response, tbody){
	  			tbody = JSON.parse(tbody);
	  			var tweets = [];
	  			if(tbody.length > 0){
		  			for(var j=0; j<tbody.length; j++){
		  				var tweet = {
		  					id: tbody[j].id_str,
		  					posted_time: tbody[j].created_at,
		  					text: tbody[j].text,
		  					name: tbody[j].user.name,
		  					user_handle: tbody[j].user.screen_name
		  				};
		  				if(tbody[j].entities.urls.length > 0){
		  					tweet.url = tbody[j].entities.urls[0].url
		  				}
		  				tweets.push(tweet);
		  			}
	  			}
		  		project.tweets = tweets;
	  			callback(null, project);
	  		});
			}, function(err, results) {
			    res.send(results);
			});
	  }
	});
});

module.exports = router;
