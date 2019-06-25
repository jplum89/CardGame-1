let wonGame = false;
let counter;

function startCountdown(seconds) {
    counter = seconds;

    var interval = setInterval(() => {
        counter++;
        let minuteTimer = Math.floor(counter / 60);
        let secondTimer = counter % 60;
        // document.getElementById('timer').innerHTML = "0:" + seconds;

        if (wonGame === true) {
            document.getElementById("timer").innerHTML = "You won!";
            clearInterval(interval);
            return;
        }

        if (counter >= 10) {
            document.getElementById("timer").innerHTML = minuteTimer + ":" + secondTimer;
        }

        if (secondTimer < 10 && secondTimer >= 0) {
            document.getElementById("timer").innerHTML = minuteTimer + ":0" + secondTimer;
        };
        // if (counter === 0) {

        //     clearInterval(interval);
        //     document.getElementById("timer").innerHTML = "GAME OVER!";
        // };
    }, 1000);
};





// Get the modal
const modal = document.getElementById("myModal");

// // Get the button that opens the modal
const resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", function() {
    modal.style.display = "block";
});



// Get the play element that closes the modal
let playButton = document.querySelector("#close");

// When the user clicks on the button, open the modal 
// window.onload = function modalLoad() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
playButton.addEventListener("click", function() {
    modal.style.display = "none";
    startCountdown(0);
    startGame();
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// function openModal() {
//     $(document).ready(function() {
//         $("#myModal").modal();
//     });
// }

// function closeModal() {
//     $(document).ready(function() {
//         $("#myModal").modal('hide');
//     });
// }

const cards = document.querySelectorAll('.memory-card');


function startGame() {
    wonGame = false;
    let pokemonCardsMatched = 0;
    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        pokemonCardsMatched += 2;
        if (pokemonCardsMatched < 24) {
            resetBoard();
        } else if (pokemonCardsMatched === 24) {
            wonGame = true;
            const winTime = counter;
            function addName() {
                let x = prompt("name");
                var node = document.createElement("LI");
                var textnode = document.createTextNode(x + " " + winTime);
                node.appendChild(textnode);
                document.getElementById("leaders").appendChild(node);
            }
            alert("you won in " + winTime + " seconds");
            addName();
            document.querySelector(".leaderboard").style.display = "inline";
            resetBoard();
            return;
        }
        
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 700);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.classList.remove('flip'));

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 24);
            card.style.order = randomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
    
};

disableCards();

