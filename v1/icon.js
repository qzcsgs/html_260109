class Icon {
  constructor(img, x, y, mode) {
    this.img = img;
    this.x = x + random(-300, 300);
    if (this.x > width - this.img.width / 2) {
      this.x = width - this.img.width / 2;
    }
    if (this.x < this.img.width / 2) {
      this.x = this.img.width / 2;
    }
    this.y = y + random(-300, 300);
    if (this.y > height - this.img.height / 2) {
      this.y = height - this.img.height / 2;
    }
    if (this.y < this.img.height / 2) {
      this.y = this.img.height / 2;
    }
    this.drag = false;
    this.mode = mode;
    this.dx = random([-0.5, 0.5]);
    this.dy = random([-0.5, 0.5]);
    this.fc = int(random(1000));
  }

  display() {
    image(this.img, this.x, this.y);
  }

  update() {
    if (this.drag) {
      this.x = mx - this.img.width / 2;
      this.y = my - this.img.height / 2;
    } else if (this.mode == 2) {
      // 上下左右浮动效果：让图标在 mode == 2 时缓慢漂移
      this.x += this.dx;
      this.y += this.dy;
      if (random(1) < 0.01) {
        this.dx = random([-0.5, 0.5]);
        this.dy = random([-0.5, 0.5]);
      }
      if (this.dx < 0 && this.x < this.img.width / 2) {
        this.dx = -this.dx;
      }
      if (this.dx > 0 && this.x > width - this.img.width / 2) {
        this.dx = -this.dx;
      }
      if (this.dy < 0 && this.y < this.img.height / 2) {
        this.dy = -this.dy;
      }
      if (this.dy > 0 && this.y > height - this.img.height / 2) {
        this.dy = -this.dy;
      }
    }

    this.fc++;
  }

  mousePressed() {
    if (mx >= this.x && mx <= this.x + this.img.width && my >= this.y && my <= this.y + this.img.height) {
      this.drag = true;
    }
    return this.drag;
  }

  mouseReleased() {
    this.drag = false;
  }
}
