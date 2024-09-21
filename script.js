"use strict";

// для ручного редактирования времени пользователем
let userSetMin = 25;
let userSetSek = 0;
const title = document.title;


// копируем сразу данные для редактирования
let userMin = userSetMin;
let userSec = userSetSek;
// подготовка к клику на помидорку

let play = document.querySelector('#button_play');
let pause = document.querySelector('#button_pause');

const timerText = document.querySelector('.actual_timer');

timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);

// нажатие на помидорку
let firstStart = true;
let startDate;

play.addEventListener('click', function setTimerStart() {
    setStartTimer();
    startDate = new Date();

    let audio = new Audio();
    audio.src = 'src/start.wav';
    audio.autoplay = true;
})


// Кнопка сброс
const resetButton = document.querySelector('#button_reset');

let isReset = false;

resetButton.addEventListener('click', function setReset() {

    if(firstStart) {
        return;
    }

    clearInterval(currentTimerID);
    timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);
    isReset = true;

    if (!isPaused) {
        pause.classList.toggle('hidden');
        play.classList.toggle('hidden');
    }

    let audio = new Audio();
    audio.src = 'src/reset.wav';
    audio.autoplay = true;
});


// Кнопка паузы
const pauseButton = document.querySelector('#button_pause');

let isPaused = false;
pauseButton.addEventListener('click', function setPause() {
    clearInterval(currentTimerID);
    isPaused = true;  // Таймер на паузе

    play.classList.toggle('hidden');
    pause.classList.toggle('hidden');

});


// функция запуска таймера в зависимости от параметра
function setStartTimer() {
    play.classList.toggle('hidden');
    pause.classList.toggle('hidden');

    if (isReset && isPaused) {
        isPaused = false;
    }

    if (isReset) {
        clearInterval(currentTimerID);

        timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);
        isReset = false;

        getTimer(userSetMin, userSetSek);
    }

    if (isPaused) {
        let lostMin = currentTimerValue[0];
        let lostSec = currentTimerValue[1];

        timerText.textContent = setZero(lostMin - 1) + ':' + setZero(lostSec);

        isPaused = false;  // Таймер возобновлен
        getTimer(lostMin, lostSec);  // Возобновляем таймер
        
    }

    if (firstStart) {
        getTimer()
        timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);
        firstStart = false;
    }

}


// Секция с основным таймером
let currentTimerID; // глобальная переменная с айди запущенного таймера
let currentTimerValue; // текущее значение таймера 


let nowDate;

// функция старта и ресета
function getTimer(userMin, secStartMoment) {
    if (!secStartMoment) {
        secStartMoment = 60;
    }

    if (!userMin) {
        userMin = userSetMin;
    }

    currentTimerID = setInterval(function () {
        secStartMoment--;

        timerText.textContent = setZero(userMin - 1) + ':' + (setZero(secStartMoment));

        if (secStartMoment == 0) {
            secStartMoment = 60;
            userMin--;
        }

        currentTimerValue = [userMin, secStartMoment];
        document.title = setZero(userMin - 1) + ':' + (setZero(secStartMoment));


        if (userMin == 0 && secStartMoment == 60) {
            clearInterval(currentTimerID);

            document.title = 'Таймер завершен';

            let audio = new Audio();
            audio.src = 'src/finish.wav';
            audio.autoplay = true;
        };
    }, 1000);
}



// Функция визуального добавления второго нуля
function setZero(number) {
    if (number < 10 && number >= 0) {
        number = '0' + number
    }
    return number;
}