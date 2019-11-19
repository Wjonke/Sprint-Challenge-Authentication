const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server')


describe('server', () => {

  beforeAll(async () => {
    await db('users').truncate();
  });

  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });


  describe("base Test", () => {
    describe("GET /", () => {
      it("returns a 200 OK message", () => {
        return request(server)
          .get("/")
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
  });


  describe("Auth router Tests", () => {
    describe("POST /api/auth/register", () => {
      it("should return a 201 created status", () => {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "john doe",
            password: "password"
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it("returns a JSON object after creating a user", () => {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "john doe",
            password: "password"
          })
          .then(res => {
            expect(res.type).toEqual("application/json");
          });
      });
    });
  

    describe("POST /api/auth/login", () => {

      it("should return a 200 OK status", () => {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "john doe",
            password: "password"
          })
          .then(res => {
            console.log(res);
            expect(res.status).toBe(200);
          });
      });

      it("should return a JSON object", () => {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "john doe",
            password: "password"
          })
          .then(res => {
            expect(res.type).toMatch(/json/);
          });
      });
    });
  })

  describe("JOKES ROUTER Tests", () => {
    describe("GET /api/jokes", () => {

      it("should return jokes", () => {
        return request(server)
          .get("/api/jokes")
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImpvaG5Eb2VzZXBoIiwiaWF0IjoxNTY2NTc4MjE1LCJleHAiOjE1NjY2NjQ2MTV9.6SQ52KhCWA-GHoOM5xB6RT0elXG0t-ynnWaDUx_pFnI"
          )
          .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
          });
      });
      
      it("should return a 200 OK status", () => {
        return request(server)
          .get("/api/jokes")
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImpvaG5Eb2VzZXBoIiwiaWF0IjoxNTY2NTc4MjE1LCJleHAiOjE1NjY2NjQ2MTV9.6SQ52KhCWA-GHoOM5xB6RT0elXG0t-ynnWaDUx_pFnI"
          )
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
  });
});