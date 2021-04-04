

const cvs = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); /** @type {CanvasRenderingContext2D} */

canvas.width = 600;
canvas.height = 400;

centerX = canvas.width /2;
centerY = canvas.height /2;
score = 0;
hit = 0;
start = true;
//overSpike = false;

const p_sprite = document.getElementById("p_sprite");

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

const player = {
    w: 100,
    h: 100,
    x: 20,
    y: 200,
    speed: 15,
    dy: 0,
    grav: .5,
    free: false
};

const floor = {
    x: 0,
    y: 290,
    w: cvs.width,
    h: cvs.height
};

const spike = {
    x: cvs.width,
    y: 230,
    w: 40,
    h: 100,
    dx: 4,
    tall: false,
    pair: false
};

var keys = ["Up", "ArrowUp", " ", "Down", "ArrowDown"];

function drawPlayer() {
    ctx.drawImage(p_sprite, player.x, player.y, player.w, player.h);
}

function collideDetect() {
    if (player.y + player.h >= floor.y) { // Checks if player is on ground & keeps them grounded
        player.free = false;
        player.y = floor.y - player.h
    }

    if (player.y + player.h < floor.y) { // Check if the player is in the air
        player.free = true;
    }

    if (player.x + (player.w/2) >= spike.x - spike.w && player.x + player.w/2 <= spike.x + spike.w) { // Check if the player is near a spike
        //overSpike = true;
        if (player.y + player.h >= Math.abs((5/4) * (spike.x - (player.x + (player.w/2)))) + spike.y ) { // Check if the player is touching the spike
            hit++;
        }
    } //else { overSpike = false }
}

function playerPosition() {
    player.y += player.dy;

    if (player.free) {
        player.dy += player.grav * 1.5 ; // Gravity & coefficient of 1.5
    }

    collideDetect();
}

function drawFloor() {
    ctx.beginPath();
    ctx.rect(floor.x, floor.y, floor.w, floor.h);
    ctx.fill();
}

function drawSpike() {
    if (!spike.pair && !spike.tall) {
        ctx.beginPath();
        ctx.moveTo(spike.x, spike.y);
        ctx.lineTo(spike.x + spike.w, spike.y + 100);
        ctx.lineTo(spike.x - spike.w, spike.y + 100);
        ctx.lineTo(spike.x, spike.y)
        ctx.fillStyle = "black";
        ctx.fill(); 
    }
}

function moveSpike() {
    spike.x -= spike.dx;

    if (spike.x + spike.w < 0) {
        spike.x = canvas.width + spike.w;
    }
}

function clear() { // Clear canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function playerStats() { // Text for score & Testing / Troubleshooting
    ctx.font = "15px Helvetica"
    //ctx.fillText("Player X: " + (player.x + (player.w/2)), (player.x + player.w/2), 20, 100);
    //ctx.fillText("Player Y: " + (player.y + player.h), 140, 20, 100);
    //ctx.fillText("Is Player Free: " + player.free, 260, 20, 140);
    ctx.fillText("Score: " + score, 480, 20, 100);
    //ctx.fillText("Hit: " + hit, 480, 60, 160);
    //ctx.fillText("Spike Math: " + (Math.abs((5/4) * (spike.x - (player.x + (player.w/2)))) + spike.y), 20, 20, 100);
    //ctx.fillText("Spike X2: " + (spike.x + (spike.w/2)), (spike.x - spike.w), 80, 100);
    //ctx.fillText("Spike X: " + (spike.x - spike.w), (spike.x + spike.w), 50, 100);
    //ctx.fillText("Difference", (spike.x - player.x), (Math.abs((5/4)*(spike.x - (player.x + player.w/2))) + spike.y), 100);
    //ctx.fillText("Over Spike: " + overSpike, (player.x + player.w/2), player.y, 120);
}

function update() {
    if (start) {

        if (hit >= 1) {start = false; }
        clear();
        drawPlayer();
        drawFloor();
        playerPosition();
        drawSpike();
        moveSpike();
        playerStats();
        score++;

        if (score % 100 == 0) { spike.dx += 1/10}
        requestAnimationFrame(update);
    } else {

        score = 0;
        player.dx = 0;
        spike.dx = 0;
        hit = 0;

        requestAnimationFrame(update);
    }
}

function jump() {
    if (!player.free) { // If the player is not in the air (grounded), they can jump
        player.dy = -player.speed;
    }
}

function fastFall() {
    if (player.free) { // If the player is in the air, they can fast fall
        player.ffall = true;
        player.dy += 20
    }
}

function keyDown(e) {
    switch (e.key) {
        case keys[0]: // Up Arrow
        case keys[1]:
        case keys[2]: // Space Bar
            jump();
            break;
        case keys[3]: // Down Arrow
        case keys[4]:
            fastFall();
            break;
    }

    if (!start) { // Restart game after a loss
        if (e.key == keys[2]) { 
            start = true;
            spike.x = cvs.width;
            player.y = 200; 
            spike.dx = 4;
        }
    }
}

function keyUp(e) {
    if (keys.includes(e.key) && player.free) { // Stop upward momentum if the player releases the jump button(s)
        player.dy += 5;
    }
}

update();
