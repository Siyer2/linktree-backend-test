import { Link } from "../link.entity";
import { BaseLink, ResultStatus } from "./baseLink";

export class Classic extends BaseLink {
  validate(input: Partial<Link>): {
    result: ResultStatus;
    error?: string;
  } {
    const baseValidationResult = super.baseValidate(input);
    if (baseValidationResult.result === ResultStatus.Failure) {
      return baseValidationResult;
    }

    return {
      result: ResultStatus.Success,
    };
  }
}
