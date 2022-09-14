const request = require("request");

const base_url = 'http://localhost:3034/books/all';

describe("First Node Test Server", () => {
    describe("GET /books/all?location=<place>", () => {
        it("returns 4 books", (done) => {
            request.get(base_url, '?location=Durham', (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Lord of the Rings");
                done();
            });
        });
        // when searching for unknown location return 404
        it("returns 404", (done) => {
            request.get(base_url + '/Washington',
                (error, response, body) => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
        });
        // when using wrong search key word return 500
        it("returns 500 when searching for cell phone", (done) => {
            request.get(base_url + '/cellphone',
                (error, response, body) => {
                    expect(response.statusCode).toBe(400);
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