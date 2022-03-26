import { Link } from "./link.entity";
import { v4 } from "uuid";
import links from "../../data/links.json";

/**
 * Save a link into storage
 * @param link
 * @returns the saved link
 */
export function saveLink(link: Link): Link {
  // Get a random link TODO: Check that it is not a duplicate link
  link.id = v4();

  // TODO: Save this to database

  return link;
}

export function getLinksByUser(userId: string, sort?: string): Link[] {
  let usersLinks = links.filter(
    (link) => link.userId === userId
  ) as unknown as Link[];

  if (sort === "ASC") {
    usersLinks = usersLinks.sort(
      (firstUser, secondUser) =>
        new Date(firstUser.dateCreated).getTime() -
        new Date(secondUser.dateCreated).getTime()
    );
  } else if (sort === "DESC") {
    usersLinks = usersLinks.sort(
      (firstUser, secondUser) =>
        new Date(secondUser.dateCreated).getTime() -
        new Date(firstUser.dateCreated).getTime()
    );
  }
  return usersLinks;
}
