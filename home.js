const CONTAINER = document.querySelector('.container');
const PASSWORD = document.querySelector('.password');
const COPY = document.querySelector('generated-password button');
const LENGTH_CONTAINER = document.querySelector('.length');
const PASSWORD_LENGTH = document.getElementById('length');
const UPPERCASE = document.getElementById('uppercase');
const LOWERCASE = document.getElementById('lowercase');
const NUMBERS = document.getElementById('numbers');
const SYMBOLS = document.getElementById('symbols');
const GENERATE_PASSWORD_BUTTON = document.getElementById('generate');
const GENERATE_EASY_PASSWORD_BUTTON = document.getElementById('generate-easy');

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS_CHARS = "1234567890";
const SYMBOLS_CHARS = "`~!@#$%^&*()_+={[}]|\\;'\"";

GENERATE_PASSWORD_BUTTON.addEventListener('click', generatePassword);
// COPY.addEventListener('click', copyPassword)


function include(chars, checkBox){
    let random = Math.random();
    let char;
    if(checkBox.checked){
        char = chars[Math.floor(random * chars.length)];
        return char;
    }
    else{
        return "";
    }
}

function generatePassword(){
    if(document.querySelector('.password-strength')){
        document.querySelector('.password-strength').remove()
    }

    let optionCount = UPPERCASE.checked + LOWERCASE.checked + NUMBERS.checked + SYMBOLS.checked;

    let generatedPassword = "";

    for(let i = 0; i < PASSWORD_LENGTH.value; i+=optionCount){
        generatedPassword += include(UPPERCASE_CHARS, UPPERCASE) + include(LOWERCASE_CHARS, LOWERCASE) + include(NUMBERS_CHARS, NUMBERS) + include(SYMBOLS_CHARS, SYMBOLS);
    }

    let password = generatedPassword.slice(0, PASSWORD_LENGTH.value);
    PASSWORD.innerText = password;

    let passwordStrength = document.createElement('div');
    passwordStrength.classList.add('password-strength')
    let passwordLength = password.length;
    if( passwordLength > 0 && passwordLength <= 4){
        passwordStrength.innerText = "Weak!";
        passwordStrength.style.color = "red";
    }
    else if(passwordLength > 4 && passwordLength < 8 ){
        passwordStrength.innerText = "Medium";
        passwordStrength.style.color = "yellow";
    }
    if(passwordLength >= 8){
        passwordStrength.innerText = "Strong!";
        passwordStrength.style.color = "green";
    }
    CONTAINER.insertBefore(passwordStrength, LENGTH_CONTAINER);
}

// function copyPassword(){
    
// }
