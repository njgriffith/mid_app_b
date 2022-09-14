const request = require("request");

const base_url = 'http://localhost:3034/';
const books_url = base_url + 'books/all';

describe("First Node Test Server", function () {
    describe("GET /books/all", () => {
        it("returns status code 200",  (done) => {
            request.get(books_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains title", (done) => {
            request.get(books_url, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Title");
                done();
            });
        });
    });
    // test for wrong path and expect 404
    describe("GET /booooooks", () => {
        // accessing wrong path
        it("returns status code 404",  (done) => {
            request.get(base_url + "booooooks", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });

    // describe("GET /team", () => {
    //     it("contains member names", (done) => {
    //         request.get(base_url + "books/team", (error, response, body) => {
    //             expect(body).toBeTruthy();
    //             expect(body).toContain("Apurva Gandhi");
    //             expect(body).toContain("Nate Griffith");
    //             done();
    //         });
    //     });
    // });
});