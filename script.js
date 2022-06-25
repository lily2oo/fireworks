var num = 20;
var balls = [];
let os;

window.addEventListener("DOMContentLoaded", init);
os = detectOSSimply();

function init() {
  if (os == "iphone") {
    document.querySelector("#permit").addEventListener("click", permitDeviceOrientationForSafari)
  } else {
    console.log("未対応");
  }
}

function detectOSSimply() {
  let ret;
  if (
    navigator.userAgent.indexOf("iPhone") > 0 ||
    navigator.userAgent.indexOf("iPad") > 0 ||
    navigator.userAgent.indexOf("iPod") > 0
  ) {
    ret = "iphone";
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
    if (os == "iphone") {
      balls[i].cR = rotationX;
      balls[i].speed = rotationZ / 36000;
      if (balls[i].size < 30) {
        balls[i].size += accelerationX;
        if(balls[i].size >= 30){
          balls[i].size -= accelerationX;
          if(balls[i].size < 5){
            balls[i].size += accelerationX;
          }
        }
      }
      else{
        balls[i].size -= accelerationX;
      }
    }
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

  update() {
    this.angle += random(0.015);
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
}