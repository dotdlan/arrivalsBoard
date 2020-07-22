//supertest: https://www.npmjs.com/package/supertest
//jest: https://jestjs.io/docs/en/getting-started.html
//note the package.json config for mongodb apps: https://mongoosejs.com/docs/jest.html
//supertest and express via "app"
const request = require("supertest");
const app = require("../server.js");

//db conn stuff
const mongoose = require('mongoose')

//our .envstuff
require('dotenv').config()


beforeAll(async () => {
    const MONGODB_URI = process.env.MONGODB_URI
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
})


//test get on /
describe("Test the root path", () => {
    test("It should respond with a 302", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(302);
                done();
            });
    });
});

//test get on /flight, our home page
describe("Test flight path", () => {
    test("It should respond with a 200", done => {
        request(app)
            .get("/flight")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
