import { Link } from "../link.entity";

const BASE_URL = "https://fakelinktree.com";

export type ResultReturn = {
  result: ResultStatus;
  error?: string;
  errorMessage?: string;
};

export enum ResultStatus {
  Success,
  Failure,
}

export abstract class BaseLink extends Link {
  baseURL = BASE_URL;

  baseValidate(): ResultReturn {
    // If there is a title, check that it's less than 144 chars
    if (this.title && this.title.length > 144) {
      return {
        result: ResultStatus.Failure,
        error: "INVALID_INPUT",
        errorMessage: "A title must not be longer than 144 characters",
      };
    }

    return {
      result: ResultStatus.Success,
    };
  }

  abstract validate(): ResultReturn;
}
