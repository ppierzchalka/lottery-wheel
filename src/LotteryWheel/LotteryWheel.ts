import * as PIXI from "pixi.js";
import { Section } from "../Section";
import { CalculationUtils, sayHello } from "../utils";
import { hitTest } from "../utils/hitTest";
import { ValidationUtils } from "../utils/ValidationUtils";
import { WheelAdditionalShapes } from "../WheelAdditionalShapes";
import { PIXI_APP_DEFAULT_OPTIONS } from "./constants";
import {
  CompleteLotteryWheelOptions,
  CompleteMembers,
  LotteryWheelOptions,
  Members,
} from "./types";

export class LotteryWheel {
  private application: PIXI.Application;
  private wheelBody?: PIXI.Container;
  private wheelHousing?: PIXI.Container;
  private container: HTMLDivElement;
  private members: CompleteMembers;
  private radius: number = 0;
  private rotationSpeed: number = 0;
  private calculationUtils: CalculationUtils;
  private pointerArrow: PIXI.Container | null = null;
  private memberSections: PIXI.Container[] = [];
  private appTicker: PIXI.Ticker | null = null;
  private tickerCallback?: PIXI.TickerCallback<any>;

  static create = (target: HTMLDivElement, options: LotteryWheelOptions) => {
    return new LotteryWheel(target, ValidationUtils.validateOptions(options));
  };

  public setMembers = (members: Members) => {
    this.members = ValidationUtils.validateMembers(members);
    this.rotationSpeed = 0;
    this.calculationUtils = CalculationUtils.createCalculationUtils(
      this.application.renderer,
      this.members.length
    );
    this.radius = this.calculationUtils.radius;
    this.destroyWheel();
    this.createWheelBody();
    this.createWheelHousing();
  };

  private constructor(
    target: HTMLDivElement,
    options: CompleteLotteryWheelOptions
  ) {
    this.container = target;
    this.members = options.members;

    this.application = new PIXI.Application({
      resizeTo: this.container,
      ...PIXI_APP_DEFAULT_OPTIONS,
    });
    sayHello();

    this.container.appendChild(this.application.view);

    this.calculationUtils = CalculationUtils.createCalculationUtils(
      this.application.renderer,
      this.members.length
    );
    this.radius = this.calculationUtils.radius;
    this.createWheelBody();
    this.createWheelHousing();
    this.createAppTicker();
  }

  private createWheelBody = () => {
    this.wheelBody = new PIXI.Container();
    const sections = this.createSections();
    this.memberSections = sections;
    this.wheelBody.addChild(...sections);
    this.mountWheel(this.wheelBody);
  };

  private createWheelHousing = () => {
    this.wheelHousing = new PIXI.Container();

    const axis = WheelAdditionalShapes.createCenterCircle(
      this.calculationUtils.radius
    );
    const outerRing = WheelAdditionalShapes.createOuterRing(
      this.calculationUtils.radius
    );
    const pointerArrow = WheelAdditionalShapes.createPointerArrow(
      this.calculationUtils.radius
    );
    this.pointerArrow = pointerArrow;
    this.wheelHousing.addChild(axis, outerRing, pointerArrow);
    this.mountWheel(this.wheelHousing);
  };

  private destroyWheel = () => {
    this.wheelBody && this.wheelBody.destroy();
    this.wheelHousing && this.wheelHousing.destroy();
  };

  private createSections = (): PIXI.Container[] => {
    const sectionGetter = Section.createSectionGetter(this.calculationUtils);
    return this.members.map(sectionGetter);
  };

  private mountWheel = (wheel: PIXI.Container) => {
    wheel.pivot.set(this.radius, this.radius);
    wheel.position.set(
      this.application.renderer.width / 2,
      this.application.renderer.height / 2
    );
    this.application.stage.addChild(wheel);
  };

  private createAppTicker = () => {
    this.appTicker = PIXI.Ticker.shared;
    this.appTicker.autoStart = false;

    this.tickerCallback = (delta) => {
      if (this.wheelBody) {
        if (this.rotationSpeed > 0) {
          this.wheelBody.rotation += this.rotationSpeed * delta;
          this.rotationSpeed =
            this.rotationSpeed > 0.0001 ? this.rotationSpeed * 0.99 : 0;
        } else if (this.rotationSpeed === 0 && this.appTicker?.started) {
          const hit = this.memberSections?.reduce<PIXI.Container | null>(
            (result, section) => {
              if (this.pointerArrow) {
                if (hitTest(section, this.pointerArrow)) {
                  return section;
                }
              }
              return result;
            },
            null
          );

          hit && console.log((hit?.children[1] as any)?._text);
          this.appTicker?.stop();
        }
      }
    };
  };

  public spinWheel = (rotationSpeed?: number) => {
    if (!this.appTicker?.started && this.tickerCallback) {
      this.rotationSpeed = rotationSpeed || Math.random();
      this.appTicker?.add(this.tickerCallback);
      this.appTicker?.start();
    } else {
      console.warn("Wheel is already running!");
    }
  };
}
