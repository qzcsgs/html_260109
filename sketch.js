let canvasDOM;
let scaleRatioH
let scaleRatioW
let mx, my;

let coverImg;
let menuImgs = [];
let bgImgs = [];
let type1IconImgs = [];
let type2IconImgs = [];
let type3IconImgs = [];
let type1IconFragImgs = [];
let type2IconFragImgs = [];
let type3IconFragImgs = [];
let previewImgs = [];
let camImg;
let mouseImg;
let baseMapImgs = [
  [],
  [],
  [],
];

let step = 1;
let typeIndex = -1; // 0甜品 1西餐 2日料
let typeIcons = [
  [],
  [],
  []
];
let takePhoto = false;
let photoPG;
let mosaicSize = 10;
let clipPoints = {}
let actionCount = 0;
let drawingBoard;

function preload() {
  coverImg = myLoadImage('images/cover.png');
  for (let i = 0; i < 3; i++) {
    menuImgs.push(myLoadImage(`images/menu-${i + 1}.png`));
  }
  for (let i = 0; i < 3; i++) {
    bgImgs.push(myLoadImage(`images/${i}/bg.png`));
  }

  for (let i = 0; i < 6; i++) {
    type1IconImgs.push(myLoadImage(`images/0/${i}.png`));
  }
  for (let i = 0; i < 7; i++) {
    type1IconFragImgs.push(myLoadImage(`images/0/frag/${i}.png`));
  }

  for (let i = 0; i < 6; i++) {
    type2IconImgs.push(myLoadImage(`images/1/${i}.png`));
  }
  for (let i = 0; i < 5; i++) {
    type2IconFragImgs.push(myLoadImage(`images/1/frag/${i}.png`));
  }

  for (let i = 0; i < 6; i++) {
    type3IconImgs.push(myLoadImage(`images/2/${i}.png`));
  }
  for (let i = 0; i < 6; i++) {
    type3IconFragImgs.push(myLoadImage(`images/2/frag/${i}.png`));
  }

  for (let i = 0; i < 3; i++) {
    previewImgs.push(myLoadImage(`images/preview-${i + 1}.png`));
  }

  camImg = myLoadImage('images/cam.png');
  mouseImg = myLoadImage('images/mouse.png');
  for (let i = 0; i < 3; i++) {
    baseMapImgs[i].push(myLoadImage(`images/${i}/basemap/1.png`));
    baseMapImgs[i].push(myLoadImage(`images/${i}/basemap/2.png`));
  }
}

function setup() {
  let canvas = createCanvas(1920, 1080);
  canvasDOM = canvas.elt;

  photoPG = createGraphics(1920, 1080);
  drawingBoard = createGraphics(1920, 1080);
  drawingBoard.clear();

  resizeImage();
  initIcons();
  scaleMain();
}

function initIcons() {
  typeIcons[0].push(new Icon(type1IconImgs[0], 356, 258, 1));
  typeIcons[0].push(new Icon(type1IconImgs[1], 237, 610, 1));
  typeIcons[0].push(new Icon(type1IconImgs[2], 675, 771, 1));
  typeIcons[0].push(new Icon(type1IconImgs[3], 697, 451, 1));
  typeIcons[0].push(new Icon(type1IconImgs[4], 952, 900, 1));
  typeIcons[0].push(new Icon(type1IconImgs[5], 1090, 618, 1));

  typeIcons[0].push(new Icon(type1IconFragImgs[0], 131, 584, 2));
  typeIcons[0].push(new Icon(type1IconFragImgs[1], 179, 422, 2));
  typeIcons[0].push(new Icon(type1IconFragImgs[2], 585, 701, 2));
  typeIcons[0].push(new Icon(type1IconFragImgs[3], 933, 160, 2));
  typeIcons[0].push(new Icon(type1IconFragImgs[4], 1059, 527, 2));
  typeIcons[0].push(new Icon(type1IconFragImgs[5], 1276, 443, 2));
  typeIcons[0].push(new Icon(type1IconFragImgs[6], 1450, 755, 2));

  typeIcons[1].push(new Icon(type2IconImgs[0], 352, 449, 1));
  typeIcons[1].push(new Icon(type2IconImgs[1], 613, 577, 1));
  typeIcons[1].push(new Icon(type2IconImgs[2], 1042, 75, 1));
  typeIcons[1].push(new Icon(type2IconImgs[3], 1322, 627, 1));
  typeIcons[1].push(new Icon(type2IconImgs[4], 345, 672, 1));
  typeIcons[1].push(new Icon(type2IconImgs[5], 1410, 426, 1));

  typeIcons[1].push(new Icon(type2IconFragImgs[0], 566, 300, 2));
  typeIcons[1].push(new Icon(type2IconFragImgs[1], 845, 319, 2));
  typeIcons[1].push(new Icon(type2IconFragImgs[2], 493, 548, 2));
  typeIcons[1].push(new Icon(type2IconFragImgs[3], 1575, 781, 2));
  typeIcons[1].push(new Icon(type2IconFragImgs[4], 115, 872, 2));

  typeIcons[2].push(new Icon(type3IconImgs[0], 1538, 351, 1));
  typeIcons[2].push(new Icon(type3IconImgs[1], 782, 634, 1));
  typeIcons[2].push(new Icon(type3IconImgs[2], 218, 582, 1));
  typeIcons[2].push(new Icon(type3IconImgs[3], 1459, 846, 1));
  typeIcons[2].push(new Icon(type3IconImgs[4], 535, 381, 1));
  typeIcons[2].push(new Icon(type3IconImgs[5], 1671, 624, 1));

  typeIcons[2].push(new Icon(type3IconFragImgs[0], 76, 711, 2));
  typeIcons[2].push(new Icon(type3IconFragImgs[1], 1185, 180, 2));
  typeIcons[2].push(new Icon(type3IconFragImgs[2], 637, 869, 2));
  typeIcons[2].push(new Icon(type3IconFragImgs[3], 1439, 339, 2));
  typeIcons[2].push(new Icon(type3IconFragImgs[4], 1458, 759, 2));
  typeIcons[2].push(new Icon(type3IconFragImgs[5], 1783, 754, 2));
}

function resizeImage() {
  coverImg.resize(width, height);
  for (let img of menuImgs) {
    img.resize(width - 128, 0);
  }
  for (let img of bgImgs) {
    img.resize(width, height);
  }
  for (let img of type1IconImgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
  for (let img of type1IconFragImgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
  for (let img of type2IconImgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
  for (let img of type2IconFragImgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
  for (let img of type3IconImgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
  for (let img of type3IconFragImgs) {
    img.resize(img.width / (8000 / 1920), 0);
  }
  camImg.resize(100, 0);
  mouseImg.resize(300, 0);
  for (let i = 0; i < 3; i++) {
    baseMapImgs[i][0].resize(width, height);
    baseMapImgs[i][1].resize(width, height);
  }
}

function draw() {
  background(152);

  mx = mouseX / scaleRatioW;
  my = mouseY / scaleRatioH;

  if (step == 1) {
    image(coverImg, 0, 0);
  } else if (step == 2) {
    let prevY = 64;
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        prevY += menuImgs[i - 1].height + 32;
      }
      image(menuImgs[i], 64, prevY);
    }
  } else if (step == 3) {
    if (takePhoto) {
      image(photoPG, 0, 0);

      if (mouseIsPressed) {
        clipPoints[actionCount] = clipPoints[actionCount] || []
        let bool = false;
        let keys = Object.keys(clipPoints);

        for (let p of keys) {
          for (let p2 of clipPoints[p]) {
            if (dist(p2.x, p2.y, mx, my) < 75 && p2.actionCount != actionCount) {
              bool = true;
              break;
            }
          }
          if (bool) {
            break;
          }
        }

        let index = bool ? 1 : 0;
        let miniPG = createGraphics(150, 150);
        miniPG.clear();
        for (let x = mx - 65; x < mx + 65; x++) {
          for (let y = my - 65; y < my + 65; y++) {
            if (dist(x, y, mx, my) < 65) {
              miniPG.set(x - mx + 75, y - my + 75, baseMapImgs[typeIndex][index].get(x, y));
            }
          }
        }
        miniPG.updatePixels();
        clipPoints[actionCount].push({ x: mx, y: my, index: index, actionCount: actionCount, pg: miniPG });
      }

      if (clipPoints[actionCount]) {
        for (let p2 of clipPoints[actionCount]) {
          drawingBoard.noStroke();
          for (let i = 150; i > 120; i--) {
            let t = map(i, 120, 150, 1, 0.6);
            let c = lerpColor(
              color(85, 167, 255),
              color(255, 255, 255),
              t
            );
            c.setAlpha(2);
            drawingBoard.fill(c);
            drawingBoard.ellipse(p2.x, p2.y, i, i);
          }
        }
        for (let p2 of clipPoints[actionCount]) {
          drawingBoard.imageMode(CENTER);
          drawingBoard.image(p2.pg, p2.x, p2.y);
        }
      }

      image(drawingBoard, 0, 0);

      image(mouseImg, mx - mouseImg.width / 2, my - mouseImg.height / 2);
    } else {
      image(bgImgs[typeIndex], 0, 0);
      for (let icon of typeIcons[typeIndex]) {
        icon.display();
        icon.update();
      }
      for (let icon of typeIcons[typeIndex]) {
        if (icon.drag) {
          icon.display();
        }
      }
      image(camImg, 60, 280);
    }
  }
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    window.location.reload();
  }
}

function toType(index) {
  typeIndex = index;
  step = 3;
  document.querySelector(".container").style.display = "none";
}

function mousePressed() {
  if (step == 1) {
    step = 2;
  } else if (step == 2) {
    let prevY = 64;
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        prevY += menuImgs[i - 1].height + 32;
      }
      if (mx >= 64 && mx <= 64 + menuImgs[i].width && my >= prevY && my <= prevY + menuImgs[i].height) {
        toType(i);
        break;
      }
    }
  } else if (step == 3) {
    for (let i = typeIcons[typeIndex].length - 1; i >= 0; i--) {
      let icon = typeIcons[typeIndex][i];
      let bool = icon.mousePressed();
      if (bool) {
        break;
      }
    }
    if (!takePhoto) {
      if (mx > 60 && mx < 60 + camImg.width && my > 280 && my < 280 + camImg.height) {
        takePhoto = true;
        photoPG = get();
      }
    }
  }
}

function mouseReleased() {
  if (typeIndex > -1) {
    let index = -1;
    for (let i = 0; i < typeIcons[typeIndex].length; i++) {
      if (typeIcons[typeIndex][i].drag) {
        index = i;
      }
      typeIcons[typeIndex][i].mouseReleased();
    }
    if (index > -1) {
      let t = typeIcons[typeIndex][index];
      typeIcons[typeIndex][index] = typeIcons[typeIndex][typeIcons[typeIndex].length - 1];
      typeIcons[typeIndex][typeIcons[typeIndex].length - 1] = t;
    }
  }

  if (clipPoints[actionCount]) {
    for (let p2 of clipPoints[actionCount]) {
      p2.pg = undefined
    }
  }

  actionCount++;
}

function scaleMain() {
  if (canvasDOM) {
    scaleRatioH = window.innerHeight / canvasDOM.offsetHeight;
    scaleRatioW = window.innerWidth / canvasDOM.offsetWidth;
    canvasDOM.style.transform = `scale(${scaleRatioW}, ${scaleRatioH})`;
  }
}
window.addEventListener('resize', scaleMain);

function myLoadImage(url) {
  // url = url.replace("images/", "");
  // return loadImage("https://assets.fashengwang.com/website/phoneEAtsFirst/" + url)
  return loadImage(url)
}