"use strict";

let pomadoroImage = document.querySelector('.image_pomadoro_img');
let startDate;

// блок с фиксацией времени начала обучения
pomadoroImage.addEventListener('click', function getStartTime() {
    let date = new Date();
    startDate = date;

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hour = setZero(hour);
    minutes = setZero(minutes);
    seconds = setZero(seconds);

    let startTimeP = document.querySelector('.start_timer_content');

    let startTimeArr = [hour, minutes, seconds];
    startTimeP.textContent = 'Начал: ' + hour + ':' + minutes + ':' + seconds;
    pomadoroImage.removeEventListener('click', getStartTime);
});

// кнопка паузы
let pause = document.querySelector('#subimages_img_pause');

pause.addEventListener('click', function setPauseTimer() {
    clearInterval(currentTimerID);  // Останавливаем текущий таймер
});

// блок с тикающим таймером времени обучения
let currentTimerValue;

pomadoroImage.addEventListener('click', function pomadoroTrig() {
    if (!currentTimerID) { // Передаем нули при первом запуске
        setActualTimer(0, 0, 0);
    } else if (currentTimerID) { // Передаем значения в случае паузы
        let hour = currentTimerValue[0];
        let minutes = currentTimerValue[1];
        let seconds = currentTimerValue[2];

        setActualTimer(hour, minutes, seconds);
    }
});

// функция тикающего таймера
let currentTimerID; // создаем глобальный ID тик таймера чтоб потом стопать с любой точки

function setActualTimer(hours, minutes, seconds) {

    let actualTimer = document.querySelector('.actual_timer');
    actualTimer.textContent = setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds);

    // Запуск нового таймера
    currentTimerID = setInterval(function () {
        seconds++;

        if (seconds == 60) {
            seconds = 0;
            minutes++;
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
let finish = document.querySelector('#subimages_img_stop');
let finishDate;

finish.addEventListener('click', function setStopTimer() {
    clearInterval(currentTimerID);  // Останавливаем текущий таймер

    let date = new Date();
    finishDate = date;

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hour = setZero(hour);
    minutes = setZero(minutes);
    seconds = setZero(seconds);

    let finishTimerContent = document.querySelector('.finish_timer_content');

    finishTimerContent.textContent = 'Закончил: ' + hour + ':' + minutes + ':' + seconds;
    showResume();
})


// функция подведения заключения (резюмируя)

function showResume() {
    let resumeContent = document.querySelector('.resume_content');

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
    resumeContent.textContent = 'С первого запуска таймера прошло ' + getTimeMs(mil)
        + ' из них эффективно прошло ' + hours + minutes + seconds;
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
