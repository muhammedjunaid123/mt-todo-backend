import mongoose, { Promise } from "mongoose";
import supertest from "supertest";
import { app } from "../app.js";
import dotenv from "dotenv";
import {
  projectData,
  projectDataUpdte,
  todoData,
  todoUpdateData,
  userData,
} from "../constants.js";
import { userModel } from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import { projectModel } from "../models/project.model.js";
import { todoModel } from "../models/todo.model.js";

dotenv.config();
//

beforeEach((done) => {
  mongoose.connect(`mongodb://127.0.0.1:27017/JestDB`);
  done();
});
let token;
let projectId;
let todoId;
describe("POST /api/v1/user/register", () => {
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
  test("should login a user successfully", async () => {
    const response = await supertest(app)
      .post("/api/v1/user/login")
      .send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("Success");
    expect(response.body.success).toBe(true);
    token = response.body.data;
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

//
describe("POST /api/v1/project/create", () => {
  test("should create a new project successfully", async () => {
    const response = await supertest(app)
      .post("/api/v1/project/create")
      .set("Authorization", `Bearer ${token}`)
      .send(projectData);

    expect(response.statusCode).toBe(201);
    expect(response.body.statusCode).toBe(201);
    expect(response.body.message).toBe("Success");
    expect(response.body.success).toBe(true);
    projectId = response.body.data["_id"];
  });

  test("should return error if token is missing", async () => {
    const response = await supertest(app)
      .post("/api/v1/project/create")
      .send(projectData);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized request");
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    const response = await supertest(app)
      .post("/api/v1/project/create")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(projectData);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });
});

describe("PUT /api/v1/project/titleUpdate", () => {
  const projectDataUpdteWithId = { ...projectData };
  test("should update a project title successfully", async () => {
    projectDataUpdteWithId["id"] = projectId;

    const response = await supertest(app)
      .patch("/api/v1/project/titleUpdate")
      .set("Authorization", `Bearer ${token}`)
      .send(projectDataUpdteWithId);

    expect(response.statusCode).toBe(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toBe("Success");
    expect(response.body.success).toBe(true);
  });

  test("should return error if token is missing", async () => {
    const response = await supertest(app)
      .patch("/api/v1/project/titleUpdate")
      .send(projectDataUpdteWithId);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized request");
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    const response = await supertest(app)
      .patch("/api/v1/project/titleUpdate")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(projectDataUpdteWithId);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });
});

describe("GET /api/v1/project/getUserProject", () => {
  test("should return user project data successfully", async () => {
    const response = await supertest(app)
      .get("/api/v1/project/getUserProject")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.statusCode).toBe(200);
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    const response = await supertest(app)
      .get("/api/v1/project/getUserProject")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });
});

describe("GET /api/v1/project/getProject", () => {
  test("should return project data successfully", async () => {
    const response = await supertest(app)
      .get("/api/v1/project/getProject")
      .query({ id: projectId })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.statusCode).toBe(200);
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    const response = await supertest(app)
      .get("/api/v1/project/getProject")
      .query({ id: projectId })
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });

  test("should return error if project ID is missing", async () => {
    const response = await supertest(app)
      .get("/api/v1/project/getProject")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe("Project ID is required");
  });
});

describe("POST /api/v1/todo/create", () => {
  const todoDataWithProjectId = { ...todoData };
  test("should create a new todo and return status 201", async () => {
    todoDataWithProjectId["projectId"] = projectId;
    const response = await supertest(app)
      .post("/api/v1/todo/create")
      .send(todoDataWithProjectId)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.statusCode).toBe(201);
    todoId = response.body.data["_id"];
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    const response = await supertest(app)
      .post("/api/v1/todo/create")
      .send(todoDataWithProjectId)
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });

  test("should return error if data is missing", async () => {
    const response = await supertest(app)
      .post("/api/v1/todo/create")
      .send({})
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid data");
  });
});
describe("patch /api/v1/todo/update", () => {
  const updatedTodoDataWithTodoId = { ...todoUpdateData };
  test("should update a todo and return status 200", async () => {
    updatedTodoDataWithTodoId["_id"] = todoId;
    const response = await supertest(app)
      .patch("/api/v1/todo/update")
      .send(updatedTodoDataWithTodoId)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.statusCode).toBe(200);
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";
    const response = await supertest(app)
      .patch("/api/v1/todo/update")
      .send(updatedTodoDataWithTodoId)
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });
});

describe("DELETE /api/v1/todo/remove", () => {
  afterAll(async () => {
    // Clean up
    await userModel.deleteOne({ email: userData["email"] });
    await projectModel.deleteOne({ _id: projectId });
    await todoModel.deleteOne({ _id: todoId });
  });

  test("should delete a todo and return status 204", async () => {
    const response = await supertest(app)
      .delete("/api/v1/todo/remove")
      .query({ id: todoId, projectId: projectId })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);

    const deletedTodo = await todoModel.findById(todoId);
    expect(deletedTodo).toBeNull();
  });

  test("should return error if token is invalid", async () => {
    const invalidToken = "invalidToken";

    const response = await supertest(app)
      .delete("/api/v1/todo/remove")
      .query({ id: todoId, projectId: projectId })
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid access token");
  });

  test("should return error if todo ID is missing", async () => {
    const response = await supertest(app)
      .delete("/api/v1/todo/remove")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe("Todo ID is required");
  });
});
