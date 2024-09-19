"use strict";

let startDate;

// кнопка паузы
let pause = document.querySelector('#button_pause');

pause.addEventListener('click', function setPauseTimer() {
    setStopTimer(currentTimerID);  // Останавливаем текущий таймер
});

// блок с кликом по помидорке
let pomadoroImage = document.querySelector('.image_pomadoro_img');
let currentTimerValue;

pomadoroImage.addEventListener('click', function pomadoroTrig() {
    if (!currentTimerID) { // Передаем нули при первом запуске
        setActualTimer(0, 25, 0);

        let date = new Date();
        startDate = date;

    } else if (currentTimerID) { // Передаем значения в случае паузы
        concentration.textContent = '';
        effective.textContent = '';
        
        let hour = currentTimerValue[0];
        let minutes = currentTimerValue[1];
        let seconds = currentTimerValue[2];

        setActualTimer(hour, minutes, seconds);
    }
});

// функция тикающего таймера
let currentTimerID; // создаем глобальный ID тик таймера чтоб потом стопать с любой точки
let actualTimer = document.querySelector('.actual_timer');

function setActualTimer(hours, minutes, seconds) {

    actualTimer.textContent = setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds);

    // Запуск нового таймера
    currentTimerID = setInterval(function () {
        seconds--;

        if (seconds == '00') {
            seconds = 60;
            minutes--;
        }

        if (minutes == 60) {
            hours++;
            minutes = 0;
        }

        currentTimerValue = [hours, minutes, seconds]; // сохраняем каждый раз в массив на случай паузы
        showActualTimer(hours, minutes, seconds);
    }, 1000);


    // функция отображения в актуальном таймере
    function showActualTimer(hours, minutes, seconds) {
        hours = setZero(hours);
        minutes = setZero(minutes);
        seconds = setZero(seconds);

        actualTimer.textContent = hours + ':' + minutes + ':' + seconds;
    }
}

// функция финиш
let finish = document.querySelector('#button_finish');
let finishDate;

finish.addEventListener('click', function setsetStopTimer() {
    setStopTimer(currentTimerID);

    let date = new Date();
    finishDate = date;

    showResume();
})

// функция reset
let reset = document.querySelector('#button_reset');

reset.addEventListener('click', function setReset() {
    setStopTimer(currentTimerID);

    actualTimer.textContent = '00:00:00'

    currentTimerValue = [0, 0, 0]; // сохраняем каждый раз в массив на случай паузы
    startDate = new Date();

    concentration.textContent = '';
    effective.textContent = '';
});

// функция подведения заключения (резюмируя)
let concentration = document.querySelector('.concentration');
let effective = document.querySelector('.effective_timer_content');

function showResume() {

    let hours = '';
    let minutes = '';
    let seconds = '';

    if (currentTimerValue[0]) {
        hours = currentTimerValue[0] + ' ч ';
    }

    if (currentTimerValue[1]) {
        minutes = currentTimerValue[1] + ' мин ';
    }

    if (currentTimerValue[2] != 0) {
        seconds = currentTimerValue[2] + ' сек ';
    }

    let mil = finishDate - startDate;
    concentration.textContent = 'Концентрация ';
    effective.textContent =  getTimeMs(mil) + ' из ' + hours + minutes + seconds;
}


// функция определяет сколько прошло времени получая миллисекунды - с этой функцией помог GPT
function getTimeMs(mill) {
    let sec = '';
    let min = '';
    let hour = '';

    let seconds = Math.floor(mill / 1000);
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    if (hours > 0) {
        hour = hours + ' ч ';
    }
    if (minutes > 0) {
        min = minutes + ' мин ';
    }
    if (seconds > 0 || (hours === 0 && minutes === 0)) {
        sec = seconds + ' сек';
    }

    return `${hour}${min}${sec}`;
}



// функция добавляющая 0 перед временем
function setZero(number) {
    if (number < 10) {
        number = '0' + number;
    }

    return number;
}

// функция останавливающая таймер
function setStopTimer(currentTimerID) {
    clearInterval(currentTimerID);  // Останавливаем текущий таймер
}