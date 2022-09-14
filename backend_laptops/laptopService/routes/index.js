var express = require('express');
var router = express.Router();

const fs = require('fs');

let read_json_file = (filename) => {
  let file = './data/'+filename;
 //console.log("in read");
  return fs.readFileSync(file);
}

let pasreJSONandUpdate = (salesTax) => {
 // console.log("In update");
  let result = JSON.parse(read_json_file("laptops.json"));
  for (let i = 0; i < result.length; i++) {
    result[i]["price"] = (result[i]["price"] * salesTax).toFixed(2);
  }
  return result;
}

router.get('/laptops/team', function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify( JSON.parse(read_json_file("team.json")) ));
});

router.get('/laptops/all/:location', (request, res, next) => {
  const location = request.params.location;
  //console.log("got location: "+location);

  if (location === "Raleigh") {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify( pasreJSONandUpdate(1.075)));
  } else if (location === "Durham") {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify( pasreJSONandUpdate(1.08)));
 } else {
    res.status(400).send('Request param needs to be either Raleigh or Durham');
 }
  
});

router.post('/laptops/add',(request,response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  // console.log(request.body);

  addLaptop(request.body, response);
  // response.status(200).send();
});

let addLaptop = (laptopJson, response) => {
  if (laptopJson["product"] == undefined || laptopJson["brand"] == undefined || laptopJson["CPU"] == undefined || 
      laptopJson["memory"] == undefined || laptopJson["price"] == undefined ) {
    //console.log("in here idk man");
    //console.log(JSON.stringify(laptopJson));
    response.status(400).send();
    return;
  }

  let file = './data/laptops.json';
  let result = JSON.parse(read_json_file("laptops.json"));
  result[result.length] = laptopJson;

  fs.writeFile(file, JSON.stringify(result), err => {
    if (err) {
      console.log("Error writing file:", err);
      response.status(500).send();
      return;
    }
  });
  response.status(200).send();
  return;
}


module.exports = router;
