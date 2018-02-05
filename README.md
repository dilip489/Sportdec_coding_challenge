# Sportdec

[![N|Solid](https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/nodejs-256.png)](https://nodejs.org/en/)

## Tech

Sportdec coding challege uses following open source tools:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [MochaJs](https://mochajs.org/)- for unit test

## Instructions
In the .env file, please add TWITTER_CONSUMER_KEY & TWITTER_SECRET_KEY

## Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd Sportdec
$ npm install
$ npm start
> sportdec@0.0.0 start /path/to/Sportdec
> node ./bin/www
```
Server will be running on port 8000
## Run Tests

```sh
$ npm test
```
## Rest APIs
### GET
http://localhost:8000/search?q=football
Results in an array with 5 random github projects with corresponding tweets

### GET
http://localhost:8000/github/search/repositories?searchq=football&language=node&sort=stars&order=desc
Results in an array of github projects with query 'football' wriiten using nodejs

### GET
http://localhost:8000/twitter/search/tweets?q=football&result_type=mixed&t_count=5
Results in an array of tweets with query 'football'



