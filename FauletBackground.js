class FauletBackground {
  constructor(origin, images) {
    this.origin = origin;
    this.images = images;
    this.currentImage = origin;
    this.lastSwitchTime = 0;
    this.switchInterval = 0;
    this.isShowingFaulet = false;
    this.fauletShowTime = 0;
    
    // 初始化第一个随机间隔
    this.setRandomInterval();
  }

  display() {
    image(this.currentImage, 0, 0);
  }

  update() {
    const currentTime = millis();
    
    if (this.isShowingFaulet) {
      // 检查是否已经显示故障图像100ms
      if (currentTime - this.fauletShowTime >= 50) {
        // 切换回原始图像
        this.currentImage = this.origin;
        this.isShowingFaulet = false;
        this.lastSwitchTime = currentTime;
        this.setRandomInterval();
      }
    } else {
      // 检查是否到了切换到故障图像的时间
      if (currentTime - this.lastSwitchTime >= this.switchInterval) {
        // 从图像数组中随机选择一个图像
        const randomIndex = floor(random(this.images.length));
        this.currentImage = this.images[randomIndex];
        this.isShowingFaulet = true;
        this.fauletShowTime = currentTime;
      }
    }
  }
  
  setRandomInterval() {
    // 设置500ms到1500ms之间的随机间隔
    this.switchInterval = random(300, 2500);
  }
}