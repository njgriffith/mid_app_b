const createError = require("http-errors");
var express = require("express");
var router = express.Router();

const book = require("../modules/books");
const team = require("../modules/members");

router.get("/books/all", function (req, res, next) {
  const result = book.list();
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } 
  else {
    res.status(404).send();
  }
});

router.get("/books/all/:location", (req, res, next) => {
  const param = req.params.location;

  if (param.toLowerCase() != "raleigh" && param.toLowerCase() != "durham") {
    res.status(400).send();  
  }
  console.log("got into books/all/:location " + param);
  const result = book.getAllByLocation("location", param);
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } 
  else {
    res.status(404).send();
  }
});

// router.post("/dvds/add", (request, response, next) => {});

// router.get("/dvds/team", (req, res, next) => {
//   const result = team.getTeam();
//   if (result) {
//     res.setHeader("content-type", "application/json");
//     res.end(JSON.stringify(result));
//   } else {
//     next(createError(404));
//   }
// });


// var express = require('express');
// var router = express.Router();

// const createError = require('http-errors');
// const books = require('../modules/books');
// const members = require('../modules/members');
// const url = require('url');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Books' });
// });




router.get('/books/team', (request, response, next) => {
  let get_params = url.parse(request.url, true).query;
  console.log('got into teams');

  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(members.list()));
  } 
});

 module.exports = router;
