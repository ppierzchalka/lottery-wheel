import { Member, Members } from "../../LotteryWheel";

const validateMember = (member: any, index: number): member is Member => {
  if (!("id" in member)) {
    throw new Error(`Member on index ${index} does not have id provided`);
  }

  if (!("label" in member)) {
    throw new Error(`Member on index ${index} does not have label provided`);
  }

  return true;
};

const hasDuplicatedId = (
  validatedMembers: Members,
  member: Member
): boolean => {
  if (
    validatedMembers.some((validatedMember) => validatedMember.id === member.id)
  ) {
    throw new Error(`Duplicated member ID`);
  }

  return false;
};

export const validateMembers = (members: Members): Members => {
  return members.reduce<Members>(
    (validatedMembers: Members, member: any, index: number) => {
      if (
        validateMember(member, index) &&
        !hasDuplicatedId(validatedMembers, member)
      ) {
        return [...validatedMembers, member];
      }

      return validatedMembers;
    },
    []
  );
};
