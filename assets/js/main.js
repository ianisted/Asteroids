var asteroids = [];
var ships = [];
var canvassize = [];
var bullets = [];
var points = 0;
canvassize.x = 500;
canvassize.y = 500;

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvassize.x;
        this.canvas.height = canvassize.y;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        for (var i = 0; i < 10; i++) {
            asteroids[i] = new Asteroid;
        }
        ships[0] = new Ship;
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    for (len = asteroids.length, i = (len - 1); i >= 0; i--) {
        asteroids[i].draw();
        for (len = bullets.length, j = (len - 1); j >= 0; j--) {
            if (cn_PnPoly(bullets[j].pos, asteroids[i].poly) == 1) {
                if (asteroids[i].r > 10) {
                    asteroids.push(new Asteroid(asteroids[i].r / 2, asteroids[i].pos))
                    asteroids.push(new Asteroid(asteroids[i].r / 2, asteroids[i].pos))
                }
                var snd1 = new Audio();
                var src1 = document.createElement("source");
                src1.type = "audio/mpeg";
                src1.src = "assets/SFX/RockHit.mp3";
                snd1.appendChild(src1);
                snd1.play();
                points = points + Math.round(1 / asteroids[i].r * 200);
                console.clear();
                console.log("Score: " + points);
                asteroids.splice(i, 1);
                bullets[j].age = 100;
            }
        }
    }
    for (var i = 0, len = ships.length; i < len; i++) {
        ships[i].draw();
        for (var k = 0; k < ships[i].poly.length; k++) {
            for (var lena = asteroids.length, j = (lena - 1); j >= 0; j--) {
                if (cn_PnPoly(ships[i].poly[k], asteroids[j].poly) == 1) {
                    console.clear();
                    console.log("Score: " + points);
                    console.log("You were hit by a massive space rock!");
                    clearInterval(myGameArea.interval);
                }
            }
        }
    }
    for (len = bullets.length, i = (len - 1); i >= 0; i--) {
        bullets[i].draw();
        if (bullets[i].age > 10) {
            bullets.splice(i, 1);
        }
    }
}