const luigi = document.querySelector('.luigi');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const gameoverImage = document.querySelector('.game-over');
const score = document.querySelector('.score');
const jumpTimeout = 750;
let gameover = false;
let endGameAnimation;

let gameLoop = setInterval(() => loop(), 10);
let scoreLoop = setInterval(() => calcScore(), 100);

const loop = () => {
    const pipePosition = pipe.offsetLeft;
    const backgroundPosition = window.getComputedStyle(gameBoard).backgroundPositionX;
    const luigiPosition = +window.getComputedStyle(luigi).bottom.replace('px', '');

    if (pipePosition >= 0 && pipePosition <= 120 && luigiPosition < 162) {
        endgame(pipePosition, backgroundPosition, luigiPosition);
    }
};

const calcScore = () => {
    score.innerHTML = Number(score.innerHTML) + 10;
};

const resetScore = () => {
    score.innerHTML = Number(0);
};

const restart = () => {
    gameover = false;

    gameBoard.style.animation = 'background-animation 1.8s linear infinite';
    gameBoard.style.backgroundPosition = 'bottom';
    
    luigi.style.bottom = '60px'
    luigi.src = './images/luigi-walking.gif';
    luigi.offsetLeft; /* trigger reflow */
    
    pipe.style.left = '';
    pipe.style.animation = 'none';
    pipe.offsetLeft; /* trigger reflow */
    pipe.style.animation = 'pipe-animation 2s linear infinite';

    gameoverImage.style.display = 'none';
    clearInterval(endGameAnimation);

    resetScore();
    gameLoop = setInterval(() => loop(), 10);
    scoreLoop = setInterval(() => calcScore(), 100)
};

const endgame = (pipePosition, backgroundPosition, luigiPosition) => {
    gameover = true;
        
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    gameBoard.style.animation = 'none';
    gameBoard.style.backgroundPositionX = backgroundPosition;
    luigi.style.bottom = `${luigiPosition}px`
    if (luigi.classList.contains('jump')) luigi.classList.remove('jump');
    luigi.src = './images/luigi-dead.gif'
    luigi.style.width = '75px';
    luigi.offsetLeft;

    endGameAnimation = setTimeout(() => {
        luigi.src = './images/luigi-dead.png'
    }, 400);

    gameoverImage.style.display = 'block';
    
    clearInterval(gameLoop);
    clearInterval(scoreLoop);
};

const jump = () => {

    if (gameover) {
        restart();
        return;
    }  
    
    console.log('jump! at ' + pipe.offsetLeft);
    
    if (luigi.classList.contains('jump')) return;

    luigi.classList.add('jump');

    setTimeout(() => {
        luigi.classList.remove('jump');
    }, jumpTimeout);
};

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', (e) => { jump(); e.preventDefault(); });
document.addEventListener('click', (e) => { jump(); e.preventDefault(); });