import * as PIXI from "pixi.js";
import { MemberSection } from "../Section";

export const hitTest = (
  pointerArrow: PIXI.Container,
  section: MemberSection
) => {
  const sectionGraphics = section.getGraphics();
  const { x, y, width, height } = pointerArrow.getBounds();
  const pointerArrowTip = { x: x + width / 2, y: y + height };

  return sectionGraphics.containsPoint(pointerArrowTip);
};
