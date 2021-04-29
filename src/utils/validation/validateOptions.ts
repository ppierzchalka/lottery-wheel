import { LotteryWheelOptions } from "../../LotteryWheel";
import { validateMembers } from "./validateMembers";

export const validateOptions = (
  options: LotteryWheelOptions
): LotteryWheelOptions => {
  return {
    members: validateMembers(options.members),
  };
};
