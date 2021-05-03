import { CompleteMember } from "../LotteryWheel";
import * as PIXI from "pixi.js";
import { CalculateUtils } from "../utils";

export namespace Section {
  export const getSection = (
    member: CompleteMember,
    radius: number,
    membersCount: number,
    index: number
  ) => {
    const section = new PIXI.Container();

    const sectionSlice = drawSlice(member, radius, membersCount, index);
    const sectionLabel = createText(member, radius, membersCount, index);

    section.addChild(sectionSlice);
    section.addChild(sectionLabel);

    return section;
  };

  const drawSlice = (
    member: CompleteMember,
    radius: number,
    membersCount: number,
    index: number
  ) => {
    const [startingAngle, endingAngle] = CalculateUtils.calculateAngle(
      membersCount,
      index
    );
    const slice = new PIXI.Graphics();

    slice.beginFill(member.color);
    slice.lineStyle(2, 0x000000, 1);
    slice.moveTo(radius, radius);
    slice.arc(radius, radius, radius, startingAngle, endingAngle);
    slice.lineTo(radius, radius);

    return slice;
  };

  const createText = (
    member: CompleteMember,
    radius: number,
    membersCount: number,
    index: number
  ) => {
    const label = new PIXI.Text(member.label, { fill: "#ffffff" });

    const {
      anchor,
      rotation,
      position: { x: posX, y: posY },
    } = CalculateUtils.calculateLabelPosition(membersCount, index, radius);

    label.anchor.set(...anchor);
    label.rotation = rotation;
    label.position.x = posX;
    label.position.y = posY;

    return label;
  };
}
