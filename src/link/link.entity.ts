import { User } from "../user/user.entity";

export enum LinkType {
  Classic = "classic",
  ShowList = "showList",
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
  subtitle?: string;
  dateCreated: Date;
  user: User;
  linkType: LinkType;
  linkTypeSpecificData?: LinkTypeSpecificData[];

  constructor(input: Partial<Link>) {
    if (!input.user) {
      throw "input.user cannot be undefined";
    }
    if (!input.linkType) {
      throw "input.linkType cannot be undefined";
    }

    this.id = input.id;
    this.redirectLink = input.redirectLink;
    this.title = input.title;
    this.subtitle = input.subtitle;
    this.dateCreated = new Date();
    this.user = new User(input.user);
    this.linkType = input.linkType;
    this.linkTypeSpecificData = input.linkTypeSpecificData;
  }
}
