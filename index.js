const lengthInput = document.getElementById("length")
const generateBtn = document.getElementById("generate")
const generatedPassword = document.getElementById("generated-password")
const copyBtn = document.getElementById("copy")

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[",
    "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"]

const passwordLength = lengthInput.value

function generateRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
}

function generatePassword(length) {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += generateRandomCharacter()
    }
    return password
}

generateBtn.addEventListener("click", function () {
    console.log("clicked")
})

console.log("Random password: " + generatePassword(passwordLength))

