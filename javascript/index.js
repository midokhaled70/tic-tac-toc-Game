$(document).ready(function () {
    $('#friend').click(function () {
        $('.playingOptions').css("display", "none")
        playOption = 'two players'
        location.replace('twoPlayers.html')
    })
    $('#ai').click(function () {
        $('.playingOptions').css("display", "none")
        $('.options').css("display", "flex")
        $('#home').css("display", "flex")
        playOption = 'Ai'
    })

    $(".dots").click(function () { //chose x or o
        $('.options').css("display", "none")
        $('.title').css("display", "none")
        $("td").css("display", "inline-block");//to make them beetwen them
       // $('.tableIamge').css("display", "flex")
        $('.counter').css("display", "flex")
        $('#reset').css("display", "flex")
        aiCo = "O";
        huCo = "X";
    });
    $(".dots2").click(function () {
        $('.options').css("display", "none")
        $('.title').css("display", "none")
        $("td").css("display", "inline-block");
       // $('.tableIamge').css("display", "flex")
        $('.counter').css("display", "flex")
        $('#reset').css("display", "flex")
        aiCo = "X";
        huCo = "O";
    });


    $("td").click(function () {//squares 
        if (playOption == "Ai") {
          document.getElementById('pup1').play();
            move(this, huPlayer);
            console.log(this)
        } else {
        }
    });

    $('#reset').click(function () { //restart.
        aiScore = 0;
        userScore = 0;
        document.getElementById('yourScore').innerHTML = `${userScore}`
        document.getElementById('computerScore').innerHTML = `${aiScore}`
        reset();
    })
});








///////////////////////////////////////////////// minimax Algorithm ////////////////////////




var playOption = 'Ai';
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "X";
var huCo = "O";
let aiScore = 0;
let userScore = 0;
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')

restartButton.addEventListener('click', function () {
    winningMessageElement.classList.remove('show')
})
function move(element, player) {
    if (board[element.id] != "P" && board[element.id] != "C") {
        round++;
        $(element).html(`<p>${huCo}</p>`);
        board[element.id] = player;

        if (winning(board, player)) {
            userScore += 3;
            document.getElementById('yourScore').innerHTML = `${userScore}`
            winningMessageTextElement.innerText = 'You Win!'
            winningMessageElement.classList.add('show')
            reset();
        } else if (round  >8) {
            winningMessageTextElement.innerText = 'Draw!'
            winningMessageElement.classList.add('show')
            document.getElementById('drow').play();
            reset();
        } else {
            round++;
            var index = minimax(board, aiPlayer).index;
            var selector = "#" + index;
            $(selector).html(`<p>${aiCo}</p>`);
            board[index] = aiPlayer;
            if (winning(board, aiPlayer)) {
                document.getElementById('fail').play();
                aiScore += 3;
                
                document.getElementById('computerScore').innerHTML = `${aiScore}`
                winningMessageTextElement.innerText = 'You Lose!'
                
                winningMessageElement.classList.add('show')
             
                reset();
            } else if (round ==0) {
                winningMessageTextElement.innerText = 'Draw!'
                document.getElementById('drow').play();
                winningMessageElement.classList.add('show')
               
                reset();
            }
        }
    }
}

function reset() {
    round = 0;
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $("td").html(' ');
}

function minimax(reboard, player) {
    iter++;
    let array = avail(reboard);
    if (winning(reboard, huPlayer)) {
        return {
            score: -10
        };
    } else if (winning(reboard, aiPlayer)) {
        return {
            score: 10
            
        };
    } else if (array.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player == aiPlayer) {
            var g = minimax(reboard, huPlayer);
            move.score = g.score;
        } else {
            var g = minimax(reboard, aiPlayer);
            move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}//end of minimax

//available spots
function avail(reboard) {
    return reboard.filter(s => s != "P" && s != "C");

}

// winning combinations
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}
var vid = document.getElementById("am");
vid.autoplay = true;
vid.load();