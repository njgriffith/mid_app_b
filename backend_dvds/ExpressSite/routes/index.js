const createError = require("http-errors");
var express = require("express");
var router = express.Router();
const dvd = require("../modules/dvd");
const team = require("../modules/team");

router.get("/dvds/all", function (req, res, next) {
  const result = dvd.getAllMovies();
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.get("/dvds/all/:location", (req, res, next) => {
  const param = req.params.location;
  console.log(param);
  if (param.toLowerCase() != "raleigh" && param.toLowerCase() != "durham") {
    next(createError(400));
  }
  console.log("got into dvds/all/:location " + param);
  const result = dvd.getAllByLocation("location", param);
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.get("/dvds/team", (req, res, next) => {
  const result = team.getTeam();
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.post("/dvds/add", (req, res, next) => {
  const body = req.body;
  console.log("***********" + req.body);
  if(body.title == undefined) {
    res.status(400).send();
  }
  
  console.log(body);
  const result = dvd.addMovie(body);
  
})

module.exports = router;
