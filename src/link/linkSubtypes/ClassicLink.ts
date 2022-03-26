import { BaseLink, ResultReturn, ResultStatus } from "./baseLink";

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

    return {
      result: ResultStatus.Success,
    };
  }
}