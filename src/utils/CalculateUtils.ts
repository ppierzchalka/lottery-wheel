export namespace CalculateUtils {
  const PI_TWO = Math.PI * 2;

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

  export const calculateAngle = (
    membersLength: number,
    memberNumber: number
  ): [number, number] => {
    const radians = calculateRadians(membersLength);
    const startingAngle = memberNumber * radians - radians / 2;
    const endingAngle = startingAngle + radians;

    return [startingAngle, endingAngle];
  };

  export const calculateLabelPosition = (
    membersLength: number,
    memberNumber: number,
    radius: number
  ) => {
    const labelRotation = calculateRadians(membersLength) * memberNumber;
    const textAnchorPercentage = radius / 2 / radius;

    const anchor = [0.5, 0.5];
    const rotation = labelRotation + Math.PI;
    const position = {
      x: radius + radius * textAnchorPercentage * Math.cos(labelRotation),
      y: radius + radius * textAnchorPercentage * Math.sin(labelRotation),
    };

    return {
      anchor,
      rotation,
      position,
    };
  };
}
