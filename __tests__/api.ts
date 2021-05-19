import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { generate } from "gerador-validador-cpf";

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

const cpf = generate();
const user1 = {
  name: "Sled",
  surname: "Campos Silva",
  telephone: "test",
  cpf: cpf,
};

const user2 = {
  name: "Jhon",
  surname: "Silva",
  telephone: "test",
  cpf: cpf,
};

const user3 = {
  name: "Hikaru",
  surname: "Nakamura",
  telephone: "test",
  cpf: generate(),
};

const user4 = {
  name: "Magnus",
  surname: "Carlsen",
  telephone: "test",
  cpf: "00000000000",
};

describe("POST: /api/adduser", () => {
  it("Should return success true if cpf is valid and user added", async (done) => {
    const res = await request(app).post("/api/adduser").send(user1).expect(200);
    expect(res.body.success).toBe(true);
    done();
  });

  it("Should return success false and error msg if there's and attempt to add user with same cpf", async (done) => {
    const res = await request(app).post("/api/adduser").send(user2).expect(400);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe("CPF já cadastrado");
    done();
  });

  it("Should return success success if there's and atempt to add user with different cpf", async (done) => {
    const res = await request(app).post("/api/adduser").send(user3).expect(200);
    expect(res.body.success).toBe(true);
    done();
  });

  it("Should return fail message if cpf is invalid ", async (done) => {
    const res = await request(app).post("/api/adduser").send(user4).expect(400);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe("CPF inválido");
    done();
  });
});

describe("GET: /api/getuser", () => {
  it("Should return user if cpf is stored ", async (done) => {
    const res = await request(app)
      .get("/api/getuser")
      .send({ cpf: user1.cpf })
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.userData.cpf).toBe(user1.cpf);
    done();
  });

  it("Should return success fail and msg if cpf is not stored ", async (done) => {
    const res = await request(app)
      .get("/api/getuser")
      .send({ cpf: user4.cpf })
      .expect(404);
    expect(res.body.success).toBe(false);
    expect(res.body.msg).toBe("Informações de CPF não armazenadas.");
    done();
  });
});

afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
});
