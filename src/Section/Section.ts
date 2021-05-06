import * as PIXI from "pixi.js";
import { CompleteMember } from "../LotteryWheel";
import { CalculationUtils } from "../utils";

export type SectionGetter = (
  member: CompleteMember,
  index: number
) => MemberSection;
export type SliceGetterFn = (
  member: CompleteMember,
  index: number
) => PIXI.Graphics;
export type LabelGetterFn = (
  member: CompleteMember,
  index: number
) => PIXI.Container;

export type MemberSection = PIXI.Container & {
  member: CompleteMember;
  getGraphics: () => PIXI.Graphics;
};

export namespace Section {
  export const createSectionGetter = (
    calculationUtils: CalculationUtils
  ): SectionGetter => {
    const sliceGetter = createSliceGetter(calculationUtils);
    const labelGetter = createLabelGetter(calculationUtils);
    return (member: CompleteMember, index: number): MemberSection => {
      const section = new PIXI.Container();

      const sectionSlice = sliceGetter(member, index);
      const sectionLabel = labelGetter(member, index);

      section.addChild(sectionSlice);
      section.addChild(sectionLabel);

      (section as MemberSection).member = member;
      (section as MemberSection).getGraphics = () => sectionSlice;

      return section as MemberSection;
    };
  };

  const createSliceGetter = (
    calculationUtils: CalculationUtils
  ): SliceGetterFn => (
    member: CompleteMember,
    index: number
  ): PIXI.Graphics => {
    const { radius, calculateSectionAngle } = calculationUtils;
    const [startingAngle, endingAngle] = calculateSectionAngle(index);
    const slice = new PIXI.Graphics();

    slice.beginFill(member.color);
    slice.moveTo(radius, radius);
    slice.arc(radius, radius, radius, startingAngle, endingAngle);
    slice.lineTo(radius, radius);

    return slice;
  };

  const createLabelGetter = (
    calculationUtils: CalculationUtils
  ): LabelGetterFn => (
    member: CompleteMember,
    index: number
  ): PIXI.Container => {
    const { calculateSectionLabelPosition } = calculationUtils;
    const label = new PIXI.Text(member.label, {
      fontFamily: "Helvetica, Arial, sans-serif",
      fill: "white",
      fontVariant: "small-caps",
      stroke: "#000000",
      strokeThickness: 4,
    });

    const {
      anchor,
      rotation,
      position: { x: posX, y: posY },
    } = calculateSectionLabelPosition(index);

    label.anchor.set(...anchor);
    label.rotation = rotation;
    label.position.x = posX;
    label.position.y = posY;

    return label;
  };
}
