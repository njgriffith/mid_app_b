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


router.get("/books/team", (req, res, next) => {
  const result = team.list();
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } 
  else {
    next(createError(404));
  }
});

 module.exports = router;
