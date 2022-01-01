p5.disableFriendlyErrors = true;

let e = new p5.Ease();
let x1 = 0;
let x2 = 0;
let pg, pg2, pg3;
let alpha = 0;
let eX1 = 0;
let eX2 = 0;
let eAlpha = 0;
let accr = 0;
let eAccr = 0;
let img 
let particleLoc = [];
let particleAccer = [];
const particleNum = 50;

function preload() {
    img = loadImage("./res/plum.svg");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("P5Canvas");
    pg = createGraphics(200 , 200);
    pg.smooth()
    pg2 = createGraphics(1600,500);
    pg3 = createGraphics(width, height+800);
    c1 = color(250);
    c2 = color(30, 30, 150);
    c3 = color(255, 230, 210);
    c4 = color(100, 100, 120);
    setSunGradient(c3, c4);
    for (let i = 0; i < particleNum; i++) {
        particleLoc.push(createVector(0 ,0 ,random(0.05, 0.8) ))
        particleAccer.push(createVector(random(-7, 7), random(-5, 5)))
    }

    pg2.noFill();
    for (var y = 0; y < height; y++) {
      var inter = map(y, 0, height, 0, 1);
      var c = lerpColor(c1, c2, inter);
      pg2.stroke(c);
      pg2.line(0, y, width, y);
    }
    pg2.fill(0);
    pg2.erase();
    pg2.ellipse(-250, -100 , 1250, 1100);
    pg2.ellipse(1250, -100 , 1250, 1100);
    pg2.noErase();
    
}

function draw() {
    clear()
    tint(255, alpha)
    image(pg3, 0, -800 + accr*200);
    image(pg2, width-800, height-400);
    noTint()
    x1 = e.exponentialOut(eX1) * PI/2;
    x2 = e.exponentialOut(eX2) * PI/2;
    alpha = e.sineOut(eAlpha) * 254
    accr = e.exponentialIn((1-eAccr))
    pg.clear()
    pg.noFill();
    pg.strokeWeight(10);
    pg.stroke(255, 50, 50);
    pg.arc(50, 50, 90, 90, -PI/4*3, -PI/4*3 + x1);
    pg.erase();
    pg.strokeWeight(11);
    pg.arc(50, 50, 90, 90, -PI/4*3 , -PI/4*3 + x2);
    pg.noErase();
    if (eX1 < 1) {
        eX1 += 1 / 100.0;
    }
    if ( eX1 >= 1){
        eX2 += 1 / 100.0;
    }
    for (let i = 0; i < 35 ;i++) {
        for (let j = 0; j < 25; j++) {
            image(pg, i*65 -200, j*45 -200);
        }
    }
    for (let i = 0; i < 35 ;i++) {
        for (let j = 0; j < 25; j++) {
            image(pg, i*65-38, j*45+3);
        }
    }

    if (eX1 >= 1 && eX2 >= 1 ) {
        if ( eAlpha < 1) {
            eAlpha += 1 / 200.0
        }
        eAccr += 1 / 500.00
        for(let i = 0; i < particleNum; i++) {
            particleLoc[i].x += accr*particleAccer[i].x*1.5;
            particleLoc[i].y += accr*particleAccer[i].y*1.5;
        }
    }

    for (let i = 0; i < particleNum; i++) {

        push();2
        translate(width/2.0 + particleLoc[i].x, height/2.0 + particleLoc[i].y);
        scale(particleLoc[i].z);
        rotate(frameCount/20.0);
        tint(255, map(alpha, 0, 100, 0, 90))
        image(img, -74,-76);
        pop();
    }

    textAlign(CENTER, CENTER);
    fill(0, alpha)
    textSize(64);
    textStyle(BOLD)
    text("Happy New Year\n2022\n今年もよろしくお願いします", width/2, height/2);

}

function setSunGradient(c1, c2) {
    pg3.background(100, 100, 120);
    // noprotect
    pg3.noFill();
    for (var y = 0; y < 100; y++) {
      var inter = map(y, 0, 80, 0, 1);
      var c = lerpColor(c1, c2, inter);
      pg3.strokeWeight(15)
      pg3.stroke(c);
      pg3.ellipse(width/2-250, height/2+800, y*15)
    }
    pg3.noStroke()
    pg3.fill(255, 240, 230);
    pg3.ellipse(width/2-250, height/2+800, 150)
  }