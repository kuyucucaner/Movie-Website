const toggleButton = document.getElementById('theme-toggle');
const darkThemeStyleElements = document.getElementsByClassName('dark-theme-style');
const lightThemeStyleElements = document.getElementsByClassName('light-theme-style');

console.log('toggleButton : ', darkThemeStyleElements); // Now this will log all elements

document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        for (let i = 0; i < lightThemeStyleElements.length; i++) {
            lightThemeStyleElements[i].setAttribute('disabled', 'true');
        }
        for (let i = 0; i < darkThemeStyleElements.length; i++) {
            darkThemeStyleElements[i].removeAttribute('disabled');
        }
        toggleButton.checked = true;
    } else {
        for (let i = 0; i < darkThemeStyleElements.length; i++) {
            darkThemeStyleElements[i].setAttribute('disabled', 'true');
        }
        for (let i = 0; i < lightThemeStyleElements.length; i++) {
            lightThemeStyleElements[i].removeAttribute('disabled');
        }
        toggleButton.checked = false;
    }
});

toggleButton.addEventListener('click', function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        // Switch from dark to light mode
        for (let i = 0; i < darkThemeStyleElements.length; i++) {
            darkThemeStyleElements[i].setAttribute('disabled', 'true');
        }
        for (let i = 0; i < lightThemeStyleElements.length; i++) {
            lightThemeStyleElements[i].removeAttribute('disabled');
        }
        localStorage.setItem('theme', 'light');
    } else {
        // Switch from light to dark mode
        for (let i = 0; i < lightThemeStyleElements.length; i++) {
            lightThemeStyleElements[i].setAttribute('disabled', 'true');
        }
        for (let i = 0; i < darkThemeStyleElements.length; i++) {
            darkThemeStyleElements[i].removeAttribute('disabled');
        }
        localStorage.setItem('theme', 'dark');
    }
});