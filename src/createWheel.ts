import { LotteryWheel, LotteryWheelOptions } from "./LotteryWheel";
import { sayHello } from "./utils/sayHello";
import { validateOptions } from "./utils/validation";

export const createWheel = (
  target: HTMLDivElement,
  options: LotteryWheelOptions
): LotteryWheel => {
  sayHello();

  const validatedOptions = validateOptions(options);

  const wheel = LotteryWheel.create(target, validatedOptions);

  return wheel;
};
