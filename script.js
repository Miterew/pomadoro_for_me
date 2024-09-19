"use strict";

// для ручного редактирования времени пользователем
let userSetMin = 1;
let userSetSek = 0;

// копируем сразу данные для редактирования
let userMin = userSetMin;
let userSec = userSetSek;
// подготовка к клику на помидорку
const pomodoro = document.querySelector('.image_pomadoro_img');
const timerText = document.querySelector('.actual_timer');

// нажатие на помидорку
let firstStart = true;

pomodoro.addEventListener('click', function setTimerStart() {

    if(isReset && isPaused) {
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

})


// Кнопка сброс
const resetButton = document.querySelector('#button_reset');

let isReset = false;

resetButton.addEventListener('click', function setReset() {
    clearInterval(currentTimerID);
    timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);
    isReset = true;
});


// Кнопка паузы
const pauseButton = document.querySelector('#button_pause');

let isPaused = false;
pauseButton.addEventListener('click', function setPause() {
    clearInterval(currentTimerID);
    isPaused = true;  // Таймер на паузе
});


// Секция с основным таймером
let currentTimerID; // глобальная переменная с айди запущенного таймера
let currentTimerValue; // текущее значение таймера 

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

        if (userMin == 0 && secStartMoment == 60) {
            alert('Таймер завершен!');
            clearInterval(currentTimerID);
        };

        currentTimerValue = [userMin, secStartMoment];
    }, 1000);
}

// Функция визуального добавления второго нуля
function setZero(number) {
    if (number < 10 && number >= 0) {
        number = '0' + number
    }
    return number;
}