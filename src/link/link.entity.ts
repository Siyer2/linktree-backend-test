import { User } from "../user/user.entity";

export enum LinkType {
  Classic = "classic",
  ShowList = "showsList",
  MusicPlayer = "musicPlayer",
}

export interface LinkTypeSpecificData {
  title: string;
  redirectLink: string;
}

export class Link {
  id?: string;
  redirectLink?: string;
  title?: string;
  dateCreated: Date;
  user: User;
  linkType: LinkType;
  linkTypeSpecificData?: LinkTypeSpecificData[];

  constructor(input: Partial<Link>) {
    if (!input.dateCreated) {
      throw new Error("input.dateCreated cannot be undefined");
    }
    if (!input.user) {
      throw new Error("input.user cannot be undefined");
    }
    if (!input.linkType) {
      throw new Error("input.linkType cannot be undefined");
    }

    this.id = input.id;
    this.redirectLink = input.redirectLink;
    this.title = input.title;
    this.dateCreated = input.dateCreated;
    this.user = new User(input.user);
    this.linkType = input.linkType;
    this.linkTypeSpecificData = input.linkTypeSpecificData;
  }
}
