import * as PIXI from "pixi.js";

export const sayHello = (): void => {
  PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? "WebGL" : "Canvas");
};
