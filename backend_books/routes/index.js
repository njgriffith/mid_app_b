var express = require('express');
var router = express.Router();

const createError = require('http-errors');
const books = require('../data/books');
const members = require('../data/members');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Books' });
});

// GET all books in database, can pass in location param to filter results
router.get('/books', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('got into books');

  // no param shows all books
  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(books.list()));
  } 
  else {
    let key = Object.keys(get_params)[0]; // get first parameter only
    console.log("First key is: " + key);
    let value = request.query[key];
    console.log('params ' + value);
    try {
      let result = books.query_by_arg(key, value);
    } 
    catch (err) {
      console.log("Caught exception.");
      //createError(500);
      res.status(500).send('Something broke!');
    }
  }

  let result = contacts.query_by_arg(key, value);
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } 
  else {
    next(createError(404));
  }
});

router.get('/books/team', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('got into teams');

  // no param shows all books
  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(members.list()));
  } 
});

module.exports = router;


