import { LotteryWheel, LotteryWheelOptions } from "./LotteryWheel";
import { sayHello } from "./utils/sayHello";
import { ValidationUtils } from "./utils/ValidationUtils";

export const createWheel = (
  target: HTMLDivElement,
  options: LotteryWheelOptions
): LotteryWheel => {
  sayHello();
  return LotteryWheel.create(target, ValidationUtils.validateOptions(options));
};
