const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const player1Gif = 'https://media.tenor.com/chfzEVhXQloAAAAj/animated-man-running.gif';
const player2Gif = 'https://media.tenor.com/x1eW6Z7pMnIAAAAj/animated-man-running.gif';
const player1Static = 'animatedrunning2gif-5.png';
const player2Static = 'animated-man-running1gif-5.png';

let player1Position = 0;
let player2Position = 0;
let keyPressed = false;

const winnerModal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');
const countdownModal = document.getElementById('countdownModal');
const timerElement = document.getElementById('timer');
const closeModal = document.getElementsByClassName('close')[0];

closeModal.onclick = function() {
    winnerModal.style.display = 'none';
    resetGame();
}

window.onclick = function(event) {
    if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
        resetGame();
    }
}
function initializeGame() {
    showCountdown();
}

function showCountdown() {
    countdownModal.style.display = 'block';
    let timeLeft = 3;
    
    const countdownInterval = setInterval(() => {
        timerElement.textContent = timeLeft;
        
        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            countdownModal.style.display = 'none';
            resetGame();
        }
        
        timeLeft--;
    }, 1000);
}
document.addEventListener('keydown', (event) => {
    keyPressed = true;
    if (event.key === 'ArrowRight') {
        player1.src = player1Gif; // Set GIF when key is pressed
        player1Position += 10;
        movePlayer(player1, player1Position, 'track1');
    }
    if (event.key === 'd') {
        player2.src = player2Gif; // Set GIF when key is pressed
        player2Position += 10;
        movePlayer(player2, player2Position, 'track2');
    }
});

document.addEventListener('keyup', () => {
    keyPressed = false;
    setTimeout(() => {
        if (!keyPressed) {
            player1.src = player1Static; // Set static image if no key is pressed
            player2.src = player2Static;
        }
    }, 100); // Check after a short delay
});

function movePlayer(player, position, trackId) {
    const track = document.getElementById(trackId);
    const trackWidth = track.offsetWidth;
    if (position >= trackWidth - 50) {
        position = trackWidth - 50;
    }
    player.style.left = position + 'px';
    checkWinner(player, position, trackWidth);
}

function checkWinner(player, position, trackWidth) {
    if (position >= trackWidth - 50) {
        winnerText.textContent = player.alt + ' wins!';
        winnerModal.style.display = 'block';
    }
}

function resetGame() {
    player1Position = 0;
    player2Position = 0;
    player1.style.left = player1Position + 'px';
    player2.style.left = player2Position + 'px';
    player1.src = player1Static; // Ensure static image is used after reset
    player2.src = player2Static;
}
initializeGame(); // Initialize game on page load