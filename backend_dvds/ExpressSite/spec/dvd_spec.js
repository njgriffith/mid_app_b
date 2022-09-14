const request = require("request");

const base_url = 'http://localhost:3035/';

describe("First Node Test Server", function () {
    describe("GET /dvds/all", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + "dvds/all", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains dvd name", (done) => {
            request.get(base_url + "dvds/all", (error, response, body) => {
                let responseJSON = JSON.parse(response.body);
                expect(response).toBeTruthy();
                expect(responseJSON[2].title).toBe("Ant-Man");
                done();
            });
        });
    });
    // test for wrong path and expect 404
    describe("GET /dvdeez", () => {
        // accessing wrong path
        it("returns status code 404",  (done) => {
            request.get(base_url + "dvdeez", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});