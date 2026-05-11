class FigureEight {
  constructor(img) {
    this.t = 0;
    this.speed = 0.03;

    // 8字大小
    this.A = width * 0.03;
    this.B = height * 0.02;
    this.img = img;
  }

  update() {
    this.t += this.speed;
  }

  display() {
    push();
    translate(width / 2, height / 2 - 100);

    // 画轨迹（可选）
    noFill();
    stroke(60);
    beginShape();
    for (let i = 0; i < TWO_PI; i += 0.02) {
      let x = this.A * sin(i);
      let y = this.B * sin(2 * i);
      vertex(x, y);
    }
    endShape();

    // 计算当前位置
    let x = this.A * sin(this.t);
    let y = this.B * sin(2 * this.t);

    // 画移动的点
    noStroke();
    fill(255);
    image(this.img, x - this.img.width / 2, y - this.img.height / 2);

    pop();
  }
}