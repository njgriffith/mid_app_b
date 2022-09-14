const fs = require("fs");
let read_movies_file = () => {
  let file = "./data/movies.json";
  return fs.readFileSync(file);
};
exports.list = function () {
  return JSON.parse(read_movies_file());
};
exports.getAllMovies = () => {
  let result = JSON.parse(read_movies_file());
  // all addresses are stored in a "result" object
  return result;
};

exports.getAllByLocation = (arg, value) => {
    let taxRate;
    let result = JSON.parse(read_movies_file());
    switch(value.toLowerCase()) {
        case "raleigh":
            taxRate = 0.075;
            break;
        case "durham":
            taxRate = 0.08;
            break;
    }

    

    for (let i = 0; i<result.length; i++) {
       let dvd = result[i];
       let price = dvd.price;
       dvd.price =(price * (1 + taxRate)).toFixed(2);

    }
    // all addresses are stored in a "result" object
    return result;
  };
