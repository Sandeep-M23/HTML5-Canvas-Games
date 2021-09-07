var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
var leftPaddle_upPressed=false;
var leftPaddle_downPressed=false;
var rightPaddle_upPressed=false;
var rightPaddle_downPressed=false;
var player1_score=0;
var player2_score=0;
// ball object
const ball = {
	x:250,
	y:250,
	radius:10,
	dx:5,
	dy:3
};

//left paddle object
const leftPaddle = {
	x:0,
	y:250,
	width:15,
	height:100,
	dx:0,
	dy:0,
	speed:5
};

//right paddle object
const rightPaddle = {
	x:585,
	y:250,
	width:15,
	height:100,
	dx:0,
	dy:0,
	speed:5
};

//  Add Events for left paddle
document.addEventListener("keydown",keyDown,false)
document.addEventListener("keyup",keyUp,false)

//  Add Events for right paddle
document.addEventListener("keydown",keyDownHandler,false)
document.addEventListener("keyup",keyUpHandler,false)

// functions for left Paddle
function keyUp(e){
	if(e.key=='w' || e.key=='keyW'){
		leftPaddle_upPressed = false;
	}else if(e.key=='s' || e.key=='keyS'){
		leftPaddle_downPressed = false;
	}
}
function keyDown(e){
	if(e.key=='w'|| e.key=='keyW'){
		leftPaddle_upPressed = true;
	}else if(e.key=='s' || e.key=='keyS'){
		leftPaddle_downPressed = true;
	}
}

// functions for right paddle
function keyUpHandler(e){
	if(e.key=='Up'|| e.key=='ArrowUp'){
		rightPaddle_upPressed = false;
	}else if(e.key=='Down' || e.key=='ArrowDown'){
		rightPaddle_downPressed = false;
	}
}
function keyDownHandler(e){
	if(e.key=='Up' || e.key=='ArrowUp'){
		rightPaddle_upPressed = true;
	}else if(e.key=='Down' || e.key=='ArrowDown'){
		rightPaddle_downPressed = true;
	}
}
//draw the line
function drawLine()
{
	ctx.beginPath();
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,500);
	ctx.strokeStyle='#034f84'
	ctx.stroke();
	ctx.closePath();
}
//draw the circle
function drawCircle(){
	ctx.beginPath();
	ctx.arc(300,250,40,0,Math.PI*2);
	ctx.strokeStyle='#034f84';
	ctx.stroke();
	ctx.closePath();
}
//draw a ball
function drawBall(){
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
	ctx.fillStyle='#034f84';
	ctx.fill();
	ctx.closePath();
}
//draw left paddle
function drawLeftPaddle(){
	ctx.beginPath();
	ctx.rect(leftPaddle.x,leftPaddle.y,leftPaddle.width,leftPaddle.height);
	ctx.fillStyle=' #d64161';
	ctx.fill();
	ctx.closePath();
}
// //draw right paddle
function drawRightPaddle(){
	ctx.beginPath();
	ctx.rect(rightPaddle.x,rightPaddle.y,rightPaddle.width,rightPaddle.height);
	ctx.fillStyle=' #d64161';
	ctx.fill();
	ctx.closePath();
}
// //paddle positions
function paddlePos(){
	//left paddle positions
	leftPaddle.x+=leftPaddle.dx;
	leftPaddle.y+=leftPaddle.dy;
	//right paddle positions
	rightPaddle.x+=rightPaddle.dx;
	rightPaddle.y+=rightPaddle.dy;
}
//score card
function drawScore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#034f84";
	ctx.fillText("Player1: "+player1_score,8,20);
	ctx.fillText("Player2: "+player2_score,500,20)
}
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawLine();
	drawCircle();
	drawBall();
	drawRightPaddle();
	drawLeftPaddle();
	paddlePos();
	drawScore();
    //left paddle controller position
    leftPaddle.dx=0;
    leftPaddle.dy=0;
    //right paddle controller position
    rightPaddle.dx=0;
    rightPaddle.dy=0;


    //create canvas boundaries
    if(ball.x+ball.radius>canvas.width)
    { 
    	//right paddle collision 
    	if(ball.x-ball.radius<rightPaddle.x+rightPaddle.width && ball.y-ball.radius < rightPaddle.y +rightPaddle.height && ball.x+ball.radius>rightPaddle.x && ball.y+ball.radius>rightPaddle.y)
    	{
    		ball.dx*=-1;
    	}else{
    		player1_score++;
    		if(player1_score==5)
    		{
    			alert("player 1 is the winner");
    			document.location.reload();
    		}
    		else
    		{
    			ball.x = Math.floor(Math.random()*canvas.width);
    			ball.y = Math.floor(Math.random()*canvas.height);
    			ball.dx = Math.floor(Math.random()*(5-8))+5;
    			ball.dy = Math.floor(Math.random()*(3-8))+3;
    			rightPaddle.y = 250;
    		}
    	}
    }
    else if(ball.x-ball.radius<0)
    {
    	//left paddle collision 
    	if(ball.x-ball.radius<leftPaddle.x+leftPaddle.width && ball.y-ball.radius < leftPaddle.y +leftPaddle.height && ball.x+ball.radius>leftPaddle.x && ball.y+ball.radius>leftPaddle.y)
    	{
    		ball.dx*=-1;
    	}else{
    		player2_score++;
    		if(player2_score==5)
    		{
    			alert("player 2 is the winner");
    			document.location.reload();
    		}
    		else
    		{
    			ball.x = Math.floor(Math.random()*canvas.width);
    			ball.y = Math.floor(Math.random()*canvas.height);
    			ball.dx = Math.floor(Math.random()*(5-8))+5;
    			ball.dy = Math.floor(Math.random()*(3-8))+3;
    			leftPaddle.y = 250;
    		}
    	}
    }
    if(ball.y+ball.radius>canvas.height || ball.y-ball.radius<0){
    	ball.dy*=-1;
    }
    //movement code of left paddle
    if(leftPaddle_upPressed && leftPaddle.y > 0){
    	leftPaddle.dy=-leftPaddle.speed;
    }
    if(leftPaddle_downPressed && leftPaddle.y < canvas.height-leftPaddle.height){
    	leftPaddle.dy=+leftPaddle.speed;
    }
    //movement code of right paddle
    if(rightPaddle_upPressed && rightPaddle.y > 0){
    	rightPaddle.dy=-rightPaddle.speed;
    }
    if(rightPaddle_downPressed && rightPaddle.y < canvas.height-rightPaddle.height){
    	rightPaddle.dy=+rightPaddle.speed;
    }

    ball.x+=ball.dx;
    ball.y+=ball.dy;
    requestAnimationFrame(draw);
}
draw();