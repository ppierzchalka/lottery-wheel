export type Member = {
  label: string;
  id: string;
  color?: number;
};

export type CompleteMember = Omit<Member, "color"> & {
  color: number;
};

export type Members = Member[];
export type CompleteMembers = CompleteMember[];

export type LotteryWheelOptions = {
  members: Members;
  onWheelStop: (winner: Member) => void;
};

export type CompleteLotteryWheelOptions = Omit<
  LotteryWheelOptions,
  "members"
> & {
  members: CompleteMembers;
};
