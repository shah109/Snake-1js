const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid and snake settings
const gridSize = 20;
const tileSize = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = {
  x: Math.floor(Math.random() * gridSize),
  y: Math.floor(Math.random() * gridSize),
};
let score = 0;

// Draw the game objects
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Update the score
  document.getElementById("score").innerText = score;
}

// Move the snake
function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wrap around the boundaries
  head.x = (head.x + gridSize) % gridSize;
  head.y = (head.y + gridSize) % gridSize;

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    snake.push({});
    score++;
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } else {
    snake.pop();
  }

  // Move the snake head
  snake.unshift(head);

  // Check for self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      resetGame();
      break;
    }
  }
}

// Reset the game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

// Change direction based on user input
function changeDirection(event) {
  const keyMap = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };
  const newDirection = keyMap[event.key];
  if (
    newDirection &&
    (newDirection.x !== -direction.x || newDirection.y !== -direction.y)
  ) {
    direction = newDirection;
  }
}

// Game loop
function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

// Event listener for key presses
window.addEventListener("keydown", changeDirection);

// Start the game
resetGame();
gameLoop();
