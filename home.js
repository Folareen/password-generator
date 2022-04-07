const CONTAINER = document.querySelector('.container');
const PASSWORD = document.querySelector('.password');
const COPY = document.getElementById('copy-button');
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
COPY.addEventListener('click', copyPassword);


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
        PASSWORD.style.borderBottom = "1px solid red";
    }
    else if(passwordLength > 4 && passwordLength < 8 ){
        passwordStrength.innerText = "Medium!";
        passwordStrength.style.color = "yellow";
        PASSWORD.style.borderBottom = "1px solid yellow";
    }
    if(passwordLength >= 8){
        passwordStrength.innerText = "Strong!";
        passwordStrength.style.color = "green";
        PASSWORD.style.borderBottom = "1px solid green";
    }
    CONTAINER.insertBefore(passwordStrength, LENGTH_CONTAINER);
}

function copyPassword(){
    const textArea = document.createElement('textarea');
    textArea.value = PASSWORD.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Password copied to clipboard!')
}
