const CONTAINER = document.querySelector('.container');
const PASSWORD = document.querySelector('.password');
const COPY = document.getElementById('copy-button');
const LENGTH_CONTAINER = document.querySelector('.length');
const PASSWORD_LENGTH = document.getElementById('length');
const UPPERCASE = document.getElementById('uppercase');
const LOWERCASE = document.getElementById('lowercase');
const NUMBERS = document.getElementById('numbers');
const SYMBOLS = document.getElementById('symbols');
const GENERATE_PASSWORD_BUTTON = document.querySelector('.generate-btn');
const GENERATE_EASY_PASSWORD_BUTTON = document.querySelector('.easy');

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS_CHARS = "1234567890";
const SYMBOLS_CHARS = "`~!@#$%^&*()_+={[}]|\\;'\"";

GENERATE_PASSWORD_BUTTON.addEventListener('click', generatePassword);
GENERATE_EASY_PASSWORD_BUTTON.addEventListener('click', generateEasyToReadPassword)
COPY.addEventListener('click', copyPassword);
PASSWORD.addEventListener('cut', () => alert("Password copied to clipboard!"));
PASSWORD.addEventListener('copy', () => alert("Password copied to clipboard!"));


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
    let passwordArr = password.split("");
    let sortedPasswordArr = passwordArr.sort().reverse();
    let sortedPassword = sortedPasswordArr.join("");

    if(document.querySelector('.password-strength')){
        document.querySelector('.password-strength').remove();
    }
    PASSWORD.innerText = sortedPassword;

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

async function generateEasyToReadPassword(){

    let random;

    async function getRandom(){
        await fetch('https://random-word-api.herokuapp.com/word')
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0]);
                if(data[0].length > PASSWORD_LENGTH.value ){
                    random = data[0];
                }else{
                    random = data[0];
                    let times = PASSWORD_LENGTH.value - random.length;
                    random += random.repeat(times)
                }
            })
            .catch (()=>{PASSWORD.innerHTML = `<span class="unable">Unable to generate...Please try again.</span>`});
    }

    await getRandom();
    
    let wordLength = PASSWORD_LENGTH.value
    let otherCharsLength = 0;
    if( NUMBERS.checked || SYMBOLS.checked ){
        otherCharsLength += Math.ceil(PASSWORD_LENGTH.value * .2);
        wordLength -= otherCharsLength;
    }

    let generatedPassword;
    if (!(random == undefined)){
        generatedPassword = random.slice(0, wordLength);

        for(let i = 0; i < otherCharsLength; i+= 1){
            generatedPassword += include(NUMBERS_CHARS, NUMBERS) + include(SYMBOLS_CHARS, SYMBOLS);
        }

        if( !(LOWERCASE.checked)){
            generatedPassword = generatedPassword.toLowerCase();
        }
    
        if(document.querySelector('.password-strength')){
            document.querySelector('.password-strength').remove();
        }

        PASSWORD.innerText = generatedPassword.slice(0, PASSWORD_LENGTH.value);

        let passwordStrength = document.createElement('div');
        passwordStrength.classList.add('password-strength');
        let passwordLength = (generatedPassword.slice(0, PASSWORD_LENGTH.value)).length;
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
    }else{
        if(document.querySelector('.password-strength')){
            document.querySelector('.password-strength').remove();
            PASSWORD.style.borderBottom = "0"
        }
    }

}

function copyPassword(){
    const textArea = document.createElement('textarea');
    textArea.value = PASSWORD.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Password copied to clipboard!');
}