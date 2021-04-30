import { PI_TWO } from "../LotteryWheel";

export const calculateRadius = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): number => {
  const selectedDimension = Math.min(width, height);
  return (selectedDimension / 2) * 0.9;
};

export const calculateRadians = (numberOfMembers: number): number => {
  return PI_TWO / numberOfMembers;
};
