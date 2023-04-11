const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const left = document.querySelector("#left")
const right = document.querySelector("#right")
const down = document.querySelector("#down")
const up = document.querySelector("#up")

up.addEventListener("click", () => {
      if (velocityX != 1)     {
  
      velocityX = -1;
     velocityY = 0 
   }  
} )
down.addEventListener("click", () => {
      if (velocityX != -1)     {
  
      velocityX = 1;
     velocityY = 0 
   }  
} )
left.addEventListener("click", () => {
      if (velocityY != 1)     {
  
      velocityX = 0;
     velocityY = -1; 
   }  
} )
right.addEventListener("click", () => {
      if (velocityY != -1)     {
  
      velocityX = 0;
     velocityY = 1; 
   }  
} )
 
let foodX, foodY;
let snakeX = 10, snakeY = 7;
 let velocityX = 0, velocityY = 0;
  let snakeBody = [];
  let gameover = false;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

let gameoverhandler = () => {
alert("Game Over, press Ok to replay");
clearInterval(setIntervalId);
location.reload();
}
    
//for changing food position after snake eats it
const changeFoodPosition = () => {
    foodX =Math.floor(Math.random() * 30) + 1;
    foodY =Math.floor(Math.random() * 30) + 1;
}

//for changing snake's direction
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityX != 1)     {
  
      velocityX = -1;
     velocityY = 0 
   }  
      else if(e.key === "ArrowDown" && velocityX != -1 ) {
           velocityX = 1;
     velocityY = 0 
      }
      else if(e.key === "ArrowRight" && velocityY != -1 ) {
           velocityX = 0;
     velocityY = 1; 
      }
      else if(e.key === "ArrowLeft" && velocityY != 1 ) {
           velocityX = 0;
     velocityY = -1; 
      }


     
}



    

const initGame = () => {


//on gameover
  if(gameover) return gameoverhandler()

  //food-div
    let htmlMarkup = `<div class="food" style="grid-area: ${foodX}/ ${foodY} ;"></div>`

//When snake eats food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();

         snakeBody.push([foodX, foodY]);
         score++;
         highScore = score >= highScore ? score : highScore;
         
         localStorage.setItem("high-score", highScore)
         scoreElement.innerText = `Score: ${score}`;
         
         highScoreElement.innerText = `high-Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1 ; i > 0; i--) {
                    snakeBody[i] = snakeBody[i - 1]
    }
 snakeBody[0] = [snakeX, snakeY];
      snakeX += velocityX;
     snakeY += velocityY;


     for (let i = 0; i < snakeBody.length; i++) {
           
     htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][0]}/ ${snakeBody[i][1]} ;"></div>`

        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
          gameover = true;

      }
    if(snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30){
      gameover = true;
    }
    

    playBoard.innerHTML = htmlMarkup;
   
}
changeFoodPosition();

 document.addEventListener("keydown", changeDirection ) 
  setIntervalId = setInterval(initGame, 125);
           highScoreElement.innerText = `high-Score: ${highScore}`;


  