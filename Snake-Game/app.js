 $(document).ready(function () {  
            //Canvas stuff  
            var drawCanvas = $("#canvas")[0];  
            var context = drawCanvas.getContext("2d");  
            var width = $("#canvas").width();  
            var height = $("#canvas").height();  
            
            var cell_width = 15;  
            var defaultRun;  
            var snake_food;  
            var score;  
            var mySnakeArray; 
            var speed=130; 
            var color="blue";
            
            function start() {  
                defaultRun = "right";  
                createSnake();  
                createFood();  
                score = 0;  
                
                if (typeof game_loop != "undefined") clearInterval(game_loop);  
                game_loop = setInterval(paintSnake, speed);  
            }  
            start();  
            
            function createSnake() {  
                var snakeSize = 5;  
                mySnakeArray = [];  
                for (var m =snakeSize-1;m>=0;m--) {  
                    mySnakeArray.push({ x:m, y: 0 });  
                }  
            }  
            
            function createFood() {  
                snake_food = { 
                    x: Math.round(Math.random() * (width - cell_width) / cell_width),  
                    y: Math.round(Math.random() * (height - cell_width) / cell_width)  
                };  
            }  
            
            function paintSnake() {  
                context.fillStyle = "black";  
                context.fillRect(0, 0, width, height);  
                context.strokeStyle = "white";  
                context.strokeRect(0, 0, width, height);  
                
                var pop_x = mySnakeArray[0].x;  
                var pop_y = mySnakeArray[0].y;  
                
                if (defaultRun == "right") pop_x++;  
                else if (defaultRun == "left") pop_x--;  
                else if (defaultRun == "down") pop_y++;  
                else if (defaultRun == "up") pop_y--;  
                
                
                if (pop_x == -1 || pop_x == width / cell_width || pop_y == -1 || pop_y == height / cell_width || check_collision(pop_x, pop_y, mySnakeArray)) {  
                      //insert final score
                      $('#final_score').html(score);
            //show overlay
            $('#overlay').fadeIn(300); 
            return;  
        }  
        
        if (pop_x == snake_food.x && pop_y == snake_food.y) {  
            var snake_tail = { x: pop_x, y: pop_y };  
            score++;  
            createFood();  
        }  
        else {  
            var snake_tail = mySnakeArray.pop();  
            snake_tail.x = pop_x; snake_tail.y = pop_y;  
        }  
        
        mySnakeArray.unshift(snake_tail);  
        
        for (var i = 0; i < mySnakeArray.length; i++) {  
            var k = mySnakeArray[i];  
            
            paintCell(k.x, k.y);  
        }  
        
        
        paintCell(snake_food.x, snake_food.y);  
        

        //checkscore
        checkscore(score);

        //display current score
        $('#score').html('Your score :'+score);
    }   
    
    function paintCell(x, y) {  
        context.fillStyle = color;  
        context.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);  
        context.strokeStyle = "white";  
        context.strokeRect(x * cell_width, y * cell_width, cell_width, cell_width);  
    }  
    
    function check_collision(x, y, array) {  
        for (var i = 0; i < array.length; i++) {  
            if (array[i].x == x && array[i].y == y)  
                return true;  
        }  
        return false;  
    }

    function checkscore(score){
        if(localStorage.getItem('highscore') === null){
            //if there is no high score
            localStorage.setItem('highscore',score);
        }else{
            //if there is no high score
            if(score>localStorage.getItem('highscore')){
                localStorage.setItem('highscore',score);
            }
        }

        $('#high_score').html('high score :' +localStorage.highscore);
    }
   //use of keyboard keys
   $(document).keydown(function (e) {  
    var keyInput = e.which;  
    if (keyInput == "40" && defaultRun != "up") defaultRun = "down";  
    else if (keyInput == "39" && defaultRun != "left") defaultRun = "right";  
    else if (keyInput == "38" && defaultRun != "down") defaultRun = "up";  
    else if (keyInput == "37" && defaultRun != "right") defaultRun = "left";  
})  
});
 //reset the score
 function resetScore(){
    localStorage.highscore=0;
    //display highscore
    highscorediv=document.querySelector("#high_score");
    highscorediv.innerHTML='high score :0';
}