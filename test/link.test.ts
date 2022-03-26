import request from "supertest";
import app from "../src/app";

describe("Base Link Tests", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(process.env.PORT);
  });

  afterAll(() => {
    server.close();
  });

  it("Fail without a title", async function () {
    const response = await request(app)
      .get("/user/7b6a7baf-7beb-4aad-af54-d880db8fc0f5/link?sort=DESC")
      .expect(200);

    console.log(response);
  });
});
