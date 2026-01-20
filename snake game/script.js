const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // gets the canvas and context.//

let score = 0
let gsize = 20
// grid size for a tile.//


let snake = [
    {x: 160, y: 200},
    {x: 140, y: 200},
    {x: 120, y: 200},

]; // creates the initial snake position.//

let apple = {x: 200, y: 200}; 
// creates the initial apple position.//

let gameOver = false;

let dx = gsize;
let dy = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -gsize; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = gsize; }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -gsize; dy = 0; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = gsize; dy = 0; }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'w' && dy === 0) { dx = 0; dy = -gsize; }
    if (e.key === 's' && dy === 0) { dx = 0; dy = gsize; }
    if (e.key === 'a' && dx === 0) { dx = -gsize; dy = 0; }
    if (e.key === 'd' && dx === 0) { dx = gsize; dy = 0; }
})
// changes direction based on key presses.//
function main() {
    setTimeout(function onTick(){
        clearCanvas();
        drawApple();
        movesnake();
        drawsnake();
        main()
    }, 80)
}
// main game loop.//
function clearCanvas(){
    ctx.fillStyle ="#68b37a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawsnake() {
    ctx.fillStyle = "#073561";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gsize -2, gsize - 2);
    });
}
function drawApple() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(apple.x, apple.y, gsize - 2, gsize - 2);
}

function generateApple() {
    let validPosition = false;
    while (!validPosition) {
        apple.x = Math.floor(Math.random() * (canvas.width / gsize)) * gsize;
        apple.y = Math.floor(Math.random() * (canvas.height / gsize)) * gsize;
        
        
        validPosition = !snake.some(part => part.x === apple.x && part.y === apple.y);
    }
}
// creates an apple in a random area not where the snake is.//
function movesnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Check for collision with walls//
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
        alert("Game Over. Score: " + score);
        location.reload();
        return;
    }
    
    // Checks for collison with self//
    if (snake.some(part => part.x === head.x && part.y === head.y)) {
        gameOver = true;
        alert("Game Over. Score: " + score);
        location.reload();
        return;
    }
    
    snake.unshift(head);
    
    // Check if snake ate the apple//
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        document.getElementById("score").textContent = score;
        generateApple();
        
        // Check if snake covers entire screen//
        const totalGridSquares = (canvas.width / gsize) * (canvas.height / gsize);
        if (snake.length === totalGridSquares) {
            gameOver = true;
            alert("Victory. Score: " + score);
            location.reload();
            return;
        }
    } else {
        snake.pop();
    }
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!gameOver) {
        main();
    }
});