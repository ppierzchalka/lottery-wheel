import * as PIXI from "pixi.js";
import { LotteryWheelOptions, Members } from "./types";

export class LotteryWheel {
  private application: PIXI.Application;
  private members: Members;

  static create = (target: HTMLDivElement, options: LotteryWheelOptions) => {
    return new LotteryWheel(target, options);
  };

  private constructor(target: HTMLDivElement, options: LotteryWheelOptions) {
    this.members = options.members;
    console.log(this.members);

    this.application = this._createApplication(target);
    this._mount(target);
  }

  private _createApplication = (target: HTMLDivElement) => {
    const application = new PIXI.Application({
      autoStart: true,
      resizeTo: target,
      antialias: true,
    });

    return application;
  };

  private _mount = (target: HTMLDivElement) => {
    target.appendChild(this.application.view);
  };
}
