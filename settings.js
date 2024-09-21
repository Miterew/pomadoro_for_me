// Кнопка настроек
const settingsS = document.querySelector('#button_settings');
const settingsDiv = document.querySelector('.main_settings');
const settingsInputMin = document.querySelector('.settings_input');

settingsS.addEventListener('click', function openSettings() {
    settingsDiv.classList.toggle('hidden');
    settingsInputMin.value = userSetMin;
});


settingsInputMin.addEventListener('change', function() {
    userSetMin = settingsInputMin.value;
    timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);
});

settingsInputMin.addEventListener('blur', function() {
    settingsDiv.classList.toggle('hidden');
    
    //
    isReset = true;
    clearInterval(currentTimerID);

    timerText.textContent = setZero(userSetMin) + ':' + setZero(userSetSek);

    getTimer(userSetMin, userSetSek);
});

