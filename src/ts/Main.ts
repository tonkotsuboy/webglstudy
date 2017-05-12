import * as THREE from "three";

import {BaseApp} from "./base/BaseApp";
import {EventName} from "./eventname/EventName";
import Clock from "./clock/Clock";
import MathUtil from "./util/MathUtil";
class Main extends BaseApp {
  private clockList:Clock[];

  private clockNum:number = 5;

  constructor() {
    super();

    this.clockList = [];

    for (let i = 0; i < this.clockNum; i++) {

      const clock = new Clock();
      clock.init();

      const clockRadian = MathUtil.convertToRadian((i / this.clockNum) * 360);
      clock.position.z = 5 * Math.cos(clockRadian)
      clock.position.x = 5 * Math.sin(clockRadian)

      clock.rotation.y = clockRadian;

      this.clockList.push(clock);
      this.scene.add(clock);

    }

  }

  protected render() {
    super.render();

    if (!this.clockList || this.clockList.length < 0) {
      return;
    }

    for (let i = 0; i < this.clockNum; i++) {
      this.clockList[i].update();
    }
  }
}

window.addEventListener(EventName.DOM_CONTENT_LOADED, () => new Main());