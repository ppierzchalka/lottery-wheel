import {
  CompleteLotteryWheelOptions,
  LotteryWheelOptions,
} from "../../LotteryWheel";
import { validateMembers } from "./validateMembers";

export const validateOptions = (
  options: LotteryWheelOptions
): CompleteLotteryWheelOptions => {
  return {
    ...options,
    members: validateMembers(options.members),
  };
};
