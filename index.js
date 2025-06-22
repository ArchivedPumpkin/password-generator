const lengthInput = document.getElementById("length")
const generateBtn = document.getElementById("generate")
const passwordField = document.getElementById("password")
const generatedPassword = document.getElementById("generated-password")
const copyBtn = document.getElementById("copy-button")
const passUppercase = document.getElementById("include-uppercase")
const passLowercase = document.getElementById("include-lowercase")
const passNumbers = document.getElementById("include-numbers")
const passSymbols = document.getElementById("include-symbols")

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[",
    "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"]

const passwordLength = lengthInput.value // Default length if not specified

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
    passwordField.value = generatePassword(passwordLength)
})

copyBtn.addEventListener("click", function () {
    const copiedPassword = passwordField.value
    navigator.clipboard.writeText(copiedPassword)
    alert("Password copied to clipboard: " + copiedPassword)
})

