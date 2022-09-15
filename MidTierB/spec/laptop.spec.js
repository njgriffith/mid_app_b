const request = require("request");

const base_url = 'http://localhost:3022/classB/laptops/';
const fs = require('fs');

describe("Laptop service test", function () {
    describe("POST /laptops/add", () => {
        // it("returns 400 since body has no json object",  (done) => {
        //     request.post(base_url + "add", (error, response, body) => {
        //         console.log(response);
        //         expect(response.statusCode).toBe(400);
        //         done();
        //     });
        // });
        it("returns 200 since body has json object",  (done) => {
            let data = '{ "product": "PhongPad", "brand": "Phong International", "CPU": "core i27", "memory": "69GB", "price": 420.69 }';
            request.post({ headers: { 'content-type': 'application/json' }, url: base_url + "add",body: data}, (error, response) => {
                expect(response.statusCode).toBe(200);
            });
            request.get(base_url + "all/Raleigh", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("PhongPad");
            });
            fs.readFile('../backend_laptops/laptopService/data/laptops.json', (err, data) => {
                let json = JSON.parse(data)
                json = json.filter(t => t.product !== "PhongPad")
                //console.log(json)
                setTimeout(() => {
                  fs.writeFile('../backend_laptops/laptopService/data/laptops.json', JSON.stringify(json), (err) => { /* console.log(err) */ })    
                }, 2000)
              })
            done();
        });
    });
    describe("GET /laptops/team", () => {
        it("returns 200",  (done) => {
            request.get(base_url + "team", (error, response, body) => {
                // console.log(response);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contain team names", (done) => {
            request.get(base_url + "team", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Phongphattharasiri Bubphaphuang");
                expect(body).toContain("Michael Adamik");
                expect(body).toContain("Dave Wang");
                done();
            });
        });
    });
    describe("GET /laptops/all", () => {
        // accessing wrong path
        it("/Raleigh should return a 200 status",  (done) => {
            request.get(base_url + "all/Raleigh", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("/Raleigh should return the correct prices",  (done) => {
            request.get(base_url + "all/Raleigh", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("349.47");
                expect(body).toContain("668.41");
                expect(body).toContain("494.48");
                expect(body).toContain("3224.99");
                done();
            });
        });
        it("/Durham should return a 200 status",  (done) => {
            request.get(base_url + "all/Durham", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("/Durham should return the correct status",  (done) => {
            request.get(base_url + "all/Durham", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("351.10");
                expect(body).toContain("671.52");
                expect(body).toContain("496.78");
                expect(body).toContain("3239.99");
                done();
            });
        });
        it("path other than Raleigh or Durham should return the correct error status",  (done) => {
            request.get(base_url + "all/bad", (error, response, body) => {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    });
});