let canvasDOM;
let scaleRatioH
let scaleRatioW
let mx, my;

let screenFlash;

let step = 1;
let coverImgs = [];
let coverIcons = [];
let showQuery = false;
let step1_camY = 1080;

let sceneChooseImgs = [];
let sceneChooseOrbitIcon;
let sceneBgImg, sceneTitleImg;
let sceneChooseIndex = -1;

let bgImages = [];
let typeImgs = [[], [], []];
let typeIcons = [[], [], []];
let homeButtonImg;
let homeButtonIcon;
let camImg;
let camIcon;
let phoneImg;
let phoneIcon;
let showCam = true;
let showPhone = false;
let phoneTipsImg;
let phoneTipsTime = 0;
let isFault = false;
let faultColor = null;
let weiyeBgImg;
let weiyeBgTitleImgs = [];
let weiyeTitleOffset = []
let weiyeTitleA = 0;
let weiyeTime = 0;
let showCoverCam = false;
let tipsImg;
let step3Time = 0;
let step3TipsA = 0;
let backImg;
let backIcon;
let phoneScale = 1;
let titleIndex = 0;
let fauletBgImgs = [];
let fauletBackground = [];

let figureEight;
let bgm, kacha, click, typing;

function preload() {
  bgm = loadSound('assets/bgm.ogg');
  kacha = loadSound('assets/shutter.mp3');
  click = loadSound('assets/click.mp3');
  typing = loadSound('assets/typing.mp3');

  coverImgs.push(loadImage('assets/cover/标题.png'));
  coverImgs.push(loadImage('assets/cover/叉.png'));
  coverImgs.push(loadImage('assets/cover/刀.png'));
  coverImgs.push(loadImage('assets/cover/筷.png'));
  coverImgs.push(loadImage('assets/cover/勺.png'));
  coverImgs.push(loadImage('assets/cover/手势.png'));
  coverImgs.push(loadImage('assets/cover/问题.png'));
  coverImgs.push(loadImage('assets/cover/主页.png'));
  coverImgs.push(loadImage('assets/cover/no.png'));
  coverImgs.push(loadImage('assets/cover/yes.png'));

  for (let i = 0; i < 9; i++) {
    sceneChooseImgs.push(loadImage('assets/scene_choose/' + (i + 1) + '.png'));
  }

  sceneBgImg = loadImage('assets/scene_choose/背景.png');
  sceneTitleImg = loadImage('assets/scene_choose/标题.png');

  for (let i = 0; i < 3; i++) {
    bgImages.push(loadImage('assets/bg/' + (i + 1) + '.png'));
  }
  for (let i = 0; i < 6; i++) {
    typeImgs[0].push(loadImage('assets/1/image_' + (i + 1) + '.png'));
  }
  for (let i = 0; i < 7; i++) {
    typeImgs[1].push(loadImage('assets/2/image_' + (i + 1) + '.png'));
  }
  for (let i = 0; i < 7; i++) {
    typeImgs[2].push(loadImage('assets/3/image_' + (i + 1) + '.png'));
  }
  homeButtonImg = loadImage('assets/home.png');
  camImg = loadImage('assets/cam.png');
  phoneImg = loadImage('assets/phone.png');
  phoneTipsImg = loadImage('assets/phone_tips.png');
  weiyeBgImg = loadImage('assets/weiye/bg.png');
  for (let i = 1; i <= 31; i++) {
    weiyeBgTitleImgs.push(loadImage('assets/weiye/title/image_' + i + '.png'));
    weiyeTitleOffset.push(random(-10, 10));
  }
  tipsImg = loadImage('assets/tips.png');
  backImg = loadImage('assets/back.png');
  for (let i = 1; i <= 9; i++) {
    fauletBgImgs.push(loadImage('assets/f_bg/image_' + i + '.jpg'));
  }
}

function setup() {
  const canvas = createCanvas(1920, 1080);
  canvasDOM = canvas.elt;

  screenFlash = new ScreenFlash();

  resizeImage();
  initIcons();
  scaleMain();
}

function initIcons() {
  figureEight = new FigureEight(coverImgs[0]);
  coverIcons.push(new Icon(coverImgs[2], 0, 194, true));
  coverIcons.push(new Icon(coverImgs[1], 160, 298, true));
  coverIcons.push(new Icon(coverImgs[4], 1647, 319, true));
  coverIcons.push(new Icon(coverImgs[3], 1816, 248, true));

  sceneChooseOrbitIcon = new OrbitIcon(sceneChooseImgs);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < typeImgs[i].length; j++) {
      let x = random(113, 1823 - typeImgs[i][j].width)
      let y = random(411, 1073 - typeImgs[i][j].height);
      typeIcons[i].push(new Icon(typeImgs[i][j], x, y, false));
    }
  }

  homeButtonIcon = new Icon(homeButtonImg, width / 2 - homeButtonImg.width / 2, 20, false);
  camIcon = new Icon(camImg, 36, 300, false);
  phoneIcon = new Icon(phoneImg, width / 2 - phoneImg.width / 2, 20, false);
  backIcon = new Icon(backImg, 36, 300, false);
  fauletBackground[0] = new FauletBackground(bgImages[0], [fauletBgImgs[0], fauletBgImgs[1], fauletBgImgs[2]]);
  fauletBackground[1] = new FauletBackground(bgImages[1], [fauletBgImgs[3], fauletBgImgs[4], fauletBgImgs[5]]);
  fauletBackground[2] = new FauletBackground(bgImages[2], [fauletBgImgs[6], fauletBgImgs[7], fauletBgImgs[8]]);
}

function resizeImage() {
  resizeImgs(coverImgs);
  resizeImgs(sceneChooseImgs);
  resizeImgs([sceneBgImg, sceneTitleImg, homeButtonImg, camImg, phoneImg, phoneTipsImg, weiyeBgImg, tipsImg, backImg]);
  resizeImgs(bgImages);
  for (let i = 0; i < typeImgs.length; i++) {
    resizeImgs(typeImgs[i]);
  }
  resizeImgs(weiyeBgTitleImgs);
  resizeImgs(fauletBgImgs);
}

function resizeImgs(imgs) {
  for (let img of imgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
}

function draw() {
  background(255);

  mx = mouseX / scaleRatioW;
  my = mouseY / scaleRatioH;

  if (step == 1) {
    image(coverImgs[7], 0, 0);

    figureEight.update();
    figureEight.display();

    for (let icon of coverIcons) {
      icon.display();
      icon.update();
    }
    for (let icon of coverIcons) {
      if (icon.drag) {
        icon.display();
      }
    }
    if (showQuery) {
      if (showCoverCam) {
        step1_camY = lerp(step1_camY, height - coverImgs[5].height, 0.05);
        image(coverImgs[5], width / 2 - coverImgs[5].width / 2, step1_camY);
        if (abs(step1_camY - (height - coverImgs[5].height)) < 5 && !screenFlash.active) {
          screenFlash.start(() => {
            step = 2;
          });
        }
      } else {
        image(coverImgs[6], width / 2 - coverImgs[6].width / 2, height / 2 + 90);
        push();
        let lx = width / 2 - coverImgs[9].width / 2 - 200;
        let ly = height / 2 + 190;
        translate(lx + coverImgs[9].width / 2, ly + coverImgs[9].height / 2);
        if (mx > lx && mx < lx + coverImgs[9].width && my > ly && my < ly + coverImgs[9].height) {
          scale(1.1);
        } else {
          scale(1);
        }
        image(coverImgs[9], -coverImgs[9].width / 2, -coverImgs[9].height / 2);
        if (mx > lx && mx < lx + coverImgs[9].width && my > ly && my < ly + coverImgs[9].height) {
          noFill();
          stroke(255);
          strokeWeight(5);
          rectMode(CENTER);
          rect(0, -20, 170, 75, 50);
          rectMode(CORNER);
        }
        pop();

        push();
        lx = width / 2 - coverImgs[8].width / 2 + 200;
        translate(lx + coverImgs[8].width / 2, ly + coverImgs[8].height / 2);
        if (mx > lx && mx < lx + coverImgs[8].width && my > ly && my < ly + coverImgs[8].height) {
          scale(1.1);
        } else {
          scale(1);
        }
        image(coverImgs[8], -coverImgs[8].width / 2, -coverImgs[8].height / 2);
        if (mx > lx && mx < lx + coverImgs[8].width && my > ly && my < ly + coverImgs[8].height) {
          noFill();
          stroke(255);
          strokeWeight(5);
          rectMode(CENTER);
          rect(0, -20, 170, 75, 50);
          rectMode(CORNER);
        }
        pop();
      }
    }
  } else if (step == 2) {
    image(sceneBgImg, 0, 0);
    image(sceneTitleImg, width / 2 - sceneTitleImg.width / 2, height / 2 - sceneTitleImg.height / 2);
    sceneChooseOrbitIcon.update();
    sceneChooseOrbitIcon.display();
  } else if (step == 3) {
    if (isFault) {
      fauletBackground[sceneChooseIndex].update();
      fauletBackground[sceneChooseIndex].display();
    } else {
      image(bgImages[sceneChooseIndex], 0, 0);
    }
    for (let icon of typeIcons[sceneChooseIndex]) {
      icon.display();
      icon.update();
    }
    for (let icon of typeIcons[sceneChooseIndex]) {
      if (icon.drag) {
        icon.display();
      }
    }
    if (!isFault || typeIcons[sceneChooseIndex].length > 200) {
      homeButtonIcon.display();
    }
    if (showCam) {
      camIcon.display();
      camIcon.shousuo();
    }
    if (showPhone) {
      phoneIcon.display();
      phoneIcon.update(phoneScale);

      if (millis() - phoneTipsTime <= 2000) {
        image(phoneTipsImg, width / 2 - phoneTipsImg.width / 2, height - 100 - phoneTipsImg.height / 2);
      }

      if (!isFault) {
        backIcon.display();
      }
    }
    if (isFault) {
      if (frameCount % 15 == 0) {
        let icons = typeIcons[sceneChooseIndex];
        let index = int(random(typeImgs[sceneChooseIndex].length));
        let img = typeImgs[sceneChooseIndex][index];
        let icon = new Icon(img, random(-300, width), random(-300, height), false);
        icon.scale = random(0.5, 1);
        icons.push(icon);
      }
      if (mouseIsPressed && frameCount % 2 == 0) {
        let icons = typeIcons[sceneChooseIndex];
        let index = int(random(sceneChooseIndex * 3, sceneChooseIndex * 3 + 2));
        let img = sceneChooseImgs[index];
        icons.push(new Icon(img, mx - img.width / 2, my - img.height / 2, false));
      }
    }
    if (millis() - step3Time <= 4000) {
      step3TipsA = min(255, step3TipsA + 5);
      tint(255, step3TipsA);
      image(tipsImg, width / 2 - tipsImg.width / 2, height - 100 - tipsImg.height / 2);
      noTint();
    }
  } else if (step == 4) {
    if (frameCount % 15 == 0) {
      titleIndex++;
    }
    image(weiyeBgImg, 0, 0);
    let titleWidthCount1 = 0;
    let len1 = 19;
    for (let i = 0; i < len1; i++) {
      titleWidthCount1 += weiyeBgTitleImgs[i].width;
    }
    let titleStartX = width / 2 - titleWidthCount1 / 2;
    for (let i = 0; i < len1; i++) {
      if (i <= titleIndex) {
        let offsetY = weiyeTitleOffset[i];
        image(weiyeBgTitleImgs[i], titleStartX, height / 2 - 40 - weiyeBgTitleImgs[i].height / 2 + offsetY);
      }
      titleStartX += weiyeBgTitleImgs[i].width;
    }
    let titleWidthCount2 = 0;
    let len2 = weiyeBgTitleImgs.length;
    for (let i = len1; i < len2; i++) {
      titleWidthCount2 += weiyeBgTitleImgs[i].width;
    }
    titleStartX = width / 2 - titleWidthCount2 / 2;
    for (let i = len1; i < len2; i++) {
      if (i < titleIndex) {
        let offsetY = weiyeTitleOffset[i];
        image(weiyeBgTitleImgs[i], titleStartX, height / 2 + 40 - weiyeBgTitleImgs[i].height / 2 + offsetY);
      }
      titleStartX += weiyeBgTitleImgs[i].width + 2;
    }
  }
  screenFlash.update();
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    window.location.reload();
  }
}

function doubleClicked() {
  if (step == 1) {
    showQuery = true;
  }
}

function mousePressed() {
  if (!bgm.isLooping()) {
    bgm.loop();
  }

  console.log(int(mx), int(my));
  if (step == 1) {
    for (let i = coverIcons.length - 1; i >= 0; i--) {
      let icon = coverIcons[i];
      let bool = icon.mousePressed();
      if (bool) {
        break;
      }
    }

    if (showQuery) {
      let lx = width / 2 - coverImgs[9].width / 2 - 200;
      let ly = height / 2 + 190;
      let bool1 = mx > lx && mx < lx + coverImgs[9].width && my > ly && my < ly + coverImgs[9].height;
      lx = width / 2 - coverImgs[8].width / 2 + 200;
      let bool2 = mx > lx && mx < lx + coverImgs[8].width && my > ly && my < ly + coverImgs[8].height;
      if (bool1 || bool2) {
        showCoverCam = true;
        click.play();
      }
    }
  } else if (step == 2) {
    let index = sceneChooseOrbitIcon.mousePressed();
    if (index > -1) {
      sceneChooseIndex = int(index / 3);
      step = 3;
      step3Time = millis();
      step3TipsA = 0;
    }
  } else if (step == 3) {
    if (!isFault && !showPhone) {
      let index = -1;
      for (let i = typeIcons[sceneChooseIndex].length - 1; i >= 0; i--) {
        let bool = typeIcons[sceneChooseIndex][i].mousePressed();
        if (bool) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        moveIndexToEnd(typeIcons[sceneChooseIndex], index);
      }
    }

    if (!isFault && homeButtonIcon.mousePressed()) {
      window.location.reload();
    }
    if (typeIcons[sceneChooseIndex].length > 100 && homeButtonIcon.mousePressed()) {
      step = 4;
      weiyeTime = millis();
      typing.play();
    }
    if (showPhone) {
      let bool = phoneIcon.mousePressed();
      let takePhoneX = phoneIcon.x + phoneIcon.img.width / 2 - phoneIcon.scale * phoneIcon.img.width / 2 + (phoneIcon.img.width - 112) * phoneIcon.scale;
      let takePhoneY = phoneIcon.y + phoneIcon.img.height / 2 - phoneIcon.scale * phoneIcon.img.height / 2 + (phoneIcon.img.height / 2) * phoneIcon.scale;
      if (bool && dist(mx, my, takePhoneX, takePhoneY) < 50 * phoneIcon.scale) {
        showPhone = false;
        isFault = true;
        screenFlash.start();
      }

      if (!isFault && backIcon.mousePressed()) {
        step = 2;
        reset();
        return;
      }
    }
    if (showCam && camIcon.mousePressed()) {
      showPhone = true;
      phoneTipsTime = millis();
      showCam = false;
    }
  } else if (step == 4) {
    if (millis() - weiyeTime >= 3 * 1000) {
      window.location.reload();
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < coverIcons.length; i++) {
    coverIcons[i].mouseReleased();
  }
  if (sceneChooseIndex >= 0) {
    let icons = typeIcons[sceneChooseIndex];
    for (let i = 0; i < icons.length; i++) {
      icons[i].mouseReleased();
    }
  }
  phoneIcon.mouseReleased();
  backIcon.mouseReleased();
  camIcon.mouseReleased();
  homeButtonIcon.mouseReleased();
}

function mouseWheel(e) {
  e.preventDefault();
  if (e.deltaY > 0) {
    console.log('放大');
    if (step == 3) {
      phoneScale = min(1.5, phoneScale + 0.1);
    }
  } else {
    if (step == 3) {
      phoneScale = max(0.5, phoneScale - 0.1);
    }
  }
}

function scaleMain() {
  if (canvasDOM) {
    scaleRatioH = window.innerHeight / canvasDOM.offsetHeight;
    scaleRatioW = window.innerWidth / canvasDOM.offsetWidth;
    canvasDOM.style.transform = `scale(${scaleRatioW}, ${scaleRatioH})`;
  }
}
window.addEventListener('resize', scaleMain);

function moveIndexToEnd(arr, index) {
  // 边界保护
  if (!Array.isArray(arr)) return arr;
  if (index < 0 || index >= arr.length) return arr;

  // 取出该元素
  const item = arr.splice(index, 1)[0];

  // 放到末尾
  arr.push(item);

  return arr;
}

function reset() {
  showCam = true;
  showPhone = false;
  isFault = false;
  showCoverCam = false;
  typeIcons = [[], [], []];
  phoneScale = 1;
  titleIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < typeImgs[i].length; j++) {
      let x = random(113, 1823 - typeImgs[i][j].width)
      let y = random(411, 1073 - typeImgs[i][j].height);
      typeIcons[i].push(new Icon(typeImgs[i][j], x, y, false));
    }
  }
}