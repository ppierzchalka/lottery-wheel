import * as PIXI from "pixi.js";

export class LotteryWheel {
  private application: PIXI.Application;

  static create = (target: HTMLDivElement, options: {}) => {
    return new LotteryWheel(target, options);
  };

  private constructor(target: HTMLDivElement, _options: {}) {
    this.application = this.createApplication(target);
    this.mount(target);
  }

  private createApplication = (target: HTMLDivElement) => {
    const application = new PIXI.Application({
      autoStart: true,
      resizeTo: target,
      antialias: true,
    });

    return application;
  };

  private mount = (target: HTMLDivElement) => {
    target.appendChild(this.application.view);
  };
}
