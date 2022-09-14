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
  if (param.toLowerCase() != "raleigh" || param.toLowerCase() != "durham") {
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

router.post("/dvds/add", (request, response, next) => {});

router.get("/dvds/team", (req, res, next) => {
  const result = team.getTeam();
  if (result) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

module.exports = router;
