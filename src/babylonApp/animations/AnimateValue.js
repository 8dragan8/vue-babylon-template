export default class AnimateValue {
  constructor({ duration, delay = 0, from, to, fps = 30 }) {
    this._duration = duration;
    this._delay = delay;
    this._from = from;
    this._to = to;
    this._totalActiveFrames = Math.floor(duration * (fps - 1));
    this._totalDelayFrames = Math.floor(this._delay * (fps - 1));

    this._totalFrames = this._totalActiveFrames + this._totalDelayFrames;

    this._difference = to - from;
    this._increment = this._difference / this._totalActiveFrames;

    this._currentFrame = 0;
    this._isStopped = true;
    this._isPlaying = false;
    this.observable = null;
  }
  play(e, prop) {
    this.observable = e._scene.onBeforeRenderObservable.add((theScene) => {
      let frame = this._currentFrame;
      if (frame < this._totalFrames) {
        this._isStopped = false;
        this._isPlaying = true;
        this._currentFrame++;
        e[prop] = this._valuesArr[frame];
      } else {
        this._isStopped = true;
        this._isPlaying = false;
        e[prop] = this._valuesArr[this._totalFrames];
        theScene.onBeforeRenderObservable.remove(this.observable);
      }
      // console.log(
      //   `${this._isPlaying ? "playing" : "stopped"} ${prop} - frame: ${
      //     this._currentFrame
      //   }`
      // );
    });
  }
}
