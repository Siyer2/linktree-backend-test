import { Link } from "./link.entity";
import { v4 } from "uuid";

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
