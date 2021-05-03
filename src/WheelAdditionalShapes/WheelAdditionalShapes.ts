/// <reference path='./pixi-filters.d.ts' />
import * as PIXI from "pixi.js";
import { DropShadowFilter } from "pixi-filters";
import "@pixi/graphics-extras";

export namespace WheelAdditionalShapes {
  export const createCenterCircle = (radius: number) => {
    const circleContainer = new PIXI.Container();
    const circleCreator = getCircleCreator(radius);
    const outerCircle = circleCreator(0.1, 0xf1db4b, true);
    const innerCircle = circleCreator(0.05, 0x540d6e);

    circleContainer.addChild(outerCircle, innerCircle);

    return circleContainer;
  };

  export const createOuterRing = (radius: number) => {
    const ringContainer = new PIXI.Container();
    const ringCreator = getRingCreator(radius);
    const ring = ringCreator(0x540d6e);

    ringContainer.addChild(ring);

    return ringContainer;
  };

  const getCircleCreator = (radius: number) => (
    percentage: number,
    color: number,
    withShadow?: boolean
  ) => {
    const circle = new PIXI.Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius * percentage);
    circle.x = radius;
    circle.y = radius;

    if (withShadow) {
      const shadow = getShadow();
      circle.filters = [shadow];
    }

    return circle;
  };

  const getRingCreator = (radius: number) => (color: number) => {
    const ring = new PIXI.Graphics();
    ring.beginFill(color);
    ring.drawTorus?.(radius, radius, radius - 5, radius + 20);

    const shadow = getShadow();
    ring.filters = [shadow];

    return ring;
  };

  const getShadow = () => {
    const shadow = new DropShadowFilter();
    shadow.color = 0x000020;
    shadow.alpha = 0.2;
    shadow.blur = 6;
    shadow.distance = 5;

    return shadow;
  };
}
