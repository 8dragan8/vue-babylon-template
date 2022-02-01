import "@babylonjs/loaders/glTF";
import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  PhotoDome,
} from "@babylonjs/core/Legacy/legacy";

import MouseHandler from "../methods/MouseHandler";
import RegisterMaterials from "@bMat";

import MainArcCamera from "@bCamera/MainArcCamera";
import { AppAssets } from "@bHelper/AppAssets";

export default class BabylonApp {
  constructor(canvas) {
    this._engine = null;
    this._scene = null;
    this._camera = null;
    this._renderLoop = null;
    this._canvas = canvas;

    this._engine = new Engine(this._canvas);
    this._scene = new Scene(this._engine);
    this._babylonAssetManager = new AppAssets(this._scene);

    this._pickSphere = null;

    this._currentHoveredMesh = null;
    this._lastHoveredMesh = null;

    this._currentSelectedMesh = null;
    this._lastSelectedMesh = null;

    this._appStatus = "start";

    this._scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: false,
    });
    this._createSkyDome();
    // new AxesViewer(this._scene, 10);

    this._camera = new MainArcCamera(this._scene, this._canvas);

    let hemLight = new HemisphericLight("hem01", Vector3.Up(), this._scene);
    hemLight.intensity = 0.35;
    RegisterMaterials(this._scene);
    this._addKeyDownListener();
    this._loadAssets();
  }
  _pauseApp() {
    this._appStatus = "pause";
  }
  _startApp() {
    this._appStatus = "play";
  }

  _loadAssets() {
    this._babylonAssetManager._addTaskOnSuccess((task) =>
      this._onLoadedGLB(task)
    );
    this._babylonAssetManager.load();
  }

  _toggleInspector() {
    if (this._scene.debugLayer.isVisible()) {
      this._scene.debugLayer.hide();
    } else {
      this._scene.debugLayer.show();
    }
  }

  _addKeyDownListener() {
    window.addEventListener("keydown", (e) => {
      // hide/show the Inspector
      // Shift+Ctrl+Alt+I
      if (e.shiftKey && e.ctrlKey && e.altKey && e.key === "I") {
        this._toggleInspector();
      }
    });
  }
  _onLoadedGLB(task) {
    console.log(
      "🚀 ~ file: index.js ~ line 89 ~ BabylonApp ~ _onLoadedGLB ~ task",
      task
    );

    this._onClick = () => {};
    this._onDblClick = () => {};

    MouseHandler(this._scene, {
      onClick: this._onClick,
      onDblClick: this._onDblClick,
    });
  }

  _createSkyDome() {
    let textureURL = `/skydome.jpg`;
    let dome = new PhotoDome(
      "testDome",
      textureURL,
      {
        resolution: 32,
        size: 1000,
      },
      this._scene
    );
    dome.position = new Vector3(0, 0, 0);
    dome.rotation = new Vector3(0, 0, 0);
    dome.isPickable = false;

    let testDomeMesh = this._scene.getMeshByID(`testDome_mesh`);
    testDomeMesh.isPickable = false;
  }
}
