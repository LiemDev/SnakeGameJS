// Definiere Canvas und Context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Definiere Größe des Rasters und Anfangsposition der Schlange
const gridSize = 20;
let snake = [
  { x: gridSize * 2, y: gridSize * 2 },
  { x: gridSize, y: gridSize * 2 },
];

// Definiere Anfangsrichtung
let direction = "right";

// Definiere Position des Essens
let food = { x: 0, y: 0 };

// Definiere Punktestand und Highscore
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Generiere zufällige Position für das Essen
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  // Wenn das Essen auf der Schlange generiert wird, generiere neues Essen
  snake.forEach((segment) => {
    if (segment.x === food.x && segment.y === food.y) {
      generateFood();
    }
  });
}

// Zeichne die Schlange
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Zeichne das Essen
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Bewege die Schlange
function moveSnake() {
  // Erstelle einen neuen Kopf basierend auf der aktuellen Richtung
  let newHead = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      newHead.y -= gridSize;
      break;
    case "down":
      newHead.y += gridSize;
      break;
    case "left":
      newHead.x -= gridSize;
      break;
    case "right":
      newHead.x += gridSize;
      break;
  }
  // Überprüfe, ob die Schlange mit einer Wand oder mit sich selbst kollidiert ist
  if (
    newHead.x < 0 ||
    newHead.x >= canvas.width ||
    newHead.y < 0 ||
    newHead.y >= canvas.height ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    // Spiel vorbei
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    alert(`Spiel vorbei!\nPunktestand: ${score}\nHighscore: ${highScore}`);
    // Spiel zurücksetzen
    score = 0;
    snake = [
      { x: gridSize * 2, y: gridSize * 2 },
      { x: gridSize, y: gridSize * 2 },
    ];
    direction = "right";
    generateFood();
  } else {
    // Füge neuen Kopf zur Schlange hinzu
    snake.unshift(newHead);
    // Wenn die Schlange das Essen gefressen hat, generiere neues Essen und erhöhe Punktestand
    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      generateFood();
    } else {
      // Entferne das Ende der Schlange, um
      snake.pop();
    }
    }
    }
    
    // Bewege die Schlange alle 100ms
    setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    }, 100);
    
    // Ändere die Richtung der Schlange basierend auf den Tastenanschlägen
    document.addEventListener("keydown", (event) => {
    switch (event.code) {
    case "KeyW":
    if (direction !== "down") {
    direction = "up";
    }
    break;
    case "KeyS":
    if (direction !== "up") {
    direction = "down";
    }
    break;
    case "KeyA":
    if (direction !== "right") {
    direction = "left";
    }
    break;
    case "KeyD":
    if (direction !== "left") {
    direction = "right";
    }
    break;
    }
    });
    function checkCollision() {
        // ...
        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || checkSnakeCollision()) {
          // Game over
          clearInterval(gameLoop);
          canvas.style.display = "none";
          gameOverScreen.style.display = "flex";
        }
      }
      
      const gameOverScreen = document.getElementById("gameover");
      const restartButton = document.getElementById("restart-btn");
      const quitButton = document.getElementById("quit-btn");
      
      restartButton.addEventListener("click", startGame);
      quitButton.addEventListener("click", () => {
        gameOverScreen.style.display = "none";
        document.body.style.backgroundColor = "white";
      });
      