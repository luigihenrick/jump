const luigi = document.querySelector('.luigi');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
let gameover = false;

const jumpTimeout = 750;

let loop = () => {

    const pipePosition = pipe.offsetLeft;
    const backgroundPosition = window.getComputedStyle(gameBoard).backgroundPositionX;
    const luigiPosition = +window.getComputedStyle(luigi).bottom.replace('px', '');

    // console.log(`luigi: ${luigiPosition} pipe: ${pipePosition}` );

    if (pipePosition >= 0 && pipePosition <= 120 && luigiPosition < 162) {
        
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

        setTimeout(() => {
            luigi.src = './images/luigi-dead.png'
        }, 400);
        
        clearInterval(game);
    }

};

let game = setInterval(() => loop(), 10);

const restart = () => {
    gameover = false;
    game = setInterval(() => loop(), 10);

    gameBoard.style.animation = 'background-animation 1.8s linear infinite';
    gameBoard.style.backgroundPosition = 'bottom';
    
    luigi.style.bottom = '60px'
    luigi.src = './images/luigi-walking.gif';
    luigi.offsetLeft; /* trigger reflow */
    
    pipe.style.left = '';
    pipe.style.animation = 'none';
    pipe.offsetLeft; /* trigger reflow */
    pipe.style.animation = 'pipe-animation 2s linear infinite';


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
