import AnimateValue from "./AnimateValue";

export default class AnimateFloat extends AnimateValue {
  constructor(settings) {
    super(settings);

    this._difference = this._to - this._from;

    this._increment = this._difference / this._totalActiveFrames;

    this._valuesArr = [];
    this._generateValues();
  }

  _generateValues() {
    for (let i = 0; i <= this._totalDelayFrames; i++) {
      this._valuesArr.push(this._from);
    }
    for (let i = 1; i < this._totalActiveFrames; i++) {
      this._valuesArr.push(
        this._valuesArr[this._totalDelayFrames + i - 1] + this._increment
      );
    }
    this._valuesArr.push(this._to);
  }
}
