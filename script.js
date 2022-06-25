var num = 20;
var balls = [];
let os;

window.addEventListener("DOMContentLoaded", init);
os = detectOSSimply();

function init() {
  os = detectOSSimply();
  if (os == "iphone") {
    document.querySelector("#permit").addEventListener("click", permitDeviceOrientationForSafari);
    window.addEventListener("deviceorientation", getOrientation(), true);
  } else if (os == "android") {
    window.addEventListener("deviceorientationabsolute", getOrientation(), true);
  } else {
    window.alert("PC未対応サンプル");
  }
}

function getOrientation(event) {}

function detectOSSimply() {
  let ret;
  if (
    navigator.userAgent.indexOf("iPhone") > 0 ||
    navigator.userAgent.indexOf("iPad") > 0 ||
    navigator.userAgent.indexOf("iPod") > 0
  ) {
    // iPad OS13のsafariはデフォルト「Macintosh」なので別途要対応
    ret = "iphone";
  } else if (navigator.userAgent.indexOf("Android") > 0) {
    ret = "android";
  } else {
    ret = "pc";
  }

  return ret;
}

function permitDeviceOrientationForSafari() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response === "granted") {
        window.addEventListener(
          "deviceorientation",
          detectDirection
        );
      }
    })
    .catch(console.error);
}

function preload() {
  bg = loadImage('img/bg.jpg');
}

function setup() {
  blendMode(SCREEN);
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < num; i++) {
    balls[i] = new Ball();
  }
}

function draw() {
  translate(width / 2, height / 2);
  image(bg, 0, 0);
  for (var i = 0; i < num; i++) {
    balls[i].display();
    balls[i].update();
  }
}

function deviceMoved() {
  for (var i = 0; i < num; i++) {
    balls[i].size -= 3;
  }
}

function keyPressed() {
  for (var i = 0; i < num; i++) {
    if (keyCode === LEFT_ARROW) {
      balls[i].cR += 10;
    } else if (keyCode === UP_ARROW) {
      balls[i].cG += 10;
    } else if (keyCode === RIGHT_ARROW) {
      balls[i].cB += 10;
    } else if (keyCode === DOWN_ARROW) {
      balls[i].cR = random(155);
      balls[i].cG = random(40);
      balls[i].cB = random(100, 255);
    }
  }
}

class Ball {
  constructor() {
    this.cR = random(155);
    this.cG = random(40);
    this.cB = random(100, 255);
    this.angle = 0;
    this.theta = 0;
    this.r = 0;
    this.x = 0;
    this.y = 0;
    this.speed = 0.02;
    this.size = 18;
  }

  display() {
    this.theta += this.speed;
    this.r = 1 + cos(7 * this.theta / 8)
    this.x = this.r * sin(this.theta) * 80;
    this.y = this.r * cos(this.theta) * 80;
    fill(this.cR, this.cG, this.cB, 120);
    noStroke();
    ellipse(this.x, this.y, this.size);
    rotate(this.angle);
  }

  update() {
    this.angle += random(0.015);
    if (os == "iphone") {
      this.cR = Math.abs(rotationX) / 180 * 255;
      this.speed = rotationZ / 10000;
    }
    this.size = 18 -sin(this.theta * 2) * 8;
  }

}