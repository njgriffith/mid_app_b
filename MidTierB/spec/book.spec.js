const request = require("request");

const base_url = 'http://localhost:3022/classB/';
const books_url = base_url + 'books/all';

describe("First Node Test Server", () => {
    describe("GET /books/all/:location", () => {
        it("returns 4 books", (done) => {
            request.get(base_url + 'books/all/Durham', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Lord of the Rings");
                done();
            });
        });
        // when searching for unknown location return 404
        it("returns 404", (done) => {
            request.get(base_url + '/Washington',
                (error, response, body) => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        });
        // when using wrong search key word return 500
        it("returns 500 when searching for cell phone", (done) => {
            request.get(base_url + '/cellphone',
                (error, response, body) => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        });
        // when searching with unknown path return 404
        it("returns 404 with unknown path", (done) => {
            request.get(base_url + 'pages',
                (error, response, body) => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        });
    });
});




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

    describe("GET /team", () => {
        it("contains member names", (done) => {
            request.get(base_url + "books/team", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Apurva Gandhi");
                expect(body).toContain("Nate Griffith");
                done();
            });
        });
    });
});