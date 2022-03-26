import { Server } from "http";
import request from "supertest";
import app from "../src/app";
import { LinkType } from "../src/link/link.entity";
import { ResultReturn } from "../src/link/linkSubtypes/BaseLink";

const USER_ID = "7b6a7baf-7beb-4aad-af54-d880db8fc0f5";
const TITLE_LONGER_THAN_144 =
  "hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello";

describe("Base Link Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(process.env.PORT);
  });

  afterAll(() => {
    server.close();
  });

  it("Fail with non-existent user", async function () {
    const nonExistentUser = "NON_EXISTENT";
    const response = await request(app)
      .post(`/user/${nonExistentUser}/link`)
      .send({
        id: "7b6a7baf-7beb-4aad-af54-d880db8fc0f5",
        redirectLink: "https://me.com",
        title: "48H",
        dateCreated: "2020-03-25T10:56:14.319Z",
        userId: "7b6a7baf-7beb-4aad-af54-d880db8fc0f5",
        linkType: LinkType.Classic,
      })
      .expect(404);

    const error: ResultReturn = response.body;
    expect(error.error).toBe("USER_NOT_FOUND");
    expect(error.errorMessage).toBe(
      `Could not find user with ID: ${nonExistentUser}`
    );
  });

  it("Fail with invalid link type", async function () {
    const response = await request(app)
      .post(`/user/${USER_ID}/link`)
      .send({
        redirectLink: "https://me.com",
        title: "48H",
        dateCreated: "2020-03-25T10:56:14.319Z",
        linkType: "INVALID",
      })
      .expect(400);

    const error: ResultReturn = response.body;
    expect(error.error).toBe("INVALID_LINK_TYPE");
    expect(error.errorMessage).toBe(`Could not find link type: INVALID`);
  });

  it("Fail without title", async function () {
    const response = await request(app)
      .post(`/user/${USER_ID}/link`)
      .send({
        redirectLink: "https://me.com",
        dateCreated: "2020-03-25T10:56:14.319Z",
        linkType: LinkType.Classic,
      })
      .expect(400);

    const error: ResultReturn = response.body;
    expect(error.error).toBe("INVALID_INPUT");
    expect(error.errorMessage).toBe(`A title is required`);
  });

  it("Fail with title > 144 characters", async function () {
    const response = await request(app)
      .post(`/user/${USER_ID}/link`)
      .send({
        redirectLink: "https://me.com",
        dateCreated: "2020-03-25T10:56:14.319Z",
        linkType: LinkType.Classic,
        title: TITLE_LONGER_THAN_144,
      })
      .expect(400);

    const error: ResultReturn = response.body;
    expect(error.error).toBe("INVALID_INPUT");
    expect(error.errorMessage).toBe(
      `A title must not be longer than 144 characters`
    );
  });
});
