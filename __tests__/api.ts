import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { Routes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(new Routes().getEndpoins());

mongoose.Promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

beforeAll(async () => {
  const url = `mongodb://localhost:27017/test`;
  await mongoose.connect(url, { useNewUrlParser: true });
  removeAllCollections();
});

const user1 = {
  name: "Sled",
  surname: "Campos Silva",
  telephone: "test",
  cpf: "000.000.000-00",
};

const user2 = {
  name: "Jhon",
  surname: "Silva",
  telephone: "test",
  cpf: "000.000.000-00",
};

const user3 = {
  name: "Jhon",
  surname: "Silva",
  telephone: "test",
  cpf: "000.000.000-01",
};

describe("POST: /api/adduser", () => {
  it("Should return success true if a user is added", async (done) => {
    const res = await request(app).post("/api/adduser").send(user1).expect(200);
    expect(res.body.success).toBe(true);
    done();
  });

  it("Should return success false if there's and atempt to add user with same cpf", async (done) => {
    const res = await request(app).post("/api/adduser").send(user2).expect(400);
    expect(res.body.success).toBe(false);
    done();
  });

  it("Should return success success if there's and atempt to add user with different cpf", async (done) => {
    const res = await request(app).post("/api/adduser").send(user3).expect(200);
    expect(res.body.success).toBe(true);
    done();
  });
});

afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
});
