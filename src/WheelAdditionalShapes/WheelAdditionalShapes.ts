/// <reference path='./pixi-filters.d.ts' />
import "@pixi/graphics-extras";
import { DropShadowFilter } from "pixi-filters";
import * as PIXI from "pixi.js";

export namespace WheelAdditionalShapes {
  export const createCenterCircle = (radius: number) => {
    const circleContainer = new PIXI.Container();
    const circleCreator = getCircleCreator(radius);
    const outerCircle = circleCreator(0.1, 0xf1db4b, true);
    const innerCircle = circleCreator(0.05, 0x540d6e);

    circleContainer.addChild(outerCircle, innerCircle);

    return circleContainer;
  };

  const getCircleCreator = (radius: number) => (
    percentage: number,
    fill: number,
    withShadow?: boolean
  ) => {
    const circle = new PIXI.Graphics();
    circle.beginFill(fill);
    circle.drawCircle(0, 0, radius * percentage);
    circle.x = radius;
    circle.y = radius;

    if (withShadow) {
      const shadow = getShadow();
      circle.filters = [shadow];
    }

    return circle;
  };

  export const createOuterRing = (radius: number) => {
    const ringContainer = new PIXI.Container();
    const ringCreator = getRingCreator(radius);
    const innerRing = ringCreator(0.97, 1.02, 0x540d6e);

    ringContainer.addChild(innerRing);

    return ringContainer;
  };

  const getRingCreator = (radius: number) => (
    innerRadiusPercentage: number,
    outerRadiusPercentage: number,
    fill: number
  ) => {
    const ring = new PIXI.Graphics();
    ring.beginFill(fill);
    ring.drawTorus?.(
      radius,
      radius,
      radius * innerRadiusPercentage,
      radius * outerRadiusPercentage
    );

    const shadow = getShadow();
    ring.filters = [shadow];

    return ring;
  };

  export const createPointerArrow = (radius: number) => {
    const pointerArrowContainer = new PIXI.Container();
    const pointerArrowCreator = getPointerArrowCreator(radius);

    const pointerArrow = pointerArrowCreator(0.15, 0x540d6e, 0xf1db4b);

    pointerArrowContainer.addChild(pointerArrow);

    return pointerArrowContainer;
  };

  const getPointerArrowCreator = (radius: number) => (
    percentage: number,
    fill: number,
    border?: number
  ) => {
    const pointerArrow = new PIXI.Graphics();
    const pointerArrowSideLength = radius * percentage;
    pointerArrow.beginFill(fill);
    !!border && pointerArrow.lineStyle(10, border, 1);

    pointerArrow.drawPolygon([
      0,
      0,
      pointerArrowSideLength,
      0,
      pointerArrowSideLength / 2,
      getPointerArrowHeight(pointerArrowSideLength),
    ]);
    pointerArrow.x = radius - pointerArrowSideLength / 2;
    pointerArrow.y = -(getPointerArrowHeight(pointerArrowSideLength) / 3);

    pointerArrow.endFill();

    const shadow = getShadow();
    pointerArrow.filters = [shadow];

    return pointerArrow;
  };

  const getPointerArrowHeight = (radius: number): number => {
    return Math.sqrt(Math.pow(radius, 2) - Math.pow(radius / 2, 2));
  };

  const getShadow = () => {
    const shadow = new DropShadowFilter();
    shadow.color = 0x000020;
    shadow.alpha = 0.4;
    shadow.blur = 6;
    shadow.distance = 5;

    return shadow;
  };
}
