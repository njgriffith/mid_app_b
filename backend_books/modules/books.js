const fs = require('fs');

let read_json_file = () => {
    let file = './data/books.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.getAllByLocation = (arg, value) => {
    let taxRate;
    let result = JSON.parse(file());
    switch(value.toLowerCase()) {
        case "raleigh":
            taxRate = 0.075;
            break;
        case "durham":
            taxRate = 0.08;
            break;
    }

    for (let i = 0; i < result.length; i++) {
    
        let book = result[i];
        let price = book.price;
        book.price =(price * (1 + taxRate)).toFixed(2);

    }
    // all addresses are stored in a "result" object
    return result;
  };

  exports.query_by_arg = (arg, value) => {
    let result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    //let result = json_result.result;
    console.log("query by arg: " + arg + " " + value);
    
    for (let i = 0; i < result.length; i++) {
        let book = result[i];
        if (book[arg] === undefined){
            throw new Error("Unknown parameter " + arg);
        }
        if (book[arg] === value) {
            return book;
        }
    }
    return null;
};