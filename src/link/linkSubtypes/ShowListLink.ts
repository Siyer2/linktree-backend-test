import { LinkTypeSpecificData } from "../link.entity";
import { BaseLink, ResultReturn, ResultStatus } from "./baseLink";

enum ShowStatus {
  SoldOut,
  NotOnSale,
  OnSale,
}

interface ShowLink extends LinkTypeSpecificData {
  showStatus: ShowStatus;
  venue: string;
}

export class ShowListLink extends BaseLink {
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
          "A non-empty 'linkTypeSpecificData' array is a required parameter when creating a ShowList link",
        error: "INVALID_INPUT",
      };
    }

    // Ensure that each show has a valid status and venue
    let error = "";
    const showLinks = this.linkTypeSpecificData as ShowLink[];
    showLinks.forEach((showLink) => {
      if (!Object.values(ShowStatus).includes(showLink.showStatus)) {
        error = JSON.stringify(showLink);
      }
    });

    if (error) {
      return {
        result: ResultStatus.Failure,
        error: "INVALID_INPUT",
        errorMessage: `Invalid showLink: ${error}`,
      };
    }

    return {
      result: ResultStatus.Success,
    };
  }
}
