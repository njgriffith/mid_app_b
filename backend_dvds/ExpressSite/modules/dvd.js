const fs = require("fs");
const createHttpError = require("http-errors");
let read_movies_file = () => {
  let file = "./data/movies.json";
  return fs.readFileSync(file);
};

let write_to_database = (data) => {
    let file = "./data/movies.json";
    fs.writeFileSync(file, JSON.stringify(data));
    return 'Data Written';
}
exports.list = function () {
  return JSON.parse(read_movies_file());
};
exports.getAllMovies = () => {
  let result = JSON.parse(read_movies_file());
  // all addresses are stored in a "result" object
  return result;
};

exports.addMovie = (movie) => {
    let movie_list = JSON.parse(read_movies_file());
    movie_list.push(movie);
    let result = write_to_database(movie_list);
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
