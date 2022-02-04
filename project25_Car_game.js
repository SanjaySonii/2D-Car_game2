let startAudio = new Audio(`Bmw Car ! Car.mp3`)
let overAudio = new Audio(`Carbrakeandcrash.mp3`)
let cars = document.getElementById(`cars`);
let up = document.getElementById(`top`);
let banya = document.getElementById(`left`);
let down = document.getElementById(`bottom`);
let danya = document.getElementById(`right`);
let mycar = document.getElementById(`mycar`);
let play = document.getElementById(`play`);
let high_score = document.getElementById(`high_score`);
let reset = document.getElementById(`reset`);
let pause = document.getElementById(`pause`);
let score = document.getElementById(`score`);
let Resume = document.getElementById(`Resume`);
let restart = document.getElementById(`restart`);
let track = document.querySelector(`.track`);
let newCar = document.getElementsByClassName(`newCar`);
let hr = document.getElementsByTagName(`hr`);
var parameterX = 0;
let speed = 2200;
var parameterY = 0;
var parameter = 0;
var currentScore = 0;
var HighScore = 0;
var Buildcar;
var updateCar;
var Start = false;
mycar.style.bottom = "22rem";

reset.addEventListener(`click`, () => {
    localStorage.clear();
    window.location.reload();
})
play.addEventListener(`click`, () => {
    if (play.innerText == `Start Game`) {
        Start = true;
        canMove();
        gamePlaying();
        play.style.display = "none";
        pause.style.display = "inline";
        score.style.display = "inline";
        for (const Hr of hr) {
            Hr.style.animation = ` run .3s ease-in 0s infinite`
        }
    }
})
pause.addEventListener(`click`, () => {
    Start = false;
    startAudio.pause();
    canMove();
    clearInterval(Buildcar);
    clearInterval(updateCar);
    pause.style.display = "none";
    Resume.style.display = "inline";
    restart.style.display = "inline";
    for (const Hr of hr) {
        Hr.style.animation = "none";
    }
})
Resume.addEventListener(`click`, () => {
    Start = true;
    canMove();
    gamePlaying();
    Resume.style.display = "none";
    restart.style.display = "none";
    pause.style.display = "inline";
    for (const Hr of hr) {
        Hr.style.animation = ` run .3s ease-in 0s infinite`
    }
})
restart.addEventListener(`click`, () => {
    window.location.reload();
})

function canMove() {
    if(Start){
        up.addEventListener(`click`, () => {
            if (Start) {
                if (parameterY <= -34) { } else { parameterY -= 2; }
            }
            mycar.style.bottom = 22 - Number(parameterY) + `rem`;
            mycar.style.left = 11 + Number(parameterX) + `rem`;
        })
        down.addEventListener(`click`, () => {
            if (Start) {
                if (parameterY >= 0) { } else { parameterY += 2; }
            }
            mycar.style.bottom = 22 - Number(parameterY) + `rem`;
            mycar.style.left = 11 + Number(parameterX) + `rem`;
        })
        banya.addEventListener(`click`, () => {
            if (Start) {
                if (parameterX <= -10) { } else { parameterX -= 2; }
            }
            mycar.style.bottom = 22 - Number(parameterY) + `rem`;
            mycar.style.left = 11 + Number(parameterX) + `rem`;
        })
        danya.addEventListener(`click`, () => {
            if (Start) {
                if (parameterX >= 10) { } else { parameterX += 2; }
            }
            mycar.style.bottom = 22 - Number(parameterY) + `rem`;
            mycar.style.left = 11 + Number(parameterX) + `rem`;
        })
    }
}


function gamePlaying() {
    startAudio.loop = true;
    startAudio.play();
    Buildcar = setInterval(() => {
        let carNo = parseInt(2 + 5 * Math.random());
        let CarLeftposition = parseInt(0 + 21 * Math.random());
        let NewCar = document.createElement(`div`);
        NewCar.classList.add(`newCar`);
        NewCar.innerHTML = `<img src="car (${carNo}).jpg" alt="mycar">`;
        NewCar.style.left = `${CarLeftposition}rem`;
        NewCar.style.top = `-8rem`;
        cars.appendChild(NewCar);
        if(currentScore == 50 || currentScore == 100 || currentScore == 150 || currentScore == 200){speed -= 200}
        console.log(speed)
    }, speed);

    updateCar = setInterval(() => {
        for (const car of newCar) {
            if (car.style.top.length == 6) { parameter = car.style.top.slice(0, 3); }
            else if (car.style.top.length == 5) { parameter = car.style.top.slice(0, 2); }
            else if (car.style.top.length == 4) { parameter = car.style.top.slice(0, 1); }
            if (parameter == 51) { cars.removeChild(car); }
            else {
                car.style.top = `${Number(parameter) + 1}rem`;
                gameover(car);
            }
        }
        updateScore();
    }, 100);
}

function updateScore() {
    for (const car of newCar) {
        if (car.classList.length == 1) {
            if (mycar.offsetTop - car.offsetTop <= -150) {
                car.classList.add(`marked`);
                currentScore += 10;
               
                score.innerText = `Score : ${currentScore}`;
            }
        }
    }
}
function gameover(car) {
    if ((mycar.offsetTop - car.offsetTop >= -130
        && mycar.offsetTop - car.offsetTop <= 120)
        &&
        (mycar.offsetLeft - car.offsetLeft >= -72
            && mycar.offsetLeft - car.offsetLeft <= 80)) {
        clearInterval(Buildcar);
        clearInterval(updateCar);
        for (const Hr of hr) {
            Hr.style.animation = "none";
        }
        Start = false;
        overAudio.play();
        startAudio.pause();
        canMove();

        let high = localStorage.getItem(`high`);
        if (high == null) {
            highObj = [];
        } else {
            highObj = JSON.parse(high);
            HighScore = highObj.pop();
        }
        if (HighScore < currentScore) {
            HighScore = currentScore;
        }
        high_score.style.display = "inline";
        high_score.innerHTML = `Your Score : ${currentScore}<br>High Score : ${HighScore}`;
        highObj.push(HighScore);
        localStorage.setItem("high", JSON.stringify(highObj));
        score.style.display = "none";
        pause.style.display = "none";
        play.style.display = "inline";
        reset.style.display = "inline";
        restart.style.display = "inline";
        play.innerText = `GameOver`;
    }
}