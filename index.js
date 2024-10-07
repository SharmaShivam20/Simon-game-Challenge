var gamePattern = [];
var userClickedPattern = [];
var level=0;
 
var buttonColors = ["red","blue","green","yellow"];
var started = false; 

$(document).keypress(function(event){
    if(!started){
        level=0;
    setTimeout(function(){
        nextSequence();
    },1000);
    started=true;
    }
    });

$(".btn").click(function(){ 

    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor); 
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}); 

function playSound(name){
    var buttonPlay= new Audio('sounds/' + name + '.mp3'); 
    buttonPlay.play();
}

function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function() {
            $("#"+currentColor).removeClass("pressed");
        } , 80);
}

function checkAnswer(currentLevel){
    if( userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(currentLevel == gamePattern.length-1){
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }else{
        var wrong = new Audio('sounds/wrong.mp3');
            wrong.play();
        $("body").addClass("game-over");
        setInterval(function (){
            $("body").removeClass("game-over");
        } , 200);

        $("h1").text("Game Over, Press any key to Restart");
        gamePattern=[];
        started=false;
    }
}

function nextSequence(){
    userClickedPattern=[];
$("h1").text("Level :"+level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColors[randomNumber]; 
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeOut(50).fadeIn(50);
playSound(randomChosenColour);
level++;
} 