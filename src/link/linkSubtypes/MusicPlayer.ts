import { Link, LinkTypeSpecificData } from "../link.entity";
import { BaseLink, ResultReturn, ResultStatus } from "./baseLink";

export enum MusicPlatform {
  Spotify = "spotify",
  AppleMusic = "appleMusic",
}

interface SongLink extends LinkTypeSpecificData {
  platform: MusicPlatform;
}

export class MusicPlayer extends BaseLink {
  validate(input: Partial<Link>): ResultReturn {
    const baseValidationResult = super.baseValidate(input);
    if (baseValidationResult.result === ResultStatus.Failure) {
      return baseValidationResult;
    }

    // Ensure that linkTypeSpecificData is present
    if (!input.linkTypeSpecificData || !input.linkTypeSpecificData.length) {
      return {
        result: ResultStatus.Failure,
        errorMessage:
          "A non-empty 'songLinks' array is a required parameter when creating a MusicPlayer link",
        error: "INVALID_INPUT",
      };
    }

    // Ensure that each song link has a valid platform
    let error = "";
    const songLinks = input.linkTypeSpecificData as SongLink[];
    songLinks.forEach((songLink) => {
      if (
        ![MusicPlatform.Spotify, MusicPlatform.AppleMusic].includes(
          songLink.platform
        ) ||
        !songLink.redirectLink
      ) {
        error = JSON.stringify(songLink);
      }
    });

    if (error) {
      return {
        result: ResultStatus.Failure,
        error: "INVALID_INPUT",
        errorMessage: `Invalid songLink: ${error}`,
      };
    }

    return {
      result: ResultStatus.Success,
    };
  }
}
