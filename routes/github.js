var express = require('express');
var router = express.Router();
var request = require('request');
var random = require('random-js')();

/* Search from Github and choose 5 random repos. */
router.get('/search/repositories/', function(req, res, next) {
	var githubUrl = process.env.GIT_HUB_URL + 'q=' + encodeURIComponent(req.query.searchq) + '+&language:' + encodeURIComponent(req.query.language) + '&sort=' + encodeURIComponent(req.query.sort) + '&order=' + encodeURIComponent(req.query.order) + '&page&per_page=5000';
	var options = {
	  url: githubUrl,
	  headers: {
	    'User-Agent': 'sport_dec_coding_challenge'
	  }
	};
	return new Promise(function(resolve, reject){
		request(options, function (error, response, body) {
		  if (!error) {
		  	body = JSON.parse(body);
	  		var result = [];
	  		for(var i=0; result.length < 5;){
	  			var item = {
		  			project_name: body.items[i].name,
		  			full_name: body.items[i].full_name,
		  			owner: body.items[i].owner.login,
		  			url: body.items[i].html_url
		  		}
		  		result.push(item);
	  			i = random.integer(1, body.items.length-1);
	  		}
		  	resolve(result);
		  	res.send(result);
		  }else{
		  	console.error('Error in github.js: ', error);
		  	reject(error);
		  }
		});
	});
});

module.exports = router;
