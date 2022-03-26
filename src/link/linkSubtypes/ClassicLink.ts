import { BaseLink, ResultReturn, ResultStatus } from "./BaseLink";

export class ClassicLink extends BaseLink {
  validate(): ResultReturn {
    const baseValidationResult = super.baseValidate();
    if (baseValidationResult.result === ResultStatus.Failure) {
      return baseValidationResult;
    }

    if (!this.title) {
      return {
        result: ResultStatus.Failure,
        error: "INVALID_INPUT",
        errorMessage: "Title is required for a classic link",
      };
    }

    if (this.linkTypeSpecificData) {
      return {
        result: ResultStatus.Failure,
        error: "INVALID_INPUT",
        errorMessage: "Classic link cannot have linkTypeSpecificData",
      };
    }

    return {
      result: ResultStatus.Success,
    };
  }
}
