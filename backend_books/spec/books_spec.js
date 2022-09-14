// const request = require("request");

// const base_url = 'http://localhost:8081/';
// const contacts_url = base_url + 'contacts';

// describe("First Node Test Server", function () {
//     describe("GET /contacts", () => {
//         it("returns status code 200",  (done) => {
//             request.get(base_url, (error, response, body) => {
//                 expect(response.statusCode).toBe(200);
//                 done();
//             });
//         });
//         it("contains firstname", (done) => {
//             request.get(contacts_url, (error, response, body) => {
//                 expect(body).toBeTruthy();
//                 expect(body).toContain("firstname");
//                 done();
//             });
//         });
//     });
//     // test for wrong path and expect 404
//     describe("GET /conststacts", () => {
//         // accessing wrong path
//         it("returns status code 404",  (done) => {
//             request.get(base_url + "conststacts", (error, response, body) => {
//                 expect(response.statusCode).toBe(404);
//                 done();
//             });
//         });
//     });
// });