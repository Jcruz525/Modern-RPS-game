const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const canvasWidth = 1024;
const canvasHeight = 576;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

canvas.style.display = 'flex';
canvas.style.alignContent = 'center';
canvas.style.margin = 'auto';
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

// Add characters at the bottom of the canvas
const characterWidth = 50;
const characterHeight = 20;

// First character
const character1X = canvasWidth / 4 - characterWidth / 2;
const character1Y = canvasHeight - 2 * characterHeight;
c.fillStyle = 'blue';
c.fillRect(character1X, character1Y, characterWidth, characterHeight);

// Second character
const character2X = (3 * canvasWidth) / 4 - characterWidth / 2;
const character2Y = canvasHeight - 2 * characterHeight;
c.fillStyle = 'red';
c.fillRect(character2X, character2Y, characterWidth, characterHeight);

// Add Rock, Paper, Scissors buttons above characters with space
const buttonWidth = 30;
const buttonHeight = 15;
const buttonSpacing = 10; // Adjust this value to add space between buttons

// Function to draw a button with text
function drawButton(x, y, width, height, text) {
    c.fillStyle = 'gray';
    c.fillRect(x, y, width, height);
    c.fillStyle = 'black';
    c.font = '12px Arial';
    c.fillText(text, x + width / 2 - 5, y + height / 2 + 5);
}

function clearCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Store player choices
let player1Choice = null;
let player2Choice = null;

// Determine the winner based on RPS rules
function determineWinner() {
    if (player1Choice === player2Choice) {
        return 'It\'s a tie!';
    } else if (
        (player1Choice === 'R' && player2Choice === 'S') ||
        (player1Choice === 'P' && player2Choice === 'R') ||
        (player1Choice === 'S' && player2Choice === 'P')
    ) {
        return 'Player 1 wins!';
    } else {
        return 'Player 2 wins!';
    }
}

function drawResult(result) {
    c.fillStyle = 'black';
    c.font = '20px Arial';
    c.fillText(result, canvasWidth / 2 - 50, canvasHeight / 2);
}

function redrawCanvas() {
    clearCanvas();

    // Redraw characters
    c.fillStyle = 'blue';
    c.fillRect(character1X, character1Y, characterWidth, characterHeight);
    c.fillStyle = 'red';
    c.fillRect(character2X, character2Y, characterWidth, characterHeight);

    // Redraw buttons
    drawButton(rock1X, buttonY, buttonWidth, buttonHeight, 'R');
    drawButton(paper1X, buttonY, buttonWidth, buttonHeight, 'P');
    drawButton(scissors1X, buttonY, buttonWidth, buttonHeight, 'S');
    drawButton(rock2X, buttonY, buttonWidth, buttonHeight, 'R');
    drawButton(paper2X, buttonY, buttonWidth, buttonHeight, 'P');
    drawButton(scissors2X, buttonY, buttonWidth, buttonHeight, 'S');
}

// Event listener for mouse clicks
canvas.addEventListener('click', function (e) {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Check if the click is within the button area
    if (
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight &&
        ((mouseX >= rock1X && mouseX <= rock1X + buttonWidth) ||
        (mouseX >= paper1X && mouseX <= paper1X + buttonWidth) ||
        (mouseX >= scissors1X && mouseX <= scissors1X + buttonWidth) ||
        (mouseX >= rock2X && mouseX <= rock2X + buttonWidth) ||
        (mouseX >= paper2X && mouseX <= paper2X + buttonWidth) ||
        (mouseX >= scissors2X && mouseX <= scissors2X + buttonWidth))
    ) {
        // Check which button was clicked and store the choice
        if (mouseX >= rock1X && mouseX <= rock1X + buttonWidth) {
            player1Choice = 'R';
        } else if (mouseX >= paper1X && mouseX <= paper1X + buttonWidth) {
            player1Choice = 'P';
        } else if (mouseX >= scissors1X && mouseX <= scissors1X + buttonWidth) {
            player1Choice = 'S';
        } else if (mouseX >= rock2X && mouseX <= rock2X + buttonWidth) {
            player2Choice = 'R';
        } else if (mouseX >= paper2X && mouseX <= paper2X + buttonWidth) {
            player2Choice = 'P';
        } else if (mouseX >= scissors2X && mouseX <= scissors2X + buttonWidth) {
            player2Choice = 'S';
        }

        // Display choices and determine the winner
        console.log('Player 1 choice:', player1Choice);
        console.log('Player 2 choice:', player2Choice);

        if (player1Choice !== null && player2Choice !== null) {
            const result = determineWinner();

            // Display the result on the canvas
            redrawCanvas();
            drawResult(result);

            // Reset choices for the next round
            player1Choice = null;
            player2Choice = null;
        }
    }
});

// Mouseover event to change cursor to pointer
canvas.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    // Check if the mouse is over any of the buttons
    if (
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight &&
        ((mouseX >= rock1X && mouseX <= rock1X + buttonWidth) ||
        (mouseX >= paper1X && mouseX <= paper1X + buttonWidth) ||
        (mouseX >= scissors1X && mouseX <= scissors1X + buttonWidth) ||
        (mouseX >= rock2X && mouseX <= rock2X + buttonWidth) ||
        (mouseX >= paper2X && mouseX <= paper2X + buttonWidth) ||
        (mouseX >= scissors2X && mouseX <= scissors2X + buttonWidth))
    ) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
});

// First character buttons
const rock1X = character1X + (characterWidth - buttonWidth) / 2;
const paper1X = character1X + characterWidth / 4 - buttonWidth / 2 - buttonSpacing - buttonWidth;
const scissors1X = character1X + (3 * characterWidth) / 4 - buttonWidth / 2 + buttonSpacing + buttonWidth;
const buttonY = character1Y - buttonHeight - 5;

drawButton(rock1X, buttonY, buttonWidth, buttonHeight, 'R');
drawButton(paper1X, buttonY, buttonWidth, buttonHeight, 'P');
drawButton(scissors1X, buttonY, buttonWidth, buttonHeight, 'S');

// Second character buttons
const rock2X = character2X + (characterWidth - buttonWidth) / 2;
const paper2X = character2X + characterWidth / 4 - buttonWidth / 2 - buttonSpacing - buttonWidth;
const scissors2X = character2X + (3 * characterWidth) / 4 - buttonWidth / 2 + buttonSpacing + buttonWidth;

drawButton(rock2X, buttonY, buttonWidth, buttonHeight, 'R');
drawButton(paper2X, buttonY, buttonWidth, buttonHeight, 'P');
drawButton(scissors2X, buttonY, buttonWidth, buttonHeight, 'S');
