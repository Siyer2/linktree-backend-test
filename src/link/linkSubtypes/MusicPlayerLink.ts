import { LinkTypeSpecificData } from "../link.entity";
import { BaseLink, ResultReturn, ResultStatus } from "./BaseLink";

enum MusicPlatform {
  Spotify = "spotify",
  AppleMusic = "appleMusic",
}

interface SongLink extends LinkTypeSpecificData {
  platform: MusicPlatform;
}

export class MusicPlayerLink extends BaseLink {
  validate(): ResultReturn {
    const baseValidationResult = super.baseValidate();
    if (baseValidationResult.result === ResultStatus.Failure) {
      return baseValidationResult;
    }

    // Ensure that linkTypeSpecificData is present
    if (!this.linkTypeSpecificData || !this.linkTypeSpecificData.length) {
      return {
        result: ResultStatus.Failure,
        errorMessage:
          "A non-empty 'linkTypeSpecificData' array is a required parameter when creating a MusicPlayer link",
        error: "INVALID_INPUT",
      };
    }

    // Validate song links
    let error = "";
    const songLinks = this.linkTypeSpecificData as SongLink[];
    songLinks.forEach((songLink) => {
      if (
        !Object.values(MusicPlatform).includes(songLink.platform) ||
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
