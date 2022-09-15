const request = require("request");

const base_url = 'http://localhost:3022/classB/';

describe("Testing DVD API", function () {
    describe("Testing Response from All", () => {
        it("returns status code 200",  (done) => {
            request.get(base_url + "dvds/team", (error, response, body) => {
                let responseJSON = JSON.parse(response.body);
                expect(response.statusCode).toBe(200);
                expect(responseJSON.team).toBe("DVDs");
                expect(responseJSON.membersNames).toContain("Jason");
                
                done();
            });
        });
       
    });
});


describe("Testing DVD API", function () {
    describe("Testing Response from All", () => {
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
                expect(responseJSON[2].mpaa_rating).toBe("PG-13");
                expect(responseJSON[2].time).toBe(117);
                expect(responseJSON[2].price).toBe(19.98);

                done();
            });
        });
    });

    describe("Testing Response from All with Location", () => {
        it("should return correct price for durham",  (done) => {
            request.get(base_url + "dvds/all/durham", (error, response, body) => {
                let responseJSON = JSON.parse(response.body);
                expect(response.statusCode).toBe(200);
                expect(responseJSON[0].price).toBe("20.03");
                done();
            });
        });

        it("should return correct price for raleigh",  (done) => {
            request.get(base_url + "dvds/all/raleigh", (error, response, body) => {
                let responseJSON = JSON.parse(response.body);
                expect(response.statusCode).toBe(200);
                expect(responseJSON[0].price).toBe("19.94");
                done();
            });
        });
    });

    describe("Throw Correct Error Codes", () => {
        it("returns status code 404 with invalid path",  (done) => {
            request.get(base_url + "dvdeez", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });

        it("returns status code 400 with bad request",  (done) => {
            request.get(base_url + "dvds/all/sacremento", (error, response, body) => {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    });

    // describe("POST /dvds/add", () => {
    //     it("returns 400 since body has no json object",  (done) => {
    //         request.post(base_url + "dvds/add", (error, response, body) => {
    //             expect(response.statusCode).toBe(400);
    //             done();
    //         });
    //     });
    // });
});