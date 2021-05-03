import {
  CompleteLotteryWheelOptions,
  CompleteMember,
  CompleteMembers,
  LotteryWheelOptions,
  Member,
  Members,
} from "../LotteryWheel";
import { getColor } from "./getColors";

export namespace ValidationUtils {
  export const validateOptions = (
    options: LotteryWheelOptions
  ): CompleteLotteryWheelOptions => {
    return {
      ...options,
      members: validateMembers(options.members),
    };
  };

  export const validateMembers = (members: Members): CompleteMembers => {
    return members.reduce<CompleteMembers>(
      (validatedMembers: CompleteMembers, member: Member, index: number) => {
        if (
          validateMember(member, index) &&
          !hasDuplicatedId(validatedMembers, member)
        ) {
          return [...validatedMembers, addMemberColor(member, index)];
        }

        return validatedMembers;
      },
      []
    );
  };

  const validateMember = (
    member: any,
    index: number
  ): member is CompleteMember => {
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
      validatedMembers.some(
        (validatedMember) => validatedMember.id === member.id
      )
    ) {
      throw new Error(`Duplicated member ID`);
    }

    return false;
  };

  const addMemberColor = (member: Member, index: number): CompleteMember => {
    if (!member.color) {
      return {
        ...member,
        color: getColor(index),
      };
    }
    return member as CompleteMember;
  };
}
