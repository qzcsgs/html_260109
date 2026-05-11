
class OrbitIcon {
  constructor(images) {
    this.images = images;
    this.angle = 0;       // 全局旋转角度
    this.speed = 0.005;    // 旋转速度
    this.posList = [];

    this.a = width * 0.35;  // 椭圆横半径
    this.b = height * 0.3;  // 椭圆纵半径
  }

  update() {
    this.angle += this.speed; // 顺时针旋转
    for (let i = 0; i < this.images.length; i++) {
      let t = this.angle + TWO_PI * i / this.images.length;

      let x = this.a * cos(t);
      let y = this.b * sin(t);

      this.posList[i] = { x: x + width / 2, y: y + height / 2 };
    }
  }

  display() {
    push();
    noStroke();
    fill(255);
    for (let i = 0; i < this.images.length; i++) {
      image(this.images[i], this.posList[i].x - this.images[i].width / 2, this.posList[i].y - this.images[i].height / 2);
    }
    pop();
  }

  mousePressed() {
    let index = -1;

    for (let i = 0; i < this.images.length; i++) {
      if (mx >= this.posList[i].x - this.images[i].width / 2 && mx <= this.posList[i].x + this.images[i].width / 2 && my >= this.posList[i].y - this.images[i].height / 2 && my <= this.posList[i].y + this.images[i].height / 2) {
        index = i;
        break;
      }
    }

    return index;
  }
}