const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ship = { x: 180, y: 450, width: 40, height: 20 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
  if (e.key === "ArrowLeft" && ship.x > 0) ship.x -= 20;
  if (e.key === "ArrowRight" && ship.x < canvas.width - ship.width) ship.x += 20;
  if (e.key === " " || e.key === "Spacebar") {
    bullets.push({ x: ship.x + 18, y: ship.y });
  }
}

function drawShip() {
  ctx.fillStyle = "lime";
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillRect(b.x, b.y, 4, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((e, i) => {
    e.y += 2;
    ctx.fillRect(e.x, e.y, e.width, e.height);

    // Verifica colisão com a nave
    if (
      e.y + e.height > ship.y &&
      e.x < ship.x + ship.width &&
      e.x + e.width > ship.x
    ) {
      gameOver = true;
    }

    // Verifica colisão com tiros
    bullets.forEach((b, j) => {
      if (
        b.y < e.y + e.height &&
        b.x > e.x &&
        b.x < e.x + e.width
      ) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score++;
      }
    });

    if (e.y > canvas.height) {
      enemies.splice(i, 1);
    }
  });
}

function drawScore() {
  ctx.fillStyle = "lime";
  ctx.font = "16px Courier New";
  ctx.fillText("Score: " + score, 10, 20);
}

function spawnEnemy() {
  const x = Math.floor(Math.random() * (canvas.width - 30));
  enemies.push({ x: x, y: 0, width: 30, height: 20 });
}

function draw() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "24px Courier New";
    ctx.fillText("GAME OVER", 120, 250);
    ctx.font = "16px Courier New";
    ctx.fillText("Recarregue para jogar novamente", 80, 280);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawBullets();
  drawEnemies();
  drawScore();
}

setInterval(draw, 30);
setInterval(spawnEnemy, 1000);
