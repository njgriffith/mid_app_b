var express = require('express');
var router = express.Router();

var axios = require('axios');
const fs = require('fs');


let read_json_file = (filename) => {
  let file = './data/'+filename;
 //console.log("in read");
  return fs.readFileSync(file);
}

router.get('/classB/team', function(request, response, next) {
  response.setHeader('content-type', 'application/json');
  response.end(JSON.stringify( JSON.parse(read_json_file("team.json")) ));
});

/* LAPTOP SERVICE CALLS */
router.get('/classB/laptops/all/:location', function (request, response, next) {
  const loc = request.params.location
  axios.get(`http://localhost:3036/laptops/all/${loc}`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});

router.get('/classB/laptops/team', function(request, response, next) {
  axios.get(`http://localhost:3036/laptops/team`)
    .then(resp => {
      response.send(resp.data);
      response.status(200).send();
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});

router.post('/classB/laptops/add', function(request, response, next) {
  // console.log(response);
  // if(request === undefined) {
  //   response.status(400).send();
  //   return;
  // }
  if(request.body === undefined) {
    response.status(400).send();
    return;
  }
  axios.post(`http://localhost:3036/laptops/add`, request.body)
    .then(resp => {
      response.json(request.body);
      console.log("in here");
    })
    .catch(e => {
      console.log("in error");
      response.status(e.status).send(e.message);
    })
});


/* END OF LAPTOP SERVICE CALLS  */



/* DVDs SERVICE CALLS */
router.get('/classB/dvds/all/', function(request, response, next) {
  axios.get(`http://localhost:3035/dvds/all/`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});


router.get('/classB/dvds/all/:location', function(request, response, next) {
  const loc = request.params.location
  axios.get(`http://localhost:3035/dvds/all/${loc}`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});

router.get('/classB/dvds/team', function(request, response, next) {
  axios.get(`http://localhost:3035/dvds/team`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});

router.post('/classB/dvds/add', function(request, response, next) {
  axios.post(`http://localhost:3035/dvds/add`, request.body)
    .then(resp => {
      response.json(request.body)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});


/* END OF DVDs SERVICE CALLS */


/* BOOKs SERVICE CALLS */
router.get('/classB/books/all/', function(request, response, next) {
  axios.get(`http://localhost:3034/books/all/`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});


router.get('/classB/books/all/:location', function(request, response, next) {
  const loc = request.params.location
  axios.get(`http://localhost:3034/books/all/${loc}`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});

router.get('/classB/books/team', function(request, response, next) {
  axios.get(`http://localhost:3034/books/team`)
    .then(resp => {
      response.send(resp.data)
    })
    .catch(e => {
      response.status(400).send(e.message)
    })
});

/* END OF BOOKs SERVICE CALLS */

module.exports = router;
