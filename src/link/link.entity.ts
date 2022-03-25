import { User } from "../user/user.entity";

enum LinkType {
  Classic = "classic",
  ShowsList = "showsList",
  MusicPlayer = "musicPlayer",
}

interface LinkTypeSpecificData {
  redirectLink: string;
}

export class Link {
  id: string;
  redirectLink?: string;
  title: string;
  dateCreated: Date;
  user: User;
  linkType: LinkType;
  linkTypeSpecificData?: LinkTypeSpecificData;

  constructor(input: {
    id: string;
    redirectLink?: string;
    title: string;
    dateCreated: Date;
    user: User;
    linkType: LinkType;
    linkTypeSpecificData?: LinkTypeSpecificData;
  }) {
    this.id = input.id;
    this.redirectLink = input.redirectLink;
    this.title = input.title;
    this.dateCreated = input.dateCreated;
    this.user = new User(input.user);
    this.linkType = input.linkType;
    this.linkTypeSpecificData = input.linkTypeSpecificData;
  }
}
