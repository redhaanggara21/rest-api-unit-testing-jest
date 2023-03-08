import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { createUser } from "../service/user.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import createServer from "../utils/server";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import config from "config";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
const userIdd = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
	title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
	description: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
	price: 120,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const productPayload2 = {
  user: userIdd,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
	description: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
	price: 120,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
    email: "red22@gmailx.com",
	  password: "123456"
};

const userCreated = {
  email: "red21274@dmail.co",
  name: "robert quick hands",
  password: "123456"
}

describe("product", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // create product route
  describe("get product route", () => {

    // get detail product should return 404
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const productId = "xcv-abc";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    // get detail product should return 200 making the sure exist
    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        // @ts-ignore
        const product = await createProduct(productPayload);
        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );
        expect(statusCode).toBe(200);
        expect(body.productId).toBe( product.productId );
      });
    });

  });

  // create product route
  describe("create product", () => {
    
    // not autorize
    describe("if user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/products").send(productPayload);
        expect(statusCode).toBe(403);
      });
    });

    // autorized and success created
    describe("if user is logged in", () => {
      it("should return a 201, success create the product", async () => {
          const { statusCode, body } = await supertest(app).post('/api/sessions').send(userPayload);
          await supertest(app)
              .post("/api/products")
              .set("Authorization", `Bearer ${body}`)
              .send(productPayload)
              .expect(201);
      });
    });

  });
  
});