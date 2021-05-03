import { CompleteMember } from "../LotteryWheel";
import * as PIXI from "pixi.js";
import { calculateAngle, calculateLabelPosition } from "./mathOperations";

export const drawSectionSlice = (
  member: CompleteMember,
  radius: number,
  membersCount: number,
  index: number
) => {
  const [startingAngle, endingAngle] = calculateAngle(membersCount, index);
  const slice = new PIXI.Graphics();

  slice.beginFill(member.color);
  slice.lineStyle(2, 0x000000, 1);
  slice.moveTo(radius, radius);
  slice.arc(radius, radius, radius, startingAngle, endingAngle);
  slice.lineTo(radius, radius);

  return slice;
};

export const createSectionText = (
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
  } = calculateLabelPosition(membersCount, index, radius);

  label.anchor.set(...anchor);
  label.rotation = rotation;
  label.position.x = posX;
  label.position.y = posY;

  return label;
};
