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

// нажатие на помидорку
let firstStart = true;

play.addEventListener('click', function setTimerStart() {
    setStartTimer();
})


// Кнопка сброс
const resetButton = document.querySelector('#button_reset');

let isReset = false;

resetButton.addEventListener('click', function setReset() {
    clearInterval(currentTimerID);
    timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);
    isReset = true;

    if (!isPaused) {
        pause.classList.toggle('hidden');
        play.classList.toggle('hidden');
    }
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

// Кнопка настроек
const settingsS = document.querySelector('#button_settings');

settingsS.addEventListener('click', function openSettings() {
    console.log('Нажали настройку')
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
        document.title = title + ' ' + setZero(userMin - 1) + ':' + (setZero(secStartMoment));
    }, 1000);
}

// Функция визуального добавления второго нуля
function setZero(number) {
    if (number < 10 && number >= 0) {
        number = '0' + number
    }
    return number;
}


