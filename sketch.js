var img;
var fft;
var particles = [];
var bassAmp; // Variable to store bass amplitude
var zodiacSongs = {}; // Object to store songs for each zodiac sign
var currentSong; // To keep track of the currently playing song
var currentColor; // Variable to store the current color based on the zodiac sign

function preload() {
    img = loadImage('IMG_8562.jpg');
    
    // Preload songs for each zodiac sign
    zodiacSongs["Aries"] = loadSound('Tom & Jerry - Maximum Style (Lover To Lover).mp3');
    zodiacSongs["Taurus"] = loadSound('Erykah Badu - Didnt Cha Know.mp3');
    zodiacSongs["Gemini"] = loadSound('Bahamadia - Uknowhowwedu.mp3');
    zodiacSongs["Cancer"] = loadSound('02 - Cannock Chase.mp3');
    zodiacSongs["Leo"] = loadSound('08 - Millionaire.mp3');
    zodiacSongs["Virgo"] = loadSound('Devonte Hynes - Feelin Lovely.mp3');
    zodiacSongs["Libra"] = loadSound('Shygirl - Heaven (feat. Tinashe).mp3');
    zodiacSongs["Scorpio"] = loadSound('03 - Kicked Out by Seven.mp3');
    zodiacSongs["Sagittarius"] = loadSound('The Beginning of the End - Funky Nassau - , Part 1.mp3');
    zodiacSongs["Capricorn"] = loadSound('05 - Cloudbusting (2018 Remaster).mp3');
    zodiacSongs["Aquarius"] = loadSound('Ini Kamoze - Wings With Me-1.mp3');
    zodiacSongs["Pisces"] = loadSound('11 - On Formulation.mp3');
  
    
}

function setup() {
    createCanvas(1000, windowHeight);
    angleMode(DEGREES);
    imageMode(CENTER);
    fft = new p5.FFT();
    noLoop();

    const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius","Pisces"];
    zodiacSigns.forEach(sign => {
        let btn = createButton(sign);
        btn.mousePressed(() => playZodiacSong(sign));
        styleButton(btn);
    });
  
    img.filter(BLUR, 4);
     currentColor = color(255, 255, 255); // Default color
}

function styleButton(button) {
    let zodiacColor;
    switch (button.html()) {
        case "Aries":
            zodiacColor = "rgba(255, 0, 0, 0.7)"; // Muted Red
            break;
        case "Taurus":
            zodiacColor = "rgba(0, 128, 0, 0.7)"; // Muted Dark Green
            break;
        case "Gemini":
            zodiacColor = "rgba(255, 255, 0, 0.7)"; // Muted Yellow
            break;
        case "Cancer":
            zodiacColor = "rgba(255, 182, 203, 0.7)"; // Muted Light Pink
            break;
        case "Leo":
            zodiacColor = "rgba(255, 165, 0, 0.7)"; // Muted Orange
            break;
        case "Virgo":
            zodiacColor = "rgba(173, 216, 230, 0.7)"; // Muted Light Blue
            break;
        case "Libra":
            zodiacColor = "rgba(255, 105, 180, 0.7)"; // Muted Bright Pink
            break;
        case "Scorpio":
            zodiacColor = "rgba(105, 105, 105, 0.7)"; // Muted Dark Grey
            break;
        case "Sagittarius":
            zodiacColor = "rgba(128, 0, 128, 0.7)"; // Muted Purple
            break;
        case "Capricorn":
            zodiacColor = "rgba(139, 69, 19, 0.7)"; // Muted Brown
            break;
        case "Aquarius":
            zodiacColor = "rgba(64, 224, 208, 0.7)"; // Muted Turquoise
            break;
        case "Pisces":
            zodiacColor = "rgba(0, 0, 139, 0.7)"; // Muted Dark Blue
            break;
        default:
            zodiacColor = "rgba(255, 255, 255, 0.7)";
    }

    button.style('background-color', zodiacColor);
    button.style('color', 'rgba(255, 255, 255, 0.7)'); 
    button.style('padding', '10px 20px');
    button.style('border', 'none');
    button.style('border-radius', '15px');
    button.style('cursor', 'pointer');
    button.style('font-size', '16px');
    button.style('margin', '5px');
    button.style('text-transform', 'uppercase');
    button.style('font-weight', '300'); 
    button.style('font-family', 'Helvetica, sans-serif'); 
}

function playZodiacSong(zodiac) {
    if (currentSong && currentSong.isPlaying()) {
        currentSong.stop();
    }
    currentSong = zodiacSongs[zodiac];
    currentSong.play();
    loop();
  
  
    switch (zodiac) {
        case "Aries":
            currentColor = color(180, 0, 0,180); // Red
            break;
       
        case "Taurus":
            currentColor = color(0, 128, 0,190); // Dark Green
            break;
        case "Gemini":
            currentColor = color(255, 255, 0,170); // Yellow
            break;
        case "Cancer":
            currentColor = color(255, 182, 203,190); // Light Pink
            break;
        case "Leo":
            currentColor = color(255, 165, 0,190); // Orange
            break;
        case "Virgo":
            currentColor = color(173, 216, 230,190); // Light Blue
            break;
             case "Libra":
            currentColor = color(255, 105, 180,190); // Bright Pink
            break;
        case "Scorpio":
            currentColor = color(105, 105, 105,190); // Dark Grey
            break;
        case "Sagittarius":
            currentColor = color(128, 0, 128,190); // Purple
            break;
        case "Capricorn":
            currentColor = color(139, 69, 19,190); // Brown
            break;
        case "Aquarius":
            currentColor = color(64, 300, 208,190); // Turquoise
            break;
        case "Pisces":
            currentColor = color(0, 0, 139,180); // Dark Blue
            break;
        default:
            currentColor = color(255, 255, 255);
    }
 
}


function draw() {
    background(70, 8
, 90);
translate(width / 2, height / 2);
image(img, 0, 0, width, height);
  var wave = fft.waveform();
bassAmp = fft.getEnergy("bass");
  

fill(currentColor);
beginShape();
for (var i = 0; i <= 180; i++) {
    var index = floor(map(i, 0, width, 0, wave.length));
    var r = map(wave[index], -1, 1, 10, 200);
    var x = r * sin(i);
    var y = r * cos(i);
    vertex(x, y);
}
endShape();

beginShape();
for (var j = 0; j <= 180; j++) {
    var index2 = floor(map(j, 0, width, 0, wave.length));
    var w = map(wave[index2], -1, 1, 10, 200);
    var d = w * -sin(j);
    var g = w * cos(j);
    vertex(d, g);
}
endShape();

for (let particle of particles) {
    particle.update();
    particle.show();
}

if (frameCount % 5 == 0) {
    particles.push(new Particle());
}

particles = particles.filter(p => !p.edges());
}
class Particle {
    constructor() {
        this.pos = p5.Vector.random2D().mult(250);
        this.vel = createVector(0, 0);
        this.acc = this.pos.copy().normalize().mult(random(0.0001, 0.00001));
        this.w = random(3, 5);
    }
  
    update() {
        let bassForce = p5.Vector.random2D().mult(bassAmp / 50);
        this.acc.add(bassForce); // Increase the acceleration based on the bass amplitude
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(0.95); // Damping factor to eventually slow down the particle
    }

    edges() {
        return (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2);
    }

    show() {
        noStroke();
        fill(currentColor); // Use currentColor for the particles
        ellipse(this.pos.x, this.pos.y, this.w);
    }

  }

function mousePressed() {
if (currentSong && currentSong.isPlaying()) {
currentSong.pause();
noLoop();
} else {
if (currentSong) {
currentSong.play();
loop();
}
}
  
}