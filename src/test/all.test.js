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

//user login
describe("POST /api/v1/user/login", () => {
  afterAll(async () => {
    await userModel.deleteOne({ email: userData["email"] });
  });
  test("should login a user successfully", async () => {
    await supertest(app).post("/api/v1/user/register").send(userData);
    const response = await supertest(app)
      .post("/api/v1/user/login")
      .send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("Success");
    expect(response.body.success).toBe(true);
    token = response.body.token;
  });

  test("should return error if user is not found", async () => {
    const userDataFake = {
      email: "nonexistent@example.com",
      password: "SecurePass123!",
    };

    const response = await supertest(app)
      .post("/api/v1/user/login")
      .send(userDataFake);

    expect(response.statusCode).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.message).toBe("user not found");
  });

  test("should return error if password is incorrect", async () => {
    const userdataWrongPass = { ...userData };
    userdataWrongPass["password"] = "WrongPassword123!";

    const response = await supertest(app)
      .post("/api/v1/user/login")
      .send(userdataWrongPass);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("incorrect password");
  });
});
