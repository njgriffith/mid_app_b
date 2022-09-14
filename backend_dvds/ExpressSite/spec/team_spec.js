const request = require("request");

const base_url = 'http://localhost:3035/';

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