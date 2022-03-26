import { Server } from "http";
import request from "supertest";
import app from "../src/app";
import { Link, LinkType } from "../src/link/link.entity";
import { ResultReturn } from "../src/link/linkSubtypes/BaseLink";

const USER_ID = "7b6a7baf-7beb-4aad-af54-d880db8fc0f5";

describe("Base Link Tests", () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(process.env.PORT);
  });

  afterAll(() => {
    server.close();
  });

  it("Fail if other link items", async function () {
    const response = await request(app)
      .post(`/user/${USER_ID}/link`)
      .send({
        redirectLink: "https://me.com",
        dateCreated: "2020-03-25T10:56:14.319Z",
        linkType: LinkType.Classic,
        title: "48H",
        linkTypeSpecificData: [
          { platform: "spotify", redirectLink: "spotify.com/song" },
          { platform: "appleMusic", redirectLink: "apple.com/song" },
        ],
      })
      .expect(400);

    const error: ResultReturn = response.body;
    expect(error.error).toBe("INVALID_INPUT");
    expect(error.errorMessage).toBe(
      "Classic link cannot have linkTypeSpecificData"
    );
  });

  it("Successfully create link", async function () {
    const postBody = {
      redirectLink: "https://me.com",
      title: "48H",
      linkType: LinkType.Classic,
    };
    const response = await request(app)
      .post(`/user/${USER_ID}/link`)
      .send(postBody)
      .expect(200);

    const newLink: Link = response.body;
    expect(newLink.redirectLink).toBe(postBody.redirectLink);
    expect(newLink.title).toBe(postBody.title);
    expect(newLink.user.id).toBe(USER_ID);
    expect(typeof newLink.id).toBe("string");
    expect(typeof newLink.dateCreated).toBe("string");
  });
});
