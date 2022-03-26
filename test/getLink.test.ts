import { Server } from "http";
import moment from "moment";
import request from "supertest";
import app from "../src/app";
import { Link, LinkType } from "../src/link/link.entity";
import { ResultReturn } from "../src/link/linkSubtypes/BaseLink";

const USER_ID = "7b6a7baf-7beb-4aad-af54-d880db8fc0f5";

describe("Get Link Tests", () => {
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
      .get(`/user/${nonExistentUser}/link`)
      .expect(404);

    const error: ResultReturn = response.body;
    expect(error.error).toBe("USER_NOT_FOUND");
    expect(error.errorMessage).toBe(
      `Could not find user with ID: ${nonExistentUser}`
    );
  });

  it("Get links for a user", async function () {
    const response = await request(app)
      .get(`/user/${USER_ID}/link`)
      .expect(200);

    const links: Link[] = response.body;
    expect(links.length).toBe(3);
  });

  it("Get links in descending order", async function () {
    const response = await request(app)
      .get(`/user/${USER_ID}/link`)
      .query({ sort: "DESC" })
      .expect(200);

    const links: Link[] = response.body;
    let previousDateCreated = links[0].dateCreated;
    links.map((link) => {
      expect(
        moment(link.dateCreated).isSameOrAfter(moment(previousDateCreated))
      );
      previousDateCreated = link.dateCreated;
    });
  });

  it("Get links in ascending order", async function () {
    const response = await request(app)
      .get(`/user/${USER_ID}/link`)
      .query({ sort: "ASC" })
      .expect(200);

    const links: Link[] = response.body;
    let previousDateCreated = links[0].dateCreated;
    links.map((link) => {
      expect(
        moment(link.dateCreated).isSameOrBefore(moment(previousDateCreated))
      );
      previousDateCreated = link.dateCreated;
    });
  });
});
