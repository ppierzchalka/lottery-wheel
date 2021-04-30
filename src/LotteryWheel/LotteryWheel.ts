import * as PIXI from "pixi.js";
import { calculateRadians, calculateRadius } from "../utils";
import { validateMembers } from "../utils/validation";
import {
  CompleteLotteryWheelOptions,
  CompleteMember,
  CompleteMembers,
  Member,
  Members,
} from "./types";

export class LotteryWheel {
  private members: CompleteMembers;

  private application: PIXI.Application;
  private sectionGraphic: PIXI.Graphics;
  private textContainer: PIXI.Container;
  private wheel: PIXI.Container;
  private radius: number;
  private radiansPerSection: number;

  private onWheelStop: (winner: Member) => void;

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
    this.onWheelStop = options.onWheelStop;

    console.log(this.members, this.onWheelStop);

    this.application = this._createApplication(target);
    this.sectionGraphic = new PIXI.Graphics();
    this.textContainer = new PIXI.Container();
    this.wheel = new PIXI.Container();

    this.radius = calculateRadius(this.application.renderer);
    this.radiansPerSection = calculateRadians(this.members.length);
    this._createWheel();
    this._mount(target);
  }

  private _createApplication = (target: HTMLDivElement) => {
    const application = new PIXI.Application({
      resizeTo: target,
      antialias: true,
    });

    return application;
  };

  private _createWheel = () => {
    this._drawSections();
    this._mountWheel();
  };

  private _drawSections = () => {
    this.members.forEach((member, index) => {
      this._drawSection(member, index);
    });
  };

  private _drawSection = (member: CompleteMember, index: number) => {
    const startingAngle =
      index * this.radiansPerSection - this.radiansPerSection / 2;
    const endingAngle = startingAngle + this.radiansPerSection;

    this.sectionGraphic.beginFill(member.color);
    this.sectionGraphic.lineStyle(2, 0xffffff, 1);
    this.sectionGraphic.moveTo(this.radius, this.radius);
    this.sectionGraphic.arc(
      this.radius,
      this.radius,
      this.radius,
      startingAngle,
      endingAngle
    );
    this.sectionGraphic.lineTo(this.radius, this.radius);

    this.createSectorText(member, index);
  };

  private createSectorText = (member: CompleteMember, index: number) => {
    const label = new PIXI.Text(member.label, { fill: "#ffffff" });
    const rotation = this.radiansPerSection * index;
    const textAnchorPercentage = this.radius / 2 / this.radius;

    label.anchor.set(0.5, 0.5);
    label.rotation = rotation + Math.PI;

    label.position.x =
      this.radius + this.radius * textAnchorPercentage * Math.cos(rotation);

    label.position.y =
      this.radius + this.radius * textAnchorPercentage * Math.sin(rotation);

    this.textContainer.addChild(label);
  };

  private _mountWheel = () => {
    this.wheel.pivot.set(this.radius, this.radius);
    this.wheel.position.set(
      this.application.renderer.width / 2,
      this.application.renderer.height / 2
    );
    this.wheel.addChild(this.sectionGraphic, this.textContainer);
    this.application.stage.addChild(this.wheel);
  };

  private _mount = (target: HTMLDivElement) => {
    target.appendChild(this.application.view);
  };

  // private _spinWheel = () => {
  //   // TODO: make the wheel move
  // }
}
