export type Member = {
  label: string;
  id: string;
};

export type Members = Member[];

export type LotteryWheelOptions = {
  members: Members;
};
