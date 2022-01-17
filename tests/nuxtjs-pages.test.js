/* eslint-disable no-undef */
import constants from "~/tests/constants";
const { Nuxt } = require("nuxt");
// eslint-disable-next-line no-unused-vars
const request = require("supertest");
const nuxtConfig = require("../nuxt.config.js");

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null;

// Init Nuxt.js and create a server listening on localhost:4000
beforeAll(async () => {
  nuxt = new Nuxt({ ...nuxtConfig, buildDir: constants.buildDir });

  await nuxt.server.listen(constants.port, "localhost");
}, 300000);

describe("GET /", () => {
  test("returns status code 200", async () => {
    const response = await request(nuxt.server.app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

// Close server and ask nuxt to stop listening to file changes
afterAll(() => {
  nuxt.close();
});
