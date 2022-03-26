import express, { Request, Response } from "express";
import { Link, LinkType } from "./link/link.entity";
import { getLinksByUser, saveLink } from "./link/link.service";
import { ResultReturn, ResultStatus } from "./link/linkSubtypes/BaseLink";
import { ClassicLink } from "./link/linkSubtypes/ClassicLink";
import { MusicPlayerLink } from "./link/linkSubtypes/MusicPlayerLink";
import { ShowListLink } from "./link/linkSubtypes/ShowListLink";
import { getUserById } from "./user/user.service";

const app = express();
const PORT = 3000;

app.use(express.json());

// TODO: Move this endpoint into link.controller.ts
// TODO: Write a sign up/sign in endpoint using JWT. Use this to ensure that user can only access their own data
app.post("/user/:userId/link", (request: Request, response: Response) => {
  // Ensure user exists
  const userId: string = request.params.userId;
  const user = getUserById(userId);
  if (!user) {
    return response.status(404).json({
      error: "USER_NOT_FOUND",
      errorMessage: `Could not find user with ID: ${userId}`,
    });
  }

  // Validate link body
  const linkBody: Link = request.body;
  linkBody.user = user;

  let validationResult: ResultReturn;
  const linkType: LinkType = request.body.linkType;
  switch (linkType) {
    case LinkType.Classic:
      const classicLink = new ClassicLink(linkBody);
      validationResult = classicLink.validate();
      break;

    case LinkType.MusicPlayer:
      const musicLink = new MusicPlayerLink(linkBody);
      validationResult = musicLink.validate();
      break;

    case LinkType.ShowList:
      const showLink = new ShowListLink(linkBody);
      validationResult = showLink.validate();
      break;

    default:
      return response.status(400).json({
        error: "INVALID_LINK_TYPE",
        errorMessage: `Could not find link type: ${linkType}`,
      });
  }

  if (validationResult.result === ResultStatus.Failure) {
    return response.status(404).json({
      error: validationResult.error,
      errorMessage: validationResult.errorMessage,
    });
  }

  // Save the link
  const savedLink = saveLink(linkBody);

  return response.json(savedLink);
});

app.get("/user/:userId/link", (request: Request, response: Response) => {
  // Ensure user exists
  const userId: string = request.params.userId;
  const user = getUserById(userId);
  if (!user) {
    return response.status(404).json({
      error: "USER_NOT_FOUND",
      errorMessage: `Could not find user with ID: ${userId}`,
    });
  }

  const sort = request.query.sort;
  if (sort !== "ASC" && sort !== "DESC") {
    return response.status(400).json({
      error: "INVALID_SORT_PARAM",
      errorMessage: `${sort} is not a valid sort param`,
    });
  }

  const links = getLinksByUser(userId, sort);
  return response.json(links);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
