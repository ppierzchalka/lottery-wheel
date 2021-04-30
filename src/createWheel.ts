import { LotteryWheel, LotteryWheelOptions } from "./LotteryWheel";
import { sayHello } from "./utils/sayHello";
import { validateOptions } from "./utils/validation";

export const createWheel = (
  target: HTMLDivElement,
  options: LotteryWheelOptions
): LotteryWheel => {
  sayHello();
  return LotteryWheel.create(target, validateOptions(options));
};
