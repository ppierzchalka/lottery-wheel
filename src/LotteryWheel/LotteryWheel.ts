import * as PIXI from "pixi.js";
import { Section } from "../Section";
import { CalculationUtils, sayHello } from "../utils";
import { ValidationUtils } from "../utils/ValidationUtils";
import { PIXI_APP_DEFAULT_OPTIONS } from "./constants";
import {
  LotteryWheelOptions,
  CompleteLotteryWheelOptions,
  CompleteMembers,
  Members,
} from "./types";

export class LotteryWheel {
  private application: PIXI.Application;
  private wheel?: PIXI.Container;
  private container: HTMLDivElement;
  private members: CompleteMembers;
  private radius: number = 0;
  private rotationSpeed: number = 0;
  private calculationUtils: CalculationUtils;
  private ticker?: PIXI.TickerCallback<any>;

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
    this.createWheel();
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
    this.createWheel();
    this.createAppTicker();
  }

  private createWheel = () => {
    this.wheel = new PIXI.Container();
    const sections = this.getSections();
    this.wheel.addChild(...sections);

    this.mountWheel(this.wheel);
  };

  private destroyWheel = () => {
    this.wheel && this.wheel.destroy();
  };

  private getSections = (): PIXI.Container[] => {
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
    this.ticker = (delta) => {
      if (this.wheel) {
        this.wheel.rotation += this.rotationSpeed * delta;
        this.rotationSpeed =
          this.rotationSpeed > 0.0001 ? this.rotationSpeed * 0.99 : 0;
      }
    };

    this.application.ticker.add(this.ticker);
  };

  public spinWheel = (rotationSpeed?: number) => {
    this.rotationSpeed = rotationSpeed || Math.random();
  };
}
