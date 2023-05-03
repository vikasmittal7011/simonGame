var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "yellow", "green"];
var level = 0;
var started = false;

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    runAnimation(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    runAnimation(randomChosenColour);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
}


function playSound(name) {
    var play = new Audio("Sounds/" + name + ".mp3");
    play.play();
}

function runAnimation(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        StartOver();
    }
}

function StartOver(){
    level = 0;
    started = false;
    gamePattern = [];
}