const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const canvasWidth = 1024;
const canvasHeight = 576;
let result;
const player1IdleFrames = [
  "girlKnightSprite/Idle (1).png",
  "girlKnightSprite/Idle (2).png",
  "girlKnightSprite/Idle (3).png",
  "girlKnightSprite/Idle (4).png",
  "girlKnightSprite/Idle (5).png",
  "girlKnightSprite/Idle (6).png",
  "girlKnightSprite/Idle (7).png",
  "girlKnightSprite/Idle (8).png",
  "girlKnightSprite/Idle (9).png",
  "girlKnightSprite/Idle (10).png",
  
];
const player2IdleFrames = [
  "redhatSprite/Idle (1).png",
  "redhatSprite/Idle (2).png",
  "redhatSprite/Idle (3).png",
  "redhatSprite/Idle (4).png",
  "redhatSprite/Idle (5).png",
  "redhatSprite/Idle (6).png",
  "redhatSprite/Idle (7).png",
  "redhatSprite/Idle (8).png",
  "redhatSprite/Idle (9).png",
  "redhatSprite/Idle (10).png",
  
];

const augments = [
  { name: "Augment 1", description: "Description 1" },
  { name: "Augment 2", description: "Description 2" },
  { name: "Augment 3", description: "Description 3" },
  { name: "Augment 1", description: "Description 1" },
  { name: "Augment 2", description: "Description 2" },
  { name: "Augment 3", description: "Description 3" },
  // Add more augments as needed
];

let player1IdleFrameIndex = 0;


let player1Choice = null;
let player2Choice = null;

let roundCount = 1;
let player1HP = 100;
let player2HP = 100;

let currentFrame = 0;
const frameCount = 15; 
const frameInterval = 100; 

const characterWidth = 100;
const characterHeight = 50;

const character1X = canvasWidth / 4 - characterWidth / 2;
const character1Y = canvasHeight - 4.5 * characterHeight;

const character2X = (3 * canvasWidth) / 4 - characterWidth / 2;
const character2Y = canvasHeight - 4.5 * characterHeight;

const buttonWidth = 40;
const buttonHeight = 25;
const buttonSpacing = 15; 

const customImage1 = new Image();
customImage1.src = "girlKnightSprite/profile-img.png"; // Replace with the actual path to your image

const customImage2 = new Image();
customImage2.src = "redhatSprite/profile-img-2.png";

const backgroundImage = new Image();
backgroundImage.src = "/ORS97Z0.jpg";

const character1Image = new Image();
character1Image.src = player1IdleFrames[0];

const character2Image = new Image();
character2Image.src = player2IdleFrames[0];

const groundLevel = canvasHeight - 100; 

const leafImage = new Image();
leafImage.src = "leaf-autumn-fall-svgrepo-com.svg"; 

const leaves = [];
let animationPaused = false;
let augmentShown = false; 


// Function to draw a square
function drawSquare(x, y, size, color) {
  c.fillStyle = color;
  c.fillRect(x, y, size, size);
}




for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    leaves.push({
      x: Math.random() * canvasWidth,
      y: 0, 
      speed: Math.random() * (4 - 1) + 2, 
      onGround: false, 
      opacity: 1.0, 
    });
  }, i * 500); // Adjust the delay (500 milliseconds in this example)
}

function drawContinueButton() {
  const buttonX = canvasWidth / 2 - 50;
  const buttonY = canvasHeight / 2.5;

  
  // Draw button background
  c.fillStyle = "black";
  c.fillRect(buttonX, buttonY, 100, 30);

  // Draw button text
  c.fillStyle = "white";
  c.font = "16px Arial";
  c.fillText("Continue", buttonX + 20, buttonY + 20);
}

let continueClicked = true;

// Event listener for "Continue" button click
canvas.addEventListener("click", function (e) {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  // Check if the click is within the "Continue" button area
  const buttonX = canvasWidth / 2 - 50;
  const buttonY = canvasHeight / 2.5;
  const buttonWidth = 100;
  const buttonHeight = 30;

  if (
    mouseX >= buttonX &&
    mouseX <= buttonX + buttonWidth &&
    mouseY >= buttonY &&
    mouseY <= buttonY + buttonHeight
  ) {
    continueClicked = true;
    animationPaused = false
    // Update round count when "Continue" is clicked
    roundCount++;

    // Reset choices for the next round
    player1Choice = null;
    player2Choice = null;

    // Draw the next round
    redrawCanvas();
  }
});

function drawLeaves() {
  // If animation is paused or augment is shown, don't proceed with leaf animation
  if (animationPaused || augmentShown || !continueClicked) {
    requestAnimationFrame(drawLeaves);
    return;
  }

  // Clear the entire canvas
  c.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the background and other elements
  setupGame();

  player1IdleFrameIndex = (currentFrame % (frameCount * player1IdleFrames.length)) / frameCount;
  character1Image.src = player1IdleFrames[Math.floor(player1IdleFrameIndex)];
  

  player2IdleFrameIndex = (currentFrame % (frameCount * player2IdleFrames.length)) / frameCount;
  character2Image.src = player2IdleFrames[Math.floor(player2IdleFrameIndex)];
  character2Image.onload = function () {
    // Draw player 2 sprite
    c.drawImage(character2Image, -character2X - characterWidth, character2Y, characterWidth, characterHeight);
  };


  for (const leaf of leaves) {
    // Move the leaf down
    leaf.y += leaf.speed;

    // Check if the leaf has reached the ground
    if (leaf.y + 20 >= groundLevel && !leaf.onGround) {
      leaf.y = groundLevel - 20; // Adjust the position to just above the ground level
      leaf.onGround = true;
    }

    c.save();
    c.translate(leaf.x + 10, leaf.y + 10); // Adjust the center point of rotation
    const rotationSpeed = 5; // Adjust the rotation speed as needed
    c.rotate(
      (Math.PI / 180) * (Math.random() * rotationSpeed - rotationSpeed / 2)
    ); // Random rotation angle within a smaller range
    c.drawImage(leafImage, -10, -10, 20, 20); // Adjust the size as needed
    c.restore();

    // If the leaf is on the ground, reset its position
    if (leaf.onGround) {
      leaf.y = 0;
      leaf.onGround = false;
      leaf.x = Math.random() * canvasWidth;
    }
  }
currentFrame ++;
  // Request the next animation frame
  requestAnimationFrame(drawLeaves);
}

preloadImages([customImage1,customImage2, ...player1IdleFrames, ...player2IdleFrames,backgroundImage, character1Image, character2Image], drawLeaves());
// Start the animation


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
function drawAugments() {
  const augmentWidth = 150;
  const augmentHeight = 200;
  const augmentSpacing = 20;

  const totalWidth = 3 * augmentWidth + 2 * augmentSpacing;
  const startX = canvasWidth / 2 - totalWidth / 2;
  const startY = canvasHeight / 2 - augmentHeight / 0.9;

  // Randomly shuffle the augments array
  const shuffledAugments = [...augments].sort(() => Math.random() - 0.5);

  // Select the first three augments
  const chosenAugments = shuffledAugments.slice(0, 3);

  // Draw each augment
  chosenAugments.forEach((augment, index) => {
    const augmentX = startX + index * (augmentWidth + augmentSpacing);
    const augmentY = startY;

    // Draw augment rectangle
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(augmentX, augmentY, augmentWidth, augmentHeight);

    // Draw augment name at the top
    c.fillStyle = "white";
    c.font = "16px Arial";
    c.fillText(augment.name, augmentX + augmentWidth / 2 - 40, augmentY + 20);

    // Draw augment description underneath
    c.fillStyle = "white";
    c.font = "12px Arial";
    c.fillText(augment.description, augmentX + 10, augmentY + 50);
  });
}

preloadImages([...player1IdleFrames, ...player2IdleFrames,backgroundImage, character1Image, character2Image], setupGame);

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
  const buttonY = character1Y - buttonHeight - 20;

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

function drawButton(x, y, width, height, text) {
  c.fillStyle = "black";
  c.fillRect(x, y, width, height);
  c.fillStyle = "white";
  c.font = "12px Arial";
  c.fillText(text, x + width / 2 - 5, y + height / 2 + 5);
}

function drawHPBar(player, hp, x, y, color) {
  const barWidth = 200;
  const barHeight = 15;
  const textPadding = 10; // Adjust this value for padding between text and bar
  const borderWidth = 3;

  // Draw player name above the HP bar
  c.fillStyle = "black";
  c.font = "12px Arial";
  c.fillText(
    player,
    x + barWidth / 2 - c.measureText(player).width / 2,
    y - textPadding
  );

  // Draw HP bar background
  c.fillStyle = "darkgrey";
  c.fillRect(x, y, barWidth, barHeight);

  c.fillStyle = color;
  const currentWidth = (hp / 100) * barWidth;
  c.fillRect(x, y, currentWidth, barHeight);

  // Draw HP value inline with the HP bar
  c.fillStyle = "black";
  if (color === "blue") {
    c.fillText("HP: " + hp, x + barWidth + textPadding, y + barHeight / 2 + 5);
  } else if (color === "green") {
    c.fillText(
      "HP: " + hp,
      x - c.measureText("HP: " + hp).width - textPadding,
      y + barHeight / 2 + 5
    );
  }
  // Draw HP bar border
  c.strokeStyle = "black"; // Set the border color
  c.lineWidth = borderWidth; // Set the border width
  c.strokeRect(x, y, barWidth, barHeight);
}

function clearCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function setupGame() {
  clearCanvas();

  c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Draw black trapezoid background for the round number
  const trapezoidHeight = 40;
  const trapezoidTopWidth = 200;
  const trapezoidBottomWidth = 400;
  const trapezoidX = canvasWidth / 2 - trapezoidTopWidth / 2;
  const trapezoidY = 0;

  c.fillStyle = "rgba(0, 0, 0, 0.5)";
  c.beginPath();
  c.moveTo(trapezoidX, trapezoidY + trapezoidHeight);
  c.lineTo(trapezoidX + trapezoidTopWidth, trapezoidY + trapezoidHeight);
  c.lineTo(
    trapezoidX +
      (trapezoidTopWidth - trapezoidBottomWidth) / 2 +
      trapezoidBottomWidth,
    trapezoidY
  );
  c.lineTo(
    trapezoidX + (trapezoidTopWidth - trapezoidBottomWidth) / 2,
    trapezoidY
  );
  c.closePath();
  c.fill();

  c.fillStyle = "white";
  c.font = "20px Arial";
  const roundCounterText = "Round " + roundCount;
  const roundCounterTextWidth = c.measureText(roundCounterText).width;
  c.fillText(roundCounterText, canvasWidth / 2 - roundCounterTextWidth / 2, 27);

  drawHPBar("Player 1", player1HP, 10, 30, "blue");
  drawHPBar("Player 2", player2HP, canvasWidth - 210, 30, "green");

  // Draw squares on the bottom left
for (let i = 0; i < 4; i++) {
  const squareX = i * 75 + 30; // Adjust the distance between squares
  const squareY = canvasHeight - 75; // Adjust the Y position
  const squareSize = 50; // Adjust the size of the square
  const squareColor = "red"; // Adjust the color of the square
  if (i === 0) {
    // Draw image instead of red square for the leftmost square
    const borderWidth = 3;
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(squareX, squareY, squareSize, squareSize);
    c.drawImage(customImage1, squareX, squareY, squareSize, squareSize);
    c.strokeStyle = "black";
      c.lineWidth = borderWidth;
      c.strokeRect(squareX, squareY, squareSize, squareSize);
  } else {
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(squareX, squareY, squareSize, squareSize);
  }
}

// Draw squares on the bottom right
for (let i = 0; i < 4; i++) {
  const squareX = canvasWidth - 50 - i * 75 - 30 ; // Adjust the distance between squares
  const squareY = canvasHeight - 75; // Adjust the Y position
  const squareSize = 50; // Adjust the size of the square

  if (i === 0) {
    // Draw black border around the horizontally flipped image for Player 2
    const borderWidth = 3;
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(squareX, squareY, squareSize, squareSize);
    c.save();
    // Flip horizontally by scaling the x-axis by -1
    c.scale(-1, 1);
  
    c.drawImage(customImage2, -squareX - squareSize, squareY, squareSize, squareSize);
    
    // Reset the transformation state
    c.restore();

    c.strokeStyle = "black";
    c.lineWidth = borderWidth;

    // Draw the border using the flipped coordinates
    c.strokeRect(squareX + 50 , squareY, -squareSize, squareSize);
  } else {
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(squareX, squareY, squareSize, squareSize);
  }
}
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
  c.drawImage(
    character2Image,
    -character2X - characterWidth,
    character2Y,
    characterWidth,
    characterHeight
  );

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
  c.fillStyle = "Black";
  c.font = "Bold 40px Arial";
  c.fillText(result, canvasWidth / 2 - 110, canvasHeight / 3);
}

function redrawCanvas() {
  clearCanvas();

  c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  // Draw black trapezoid background for the round number
  const trapezoidHeight = 40;
  const trapezoidTopWidth = 200;
  const trapezoidBottomWidth = 400;
  const trapezoidX = canvasWidth / 2 - trapezoidTopWidth / 2;
  const trapezoidY = 0;

  if (result) {
    drawResult(result);
  }
  

  c.fillStyle = "rgba(0, 0, 0, 0.5)";
  c.beginPath();
  c.moveTo(trapezoidX, trapezoidY + trapezoidHeight);
  c.lineTo(trapezoidX + trapezoidTopWidth, trapezoidY + trapezoidHeight);
  c.lineTo(
    trapezoidX +
      (trapezoidTopWidth - trapezoidBottomWidth) / 2 +
      trapezoidBottomWidth,
    trapezoidY
  );
  c.lineTo(
    trapezoidX + (trapezoidTopWidth - trapezoidBottomWidth) / 2,
    trapezoidY
  );
  c.closePath();
  c.fill();

  c.fillStyle = "white";
  c.font = "20px Arial";
  const roundCounterText = "Round " + roundCount;
  const roundCounterTextWidth = c.measureText(roundCounterText).width;
  c.fillText(roundCounterText, canvasWidth / 2 - roundCounterTextWidth / 2, 27);
  // Draw HP bars for each player
  // Draw characters
  const characterWidth = 100;
  const characterHeight = 100;
  drawHPBar("Player 1", player1HP, 10, 30, "blue");
  drawHPBar("Player 2", player2HP, canvasWidth - 210, 30, "green");

    // Draw squares on the bottom left
for (let i = 0; i < 4; i++) {
  const squareX = i * 75 + 30; // Adjust the distance between squares
  const squareY = canvasHeight - 75; // Adjust the Y position
  const squareSize = 50; // Adjust the size of the square
  const squareColor = "red"; // Adjust the color of the square
  if (i === 0) {
    // Draw image instead of red square for the leftmost square
    const borderWidth = 3;
    c.drawImage(customImage1, squareX, squareY, squareSize, squareSize);
    c.strokeStyle = "black";
      c.lineWidth = borderWidth;
      c.strokeRect(squareX, squareY, squareSize, squareSize);
  } else {
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(squareX, squareY, squareSize, squareSize);
  }
}

// Draw squares on the bottom right
for (let i = 0; i < 4; i++) {
  const squareX = canvasWidth - 50 - i * 75 - 30 ; // Adjust the distance between squares
  const squareY = canvasHeight - 75; // Adjust the Y position
  const squareSize = 50; // Adjust the size of the square

  if (i === 0) {
    // Draw black border around the horizontally flipped image for Player 2
    const borderWidth = 3;

    c.save();
    // Flip horizontally by scaling the x-axis by -1
    c.scale(-1, 1);
    
    c.drawImage(customImage2, -squareX - squareSize, squareY, squareSize, squareSize);
    
    // Reset the transformation state
    c.restore();

    c.strokeStyle = "black";
    c.lineWidth = borderWidth;

    // Draw the border using the flipped coordinates
    c.strokeRect(squareX + 50 , squareY, -squareSize, squareSize);
  } else {
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(squareX, squareY, squareSize, squareSize);
  }
}
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
  drawRPSButtons();
  drawContinueButton();
 
}

// Event listener for mouse clicks
canvas.addEventListener("click", function (e) {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  // Check if the click is within the button area
  if (
    mouseY >= buttonY - 20 &&
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


    if (player1Choice !== null && player2Choice !== null) {
      animationPaused = true;
      result = determineWinner();

      // Adjust HP based on the result
      if (result === "Player 1 wins!" && player2HP > 0) {
        player2HP -= 10; // Decrease HP for Player 2
      } else if (result === "Player 2 wins!" && player1HP > 0) {
        player1HP -= 10; // Decrease HP for Player 1
      }

      // Display the result on the canvas
      redrawCanvas();
      drawResult(result);
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
    mouseY >= buttonY - 20 &&
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
