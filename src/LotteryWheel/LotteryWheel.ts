import * as PIXI from "pixi.js";
import { calculateRadians, calculateRadius } from "../utils";
import { validateMembers } from "../utils/validation";
import {
  CompleteLotteryWheelOptions,
  CompleteMember,
  CompleteMembers,
  Members,
} from "./types";

export class LotteryWheel {
  private members: CompleteMembers;

  private app: PIXI.Application;
  private wheel: PIXI.Container;
  private radius: number;
  private radiansPerSection: number;

  // private onWheelStop: (winner: Member) => void;

  static create = (
    target: HTMLDivElement,
    options: CompleteLotteryWheelOptions
  ) => {
    return new LotteryWheel(target, options);
  };

  public setMembers = (members: Members) => {
    this.members = validateMembers(members);
  };

  private constructor(
    target: HTMLDivElement,
    options: CompleteLotteryWheelOptions
  ) {
    this.members = options.members;
    // this.onWheelStop = options.onWheelStop;

    this.app = this.createApp(target);
    this.wheel = new PIXI.Container();

    this.radius = calculateRadius(this.app.renderer);
    this.radiansPerSection = calculateRadians(this.members.length);

    this.createWheel();
    this.mountView(target);
  }

  private createApp = (target: HTMLDivElement) => {
    const application = new PIXI.Application({
      resizeTo: target,
      antialias: true,
      transparent: true,
    });

    return application;
  };

  private createWheel = () => {
    this.drawSections();
    this.mountWheel();
  };

  private drawSections = () => {
    this.members.forEach((member, index) => {
      const section = this.drawSection(member, index);
      this.wheel.addChild(section);
    });
  };

  private drawSection = (member: CompleteMember, index: number) => {
    const section = new PIXI.Container();

    const startingAngle =
      index * this.radiansPerSection - this.radiansPerSection / 2;
    const endingAngle = startingAngle + this.radiansPerSection;

    const sectionSlice = this.drawSectionSlice(
      member,
      startingAngle,
      endingAngle
    );
    const sectionLabel = this.createSectionText(member, index);

    section.addChild(sectionSlice);
    section.addChild(sectionLabel);

    return section;
  };

  private drawSectionSlice = (
    member: CompleteMember,
    startingAngle: number,
    endingAngle: number
  ) => {
    const slice = new PIXI.Graphics();

    slice.beginFill(member.color);
    slice.lineStyle(2, 0x000000, 1);
    slice.moveTo(this.radius, this.radius);
    slice.arc(
      this.radius,
      this.radius,
      this.radius,
      startingAngle,
      endingAngle
    );
    slice.lineTo(this.radius, this.radius);

    return slice;
  };

  private createSectionText = (member: CompleteMember, index: number) => {
    const label = new PIXI.Text(member.label, { fill: "#ffffff" });
    const rotation = this.radiansPerSection * index;
    const textAnchorPercentage = this.radius / 2 / this.radius;

    label.anchor.set(0.5, 0.5);
    label.rotation = rotation + Math.PI;

    label.position.x =
      this.radius + this.radius * textAnchorPercentage * Math.cos(rotation);

    label.position.y =
      this.radius + this.radius * textAnchorPercentage * Math.sin(rotation);

    return label;
  };

  private mountWheel = () => {
    this.wheel.pivot.set(this.radius, this.radius);
    this.wheel.position.set(
      this.app.renderer.width / 2,
      this.app.renderer.height / 2
    );
    this.app.stage.addChild(this.wheel);
  };

  private mountView = (target: HTMLDivElement) => {
    target.appendChild(this.app.view);
    this.spinWheel();
  };

  private spinWheel = () => {
    this.app.ticker.add((delta) => {
      this.wheel.rotation += 0.1 * delta;
    });
  };
}
