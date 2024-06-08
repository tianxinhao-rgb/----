const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2 * (Math.random() > 0.5 ? 1 : -1);
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let paddleSpeed = 4; // 默认球拍速度
let ballSpeed = 2;   // 默认球速度

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives = 3;
let paused = false;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
speedSlider.addEventListener('input', function () {
    paddleSpeed = this.value;
    speedValue.innerText = this.value;
});

const ballSpeedSlider = document.getElementById('ballSpeedSlider');
const ballSpeedValue = document.getElementById('ballSpeedValue');
ballSpeedSlider.addEventListener('input', function () {
    ballSpeed = this.value;
    ballSpeedValue.innerText = this.value;
    dx = ballSpeed * Math.sign(dx);
    dy = ballSpeed * Math.sign(dy);
});

const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
volumeSlider.addEventListener('input', function () {
    const volume = this.value;
    volumeValue.innerText = volume;
    breakSound.volume = volume;
    winSound.volume = volume;
    loseSound.volume = volume;
});

const breakSound = document.getElementById('breakSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Escape") {
        togglePause();
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function togglePause() {
    paused = !paused;
    document.getElementById('pauseOverlay').style.display = paused ? 'flex' : 'none';
}

function showSettings() {
    document.getElementById('pauseMenu').style.display = 'none';
    document.getElementById('settingsTab').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settingsTab').style.display = 'none';
    document.getElementById('pauseMenu').style.display = 'block';
}

function resumeGame() {
    togglePause();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    document.getElementById('score').innerText = "得分: " + score;
                    // 重新播放音效
                    breakSound.pause();
                    breakSound.currentTime = 0;
                    breakSound.play();
                    if (score === brickRowCount * brickColumnCount) {
                        winSound.play();
                        showWinOverlay();
                    }
                }
            }
        }
    }
}

function draw() {
    if (!paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        // 确保球尽可能上下运动
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx * 0.9;  // 减少水平速度
        }

        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - paddleHeight) {
                const collidePoint = x - (paddleX + paddleWidth / 2);
                const normalizedCollidePoint = collidePoint / (paddleWidth / 2);
                const maxBounceAngle = Math.PI / 3;
                const bounceAngle = normalizedCollidePoint * maxBounceAngle;

                dx = ballSpeed * Math.cos(bounceAngle);
                dy = -ballSpeed * Math.sin(bounceAngle);
                y = canvas.height - paddleHeight - ballRadius; // 确保球在球拍上方反弹
            } else if (y + dy > canvas.height - ballRadius) {
                lives--;
                document.getElementById('lives').innerText = "生命: " + lives;
                if (!lives) {
                    loseSound.play();
                    showGameOverOverlay();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
                    dy = -ballSpeed;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += parseInt(paddleSpeed);
        } else if (leftPressed && paddleX > 0) {
            paddleX -= parseInt(paddleSpeed);
        }

        x += dx;
        y += dy;
    }
    requestAnimationFrame(draw);
}

function showGameOverOverlay() {
    paused = true;
    document.getElementById('gameOverOverlay').style.display = 'flex';
}

function showWinOverlay() {
    paused = true;
    document.getElementById('winOverlay').style.display = 'flex';
}

draw();
