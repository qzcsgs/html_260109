class Icon {
  constructor(img, x, y, doudong) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.drag = false;
    this.doudong = doudong;
    this.scale = 1;
    this.scaleD = 0.01;
  }

  shousuo() {
    this.scale += this.scaleD;
    if (this.scale > 1.1 || this.scale < 0.9) {
      this.scaleD = -this.scaleD;
    }
  }

  display() {
    let offsetX = 0;
    let offsetY = 0;
    if (this.doudong && !this.drag && frameCount % 120 < 30) {
      offsetX = random(-3, 3);
      offsetY = random(-3, 3);
    }
    push();
    translate(this.x + offsetX + this.img.width / 2, this.y + offsetY + this.img.height / 2);
    scale(this.scale);
    translate(-this.img.width / 2, -this.img.height / 2);
    image(this.img, 0, 0);
    pop();

    // fill(255, 25, 25, 50);
    // rect(this.x + this.img.width / 2 - this.scale * this.img.width / 2, this.y + this.img.height / 2 - this.scale * this.img.height / 2, this.scale * this.img.width, this.scale * this.img.height);
    // let takePhoneX = this.x + this.img.width / 2 - this.scale * this.img.width / 2 + (this.img.width - 112) * this.scale;
    // let takePhoneY = this.y + this.img.height / 2 - this.scale * this.img.height / 2 + (this.img.height / 2) * this.scale;
    // ellipse(takePhoneX, takePhoneY, 100 * this.scale, 100 * this.scale);
  }

  update(_scale = 1) {
    this.scale = _scale;
    if (this.drag) {
      this.x = mx - this.img.width / 2;
      this.y = my - this.img.height / 2;
    }
  }

  mousePressed() {
    let startX = this.x + this.img.width / 2 - this.scale * this.img.width / 2;
    let startY = this.y + this.img.height / 2 - this.scale * this.img.height / 2;
    let w = this.scale * this.img.width;
    let h = this.scale * this.img.height;
    if (mx >= startX && mx <= startX + w && my >= startY && my <= startY + h) {
      this.drag = true;
    }
    return this.drag;
  }

  mouseReleased() {
    this.drag = false;
  }
}
