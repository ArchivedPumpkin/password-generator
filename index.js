const lengthInput = document.getElementById("length-value")
const generateBtn = document.getElementById("generate")
const passwordField = document.getElementById("password")
const generatedPassword = document.getElementById("generated-password")
const copyBtn = document.getElementById("copy-password")
const passUppercase = document.getElementById("include-uppercase")
const passLowercase = document.getElementById("include-lowercase")
const passNumbers = document.getElementById("include-numbers")
const passSymbols = document.getElementById("include-symbols")
const passSlider = document.getElementById("slider")

// Animation for the h1 highlight text
// This will animate the text "secure password" with random symbols before revealing the final text
const symbols = ["!", "@", "#", "$", "%", "&", "_", "/", "\\"];
const finalText = "secure password";
const h1 = document.getElementById("h1_highlight");

let frame = 0;
let counter = 0;
let frameInterval = 3; // ~60fps → 3 frames ≈ 50ms
let buffer = '';
let maxBufferLength = 5;

function animateScrambleText(element, text, frameInterval = 3, maxBufferLength = 5) {
    let frame = 0;
    let counter = 0;
    let buffer = '';

    function step() {
        frame++;

        if (frame % frameInterval === 0) {
            counter++;
            const visible = text.slice(0, counter);

            if (counter > text.length) {
                if ('value' in element) {
                    element.value = text;
                } else {
                    element.textContent = text;
                }
                return;
            }

            let remaining = text.length - counter;
            if (remaining > maxBufferLength) remaining = maxBufferLength;

            buffer = '';
            for (let i = 0; i < remaining; i++) {
                buffer += symbols[Math.floor(Math.random() * symbols.length)];
            }

            if ('value' in element) {
                element.value = visible + buffer;
            } else {
                element.textContent = visible + buffer;
            }
        }

        requestAnimationFrame(step);
    }

    step();
}


animateScrambleText(h1, finalText);



const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[",
    "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"]

lengthInput.value = 12

function updateLengthValuePosition() {
    const slider = passSlider;
    const value = Number(slider.value);
    const min = Number(slider.min);
    const max = Number(slider.max);

    // Calculate percentage position
    const percent = (value - min) / (max - min);

    // Get slider width
    const sliderWidth = slider.offsetWidth;

    // Thumb size is 20px (from CSS)
    const thumbSize = 20;
    const offset = thumbSize / 2;

    // Calculate pixel position
    const px = percent * (sliderWidth - thumbSize) + offset;

    lengthInput.style.left = `${px - lengthInput.offsetWidth / 2}px`;
    lengthInput.textContent = value;
    lengthInput.value = value; // Update the input value
}

passSlider.addEventListener("input", function () {
    updateLengthValuePosition();
});

window.addEventListener("DOMContentLoaded", function () {
    updateLengthValuePosition();
});

let passwordLength = lengthInput.value

function generateRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
}

function generatePassword(length) {
    let chars = [...characters];

    const uppercase = chars.slice(0, 26);
    const lowercase = chars.slice(26, 52);
    const numbers = chars.slice(52, 62);
    const symbols = chars.slice(62);

    let allowedChars = [];
    if (passUppercase.checked) allowedChars = allowedChars.concat(uppercase);
    if (passLowercase.checked) allowedChars = allowedChars.concat(lowercase);
    if (passNumbers.checked) allowedChars = allowedChars.concat(numbers);
    if (passSymbols.checked) allowedChars = allowedChars.concat(symbols);

    if (allowedChars.length === 0) {
        alert("Please select at least one character type.");
        return "";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    return password;
}

generateBtn.addEventListener("click", function () {
    passwordLength = lengthInput.value;
    const newPassword = generatePassword(passwordLength);

    passwordField.value = ""; // Clear instantly
    animateScrambleText(passwordField, newPassword);
});


passwordField.addEventListener("click", function () {
    const copiedPassword = passwordField.value
    navigator.clipboard.writeText(copiedPassword)
    alert("Password copied to clipboard: " + copiedPassword)
})

copyBtn.addEventListener("click", function () {
    const copiedPassword = passwordField.value
    navigator.clipboard.writeText(copiedPassword)
    alert("Password copied to clipboard: " + copiedPassword)
})


document.querySelectorAll('input[type="range"]').forEach(slider => {
    function updateSliderBackground() {
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, white 0%, white ${value}%, gray ${value}%, gray 100%)`;
    }

    slider.addEventListener('input', updateSliderBackground);
    updateSliderBackground(); // initialize
});


