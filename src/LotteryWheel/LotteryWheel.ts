import * as PIXI from "pixi.js";
import { calculateRadius } from "../utils";
import { createSectionText, drawSectionSlice } from "../utils/drawingUtils";
import { validateMembers } from "../utils/validation";
import { PIXI_APP_DEFAULT_OPTIONS } from "./constants";
import {
  CompleteLotteryWheelOptions,
  CompleteMember,
  CompleteMembers,
  Members,
} from "./types";

export class LotteryWheel {
  private application: PIXI.Application;
  private wheel?: PIXI.Container;
  private container: HTMLDivElement;
  private members: CompleteMembers;
  private radius: number;

  private rotationStart?: VoidFunction;
  private ticker?: PIXI.TickerCallback<any>;

  static create = (
    target: HTMLDivElement,
    options: CompleteLotteryWheelOptions
  ) => {
    return new LotteryWheel(target, options);
  };

  public setMembers = (members: Members) => {
    this.members = validateMembers(members);
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

    this.radius = calculateRadius(this.application.renderer);
    this.container.appendChild(this.application.view);

    this.createWheel();
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
    return this.members.map((member, index) => {
      return this.createSection(member, index);
    });
  };

  private createSection = (
    member: CompleteMember,
    index: number
  ): PIXI.Container => {
    const section = new PIXI.Container();

    const sectionSlice = drawSectionSlice(
      member,
      this.radius,
      this.members.length,
      index
    );
    const sectionLabel = createSectionText(
      member,
      this.radius,
      this.members.length,
      index
    );

    section.addChild(sectionSlice);
    section.addChild(sectionLabel);

    return section;
  };

  private mountWheel = (wheel: PIXI.Container) => {
    wheel.pivot.set(this.radius, this.radius);
    wheel.position.set(
      this.application.renderer.width / 2,
      this.application.renderer.height / 2
    );
    this.application.stage.addChild(wheel);

    this.rotationStart = () => {
      const rotationSpeed = Math.random(); //TODO: This is temporary
      this.spinWheel(rotationSpeed);
    };

    this.container.addEventListener("click", this.rotationStart);
  };

  private spinWheel = (initialRotationSpeed: number) => {
    let rotationSpeed = initialRotationSpeed;

    this.ticker = (delta) => {
      if (this.wheel) {
        this.wheel.rotation += rotationSpeed * delta;
        rotationSpeed = rotationSpeed > 0.0001 ? rotationSpeed * 0.99 : 0;
      }

      if (this.ticker && (rotationSpeed === 0 || !this.wheel)) {
        this.application.ticker.remove(this.ticker);
      }
    };

    this.wheel && this.application.ticker.add(this.ticker);
  };
}
