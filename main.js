const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bird = new Image();
const background = new Image();
const footer = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
let startButton;


bird.src = "img/bird.png";
background.src = "img/background.png";
footer.src = "img/footer.png";
pipeUp.src = "img/pipeUp.png";
pipeDown.src = "img/pipeDown.png";


document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 30;
}

let pipe = [];
pipe[0] = {
    x : canvas.width,
    y : 0
}

let xPos = 10;
let yPos = 150;
let grav = 1;
let score = 0;
let bestScore = 0;

function startGame(){
    startButton.classList.remove("active");
    location.reload();
    if (score > localStorage.getItem("Score")){
        bestScore = localStorage.setItem("Score", score);
    }  
}



function draw(){
    ctx.drawImage(background, 0, 0);

    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + 90)

    pipe[i].x--;

    if(pipe[i].x == 50){
        pipe.push({
            x : canvas.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
    }
    if(pipe[i].x == 5){
        score++;
    }

    if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || 
        yPos + bird.height >= pipe[i].y + pipeUp.height + 90 || yPos + bird.height >= canvas.height - footer.height)){
            startButton = document.getElementById("start");
            startButton.classList.add("active");
            document.head.innerHTML += `
    <style>
        h1 {
        display: block; 
        }
        `
               window.cancelAnimationFrame(reqAnim);
        } 
      
    
}




    ctx.drawImage(footer, 0, canvas.height - footer.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20)

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Best score: " + localStorage.getItem("Score"), 125, canvas.height - 20)

   const reqAnim = requestAnimationFrame(draw);



}





pipeDown.onload = draw();

  
