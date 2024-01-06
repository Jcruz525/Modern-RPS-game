const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const canvasWidth = 1024;
const canvasHeight = 576;

const character1Image = new Image();
character1Image.src = "girlKnightSprite/Idle (1).png";

const character2Image = new Image();
character2Image.src = "redhatSprite/Idle (1).png";


function preloadImages(images, callback) {
  let loadedImages = 0;
  images.forEach((image) => {
    image.onload = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        callback();
      }
    };
  });
}


preloadImages([character1Image, character2Image], setupGame);

function drawRPSButtons() {
  const rock1X = character1X + (characterWidth - buttonWidth) / 2;
  const paper1X =
    character1X +
    characterWidth / 4 -
    buttonWidth / 2 -
    buttonSpacing -
    buttonWidth;
  const scissors1X =
    character1X +
    (3 * characterWidth) / 4 -
    buttonWidth / 2 +
    buttonSpacing +
    buttonWidth;
  const buttonY = character1Y - buttonHeight - 5;

  drawButton(rock1X, buttonY, buttonWidth, buttonHeight, "R");
  drawButton(paper1X, buttonY, buttonWidth, buttonHeight, "P");
  drawButton(scissors1X, buttonY, buttonWidth, buttonHeight, "S");

 
  const rock2X = character2X + (characterWidth - buttonWidth) / 2;
  const paper2X =
    character2X +
    characterWidth / 4 -
    buttonWidth / 2 -
    buttonSpacing -
    buttonWidth;
  const scissors2X =
    character2X +
    (3 * characterWidth) / 4 -
    buttonWidth / 2 +
    buttonSpacing +
    buttonWidth;

  drawButton(rock2X, buttonY, buttonWidth, buttonHeight, "R");
  drawButton(paper2X, buttonY, buttonWidth, buttonHeight, "P");
  drawButton(scissors2X, buttonY, buttonWidth, buttonHeight, "S");
}
canvas.width = canvasWidth;
canvas.height = canvasHeight;

canvas.style.display = "flex";
canvas.style.alignContent = "center";
canvas.style.margin = "auto";
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);


const characterWidth = 100;
const characterHeight = 50;


const character1X = canvasWidth / 4 - characterWidth / 2;
const character1Y = canvasHeight - 2 * characterHeight;

let currentFrame = 0;
const frameCount = 6; // Number of frames in the animation
const frameInterval = 100; // Interval between frames in milliseconds


const character2X = (3 * canvasWidth) / 4 - characterWidth / 2;
const character2Y = canvasHeight - 2 * characterHeight;

const buttonWidth = 30;
const buttonHeight = 15;
const buttonSpacing = 10; // Adjust this value to add space between buttons


function drawButton(x, y, width, height, text) {
  c.fillStyle = 'black';
  c.fillRect(x, y, width, height);
  c.fillStyle = "white";
  c.font = "12px Arial";
  c.fillText(text, x + width / 2 - 5, y + height / 2 + 5);
}

function drawHPBar(player, hp, x, y, color) {
  const barWidth = 100;
  const barHeight = 10;
  const textPadding = 10; // Adjust this value for padding between text and bar

  // Draw player name above the HP bar
  c.fillStyle = 'black';
  c.font = '12px Arial';
  c.fillText(player, x + barWidth / 2 - c.measureText(player).width / 2, y - textPadding);

  // Draw HP bar background
  c.fillStyle ='darkgrey';
  c.fillRect(x, y, barWidth, barHeight);

  
  c.fillStyle = color;
  const currentWidth = (hp / 100) * barWidth;
  c.fillRect(x, y, currentWidth, barHeight);

  // Draw HP value inline with the HP bar
  c.fillStyle = "black";
  if (color === "blue") {
    c.fillText("HP: " + hp, x + barWidth + textPadding, y + barHeight / 2 + 5);
  } else if (color === "red") {
    c.fillText(
      "HP: " + hp,
      x - c.measureText("HP: " + hp).width - textPadding,
      y + barHeight / 2 + 5
    );
  }
}

function clearCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
}


let player1Choice = null;
let player2Choice = null;

let roundCount = 1;
let player1HP = 100;
let player2HP = 100;


function setupGame() {
  clearCanvas();

  
  c.fillStyle = "black";
  c.font = "16px Arial";
  const roundCounterText = "Round: " + roundCount;
  const roundCounterTextWidth = c.measureText(roundCounterText).width;
  c.fillText(roundCounterText, canvasWidth / 2 - roundCounterTextWidth / 2, 20);

 
  drawHPBar("Player 1", player1HP, 10, 30, "blue");
  drawHPBar("Player 2", player2HP, canvasWidth - 110, 30, "red");
 
  const characterWidth = 100;
  const characterHeight = 100;

 
  c.drawImage(
    character1Image,
    character1X,
    character1Y,
    characterWidth,
    characterHeight
  );
 
  c.save();

// Flip horizontally by scaling the x-axis by -1
c.scale(-1, 1);

// Draw player 2 with flipped coordinates
c.drawImage(character2Image, -character2X - characterWidth, character2Y, characterWidth, characterHeight);

  // Restore the transformation state
  c.restore();
  drawRPSButtons();
}

// Call the setup function to initialize the game state
setupGame();

// Determine the winner based on RPS rules
function determineWinner() {
  if (player1Choice === player2Choice) {
    return "It's a tie!";
  } else if (
    (player1Choice === "R" && player2Choice === "S") ||
    (player1Choice === "P" && player2Choice === "R") ||
    (player1Choice === "S" && player2Choice === "P")
  ) {
    return "Player 1 wins!";
  } else {
    return "Player 2 wins!";
  }
}

function drawResult(result) {
  c.fillStyle = "black";
  c.font = "20px Arial";
  c.fillText(result, canvasWidth / 2 - 50, canvasHeight / 2);
}

function redrawCanvas() {
  clearCanvas();

  // Draw round counter at the top and center of the canvas
  c.fillStyle = "black";
  c.font = "16px Arial";
  const roundCounterText = "Round: " + roundCount;
  const roundCounterTextWidth = c.measureText(roundCounterText).width;
  c.fillText(roundCounterText, canvasWidth / 2 - roundCounterTextWidth / 2, 20);

  // Draw HP bars for each player
  // Draw characters
  const characterWidth = 100;
  const characterHeight = 100;
  drawHPBar("Player 1", player1HP, 10, 30, "blue");
  drawHPBar("Player 2", player2HP, canvasWidth - 110, 30, "red");

  c.drawImage(
    character1Image,
    character1X,
    character1Y,
    characterWidth,
    characterHeight
  );
  c.save();

  // Flip horizontally by scaling the x-axis by -1
  c.scale(-1, 1);

  // Draw player 2 with flipped coordinates
  c.drawImage(
    character2Image,
    -character2X - characterWidth,
    character2Y,
    characterWidth,
    characterHeight
  );

  // Restore the transformation state
  c.restore();

  // Redraw buttons
  drawButton(rock1X, buttonY, buttonWidth, buttonHeight, "R");
  drawButton(paper1X, buttonY, buttonWidth, buttonHeight, "P");
  drawButton(scissors1X, buttonY, buttonWidth, buttonHeight, "S");
  drawButton(rock2X, buttonY, buttonWidth, buttonHeight, "R");
  drawButton(paper2X, buttonY, buttonWidth, buttonHeight, "P");
  drawButton(scissors2X, buttonY, buttonWidth, buttonHeight, "S");
}

// Event listener for mouse clicks
canvas.addEventListener("click", function (e) {
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
      player1Choice = "R";
    } else if (mouseX >= paper1X && mouseX <= paper1X + buttonWidth) {
      player1Choice = "P";
    } else if (mouseX >= scissors1X && mouseX <= scissors1X + buttonWidth) {
      player1Choice = "S";
    } else if (mouseX >= rock2X && mouseX <= rock2X + buttonWidth) {
      player2Choice = "R";
    } else if (mouseX >= paper2X && mouseX <= paper2X + buttonWidth) {
      player2Choice = "P";
    } else if (mouseX >= scissors2X && mouseX <= scissors2X + buttonWidth) {
      player2Choice = "S";
    }

    // Display choices and determine the winner
    console.log("Player 1 choice:", player1Choice);
    console.log("Player 2 choice:", player2Choice);

    if (player1Choice !== null && player2Choice !== null) {
      const result = determineWinner();

      // Update round count
      roundCount++;

      // Adjust HP based on the result
      if (result === "Player 1 wins!") {
        player2HP -= 10; // Decrease HP for Player 2
      } else if (result === "Player 2 wins!") {
        player1HP -= 10; // Decrease HP for Player 1
      }

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
canvas.addEventListener("mousemove", function (e) {
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
    canvas.style.cursor = "pointer";
  } else {
    canvas.style.cursor = "default";
  }
});

// First character buttons
const rock1X = character1X + (characterWidth - buttonWidth) / 2;
const paper1X =
  character1X +
  characterWidth / 4 -
  buttonWidth / 2 -
  buttonSpacing -
  buttonWidth;
const scissors1X =
  character1X +
  (3 * characterWidth) / 4 -
  buttonWidth / 2 +
  buttonSpacing +
  buttonWidth;
const buttonY = character1Y - buttonHeight - 5;

drawButton(rock1X, buttonY, buttonWidth, buttonHeight, "R");
drawButton(paper1X, buttonY, buttonWidth, buttonHeight, "P");
drawButton(scissors1X, buttonY, buttonWidth, buttonHeight, "S");

// Second character buttons
const rock2X = character2X + (characterWidth - buttonWidth) / 2;
const paper2X =
  character2X +
  characterWidth / 4 -
  buttonWidth / 2 -
  buttonSpacing -
  buttonWidth;
const scissors2X =
  character2X +
  (3 * characterWidth) / 4 -
  buttonWidth / 2 +
  buttonSpacing +
  buttonWidth;

drawButton(rock2X, buttonY, buttonWidth, buttonHeight, "R");
drawButton(paper2X, buttonY, buttonWidth, buttonHeight, "P");
drawButton(scissors2X, buttonY, buttonWidth, buttonHeight, "S");
