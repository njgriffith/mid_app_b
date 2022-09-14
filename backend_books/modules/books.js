const fs = require('fs');

let read_json_file = () => {
    let file = './data/books.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.query_by_arg = (arg, value) => {
    let json_result = JSON.parse(read_json_file());
    // all addresses are stored in a "result" object
    let result = json_result.result;
    console.log("query by arg: " + arg + " " + value);
    
    for (let i = 0; i < result.length; i++) {
        let book = result[i];
        if (book[arg] === undefined){
            throw new Error("Unknow parameter " + arg);
        }
        if (book[arg] === value) {
            return book;
        }
    }
    return null;
};
