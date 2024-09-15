"use strict";

let pomadoroImage = document.querySelector('.image_pomadoro_img');

// блок с фиксацией времени начала обучения
pomadoroImage.addEventListener('click', function getStartTime() {
    let date = new Date();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hour = setZero(hour);
    minutes = setZero(minutes);
    seconds = setZero(seconds);

    let startTimeP = document.querySelector('.start_timer_content');

    startTimeP.textContent = 'Начал: ' + hour + ':' + minutes + ':' + seconds;
    pomadoroImage.removeEventListener('click', getStartTime);
});
// конец блока с фиксацией времени начала обучения


// блок с тикающим таймером времени обучения
let currentTimerID;
let currentTimerValue; // ?X

pomadoroImage.addEventListener('click', function getActualTimer() {
    pomadoroImage.removeEventListener('click', getActualTimer);

    let actualTimer = document.querySelector('.actual_timer');
    let hours;
    let minutes;
    let seconds;

    if(hours || minutes || seconds) {

    } else {
        actualTimer.textContent = '00:00:00';

        hours = 0;
        minutes = 0;
        seconds = 0;
    }

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

        showActualTimer(hours, minutes, seconds);
    }, 1000);

    function showActualTimer(hours, minutes, seconds) {
        hours = setZero(hours);
        minutes = setZero(minutes);
        seconds = setZero(seconds);

        actualTimer.textContent = hours + ':' + minutes + ':' + seconds;
    }

});
//конец блока с тикающим таймером времени обучения

// кнопка паузы
let pause = document.querySelector('#subimages_img_pause');

pause.addEventListener('click', function setPauseTimer() {
    this.removeEventListener('click', setPauseTimer);

    clearInterval(currentTimerID);
})
// конец кнопка паузы и финиш






function setZero(number) { // функция добавляющая 0 перед временем
    if (number < 10) {
        number = '0' + number;
    }

    return number;
}