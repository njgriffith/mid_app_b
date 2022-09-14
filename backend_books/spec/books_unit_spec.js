let request = require("request");
let books = require("../modules/books");

let base_url = "http://localhost:3034/";

describe("Unit tests on books module", () => {
    describe("load all books", () => {
        //positive test to load all books
        it("have four elements", () => {
            let results = books.list();
            expect(results.length).toBe(4);
        });
        it("contains title", (done) => {
            request.get(base_url + "books/all", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        //exception test to load book by cell phone (argument does not exists)
        it("with cell phone number +00000", () => {
            expect(() => {
                books.query_by_arg("cellphone", "+000000");
            }).toThrow("Unknown parameter cellphone");
        });
        //negative test to load book by cell phone (value does not exists)
        it("with title How to feed dog", () => {
            let results = books.query_by_arg("Title", "How to feed a dog");
            expect(results).toBeNull();
        });
    });
});
