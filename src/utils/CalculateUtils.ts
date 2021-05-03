export type Position = { x: number; y: number };
export type LabelPosition = {
  anchor: number[];
  rotation: number;
  position: Position;
};
export type CalculateSectionAngleFn = (
  memberNumber: number
) => [number, number];
export type CalculateSectionLabelPositionFn = (
  memberNumber: number
) => LabelPosition;

export type CalculationUtils = {
  radius: number;
  calculateSectionAngle: CalculateSectionAngleFn;
  calculateSectionLabelPosition: CalculateSectionLabelPositionFn;
};
export namespace CalculationUtils {
  const PI_TWO = Math.PI * 2;

  export const createCalculationUtils = (
    {
      width,
      height,
    }: {
      width: number;
      height: number;
    },
    membersCount: number
  ): CalculationUtils => {
    const radius = calculateRadius({ width, height });
    const radiansPerMember = calculateRadians(membersCount);
    return {
      radius,
      calculateSectionAngle: createCalcAngleFn(radiansPerMember),
      calculateSectionLabelPosition: createCalcLabelPositionFn(
        radius,
        radiansPerMember
      ),
    };
  };

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

  export const createCalcAngleFn = (
    radians: number
  ): CalculateSectionAngleFn => (memberNumber: number): [number, number] => {
    const startingAngle = memberNumber * radians - radians / 2;
    const endingAngle = startingAngle + radians;

    return [startingAngle, endingAngle];
  };

  export const createCalcLabelPositionFn = (
    radius: number,
    radiansPerMember: number
  ): CalculateSectionLabelPositionFn => (
    memberNumber: number
  ): LabelPosition => {
    const labelRotation = radiansPerMember * memberNumber;
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
