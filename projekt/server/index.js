console.log($().jquery);

$(document).ready(function(){

    const colors = ["green","red","yellow","blue"];
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let started = false;
    
    function startGame(){
        level = 0;
        gameSequence = [];
        userSequence = [];
        started = true;

        nextSequences();
    }

    function nextSequences(){
        userSequence = [];
        level += 1;
        $("title").text(`level ${level}`);

        const randomColor = colors[Math.floor(Math.random() * 4)]
        gameSequence[level-1] = randomColor;        
        $(`#${randomColor}`).fadeOut(100).fadeIn(100);
        playSound(randomColor);
    }

    function playSound(color){
        const audio = new Audio(`../audio/${color}.mp3`);
        
        $(audio).on("error", function(){
            console.error(`Nie znalezione pliku dźwiękowego dla ${color}`);
        })
        audio.play();
    }

    function animatePress(color){
        $(`#${color}`).addClass("pressed");

        setTimeout(() => $(`#${color}`).removeClass("pressed"), 100)
    }

    $(".zse-kwadrat").click(function() {
        if(!started) return;
        const userChosenColor = $(this).attr("id")
        userSequence.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userSequence.length-1);
    });

    function checkAnswer(currentlevel){
        if(userSequence[currentlevel] === gameSequence[currentlevel]){
            if(gameSequence.length === userSequence.length){
            setTimeout(() => {
                nextSequences();
            }, 1000);  
            }
        } else {
            playSound("gameover");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("h1").text("Przegrałeś... zacznij od nowa"); 
                startOver();
            }, 1000)
            
        }
    }

    function startOver(){
        started = false;
        $("h1").text("Naciśnij Start, aby rozpocząć grę");
    }
    $(".zse-container").on("click", function() {
        if(!started) {
            startGame();
        }
    })
});