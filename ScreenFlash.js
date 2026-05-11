class ScreenFlash {
  constructor() {
    this.active = false;
    this.show = false;
    this.showCount = 6;
    this.startTime = 0;
  }

  start(callback = () => { }) {
    this.startTime = millis();
    this.active = true;
    this.show = true;
    this.showCount = 12;
    this.callback = callback;
    kacha.play();
  }

  update() {
    if (!this.active) return;

    if (millis() - this.startTime >= 1300) {
      this.active = false;
      if (this.callback) this.callback();
      return;
    } else if (this.show && this.showCount > 0) {
      this.showCount--;
      // 绘制白色遮罩
      push();
      noStroke();
      fill(255, 150);
      rect(0, 0, width, height);
      pop();
      if (this.showCount <= 0) {
        this.show = false;
      }
    }
  }
}
