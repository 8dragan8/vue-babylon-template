import { ArcRotateCamera, Vector3 } from "@babylonjs/core/Legacy/legacy";

const ALPHA = 1.2 * Math.PI;
const BETA = 0.45 * Math.PI;
const RADIUS = 100;

export default class MainArcCamera extends ArcRotateCamera {
  constructor(scene, canvas) {
    super("MainArcCamera", ALPHA, BETA, RADIUS, Vector3.Zero(), scene);
    this.attachControl(canvas, true);
    this._canvas = canvas;
    this.minZ = 0.1;
    this.maxZ = 10000;

    this.upperRadiusLimit = 10000;

    // this.lowerBetaLimit = 0;
    // this.upperBetaLimit = Math.PI *2;
    this.animationStage = 0;
    this.wheelDeltaPercentage = 0.01;
  }
}
