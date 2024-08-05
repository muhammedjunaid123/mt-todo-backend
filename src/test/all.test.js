import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../app.js";
import dotenv from "dotenv";
import { userData } from "../constants.js";
import { userModel } from "../models/user.model.js";

dotenv.config();
//

beforeEach((done) => {
  mongoose.connect(`mongodb://127.0.0.1:27017/JestDB`);
  done();
});

let token;

describe("POST /api/v1/user/register", () => {
  afterAll(async () => {
    await userModel.deleteOne({ email: userData["email"] });
  });

  test("should register a new user successfully", async () => {
    const response = await supertest(app)
      .post("/api/v1/user/register")
      .send(userData);

    expect(response.body.statusCode).toBe(201);
    expect(response.body.message).toBe("Success");
    expect(response.body.success).toBe(true);
  });

  test("should return error if email is already used", async () => {
    const response = await supertest(app)
      .post("/api/v1/user/register")
      .send(userData);

    expect(response.body.statusCode).toBe(409);
    expect(response.body.message).toBe("email already used");
  });
});


