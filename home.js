const PASSWORD = document.querySelector('.password');
const COPY = document.querySelector('generated-password button');
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
    let optionCount = UPPERCASE.checked + LOWERCASE.checked + NUMBERS.checked + SYMBOLS.checked;
    let generatedPassword = "";
    for(let i = 0; i < PASSWORD_LENGTH.value; i+=optionCount){
        generatedPassword += include(UPPERCASE_CHARS, UPPERCASE) + include(LOWERCASE_CHARS, LOWERCASE) + include(NUMBERS_CHARS, NUMBERS) + include(SYMBOLS_CHARS, SYMBOLS);
    }
    let password = generatedPassword.slice(0, PASSWORD_LENGTH.value);
    PASSWORD.innerText = password;
}

