import { LotteryWheel } from "./LotteryWheel/LotteryWheel";
import { sayHello } from "./utils/sayHello";

export const createWheel = (target: HTMLDivElement): LotteryWheel => {
  sayHello();

  const wheel = LotteryWheel.create(target, {});

  return wheel;
};
