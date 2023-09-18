const inputSlider = document.querySelector("[data-LengthSlider]");
const lengthDisplay = document.querySelector("[data-LengthNumber]");
const passwordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-CopyMsg]");
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()-_=+[]{};:<>?'

let password = "";
let passwordLength = 10;
let checkCount = 0;
// slider setting password length

handleSlide();

function handleSlide(){

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

function getRanInt(max, min){

    return Math.floor(Math.random()*(max - min))+min;

}

function generateRandomNumber(){
    
    return getRanInt(0,9);
}

function generateLowerCase(){

    return String.fromCharCode(getRanInt(97,123));
}

function generateUpperCase(){

    return String.fromCharCode(getRanInt(65,91));
}

function generateSymbol(){
    let sym_len = symbols.length;
    
    const randomnum = getRanInt(0,symbols.length);
   
    return symbols.charAt[randomnum];
}

function calcStrength(){
    
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    // if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
    //     // set indicator color as green
    // }else{
    //     // set indicator color as grey
    // }
}

async function copyContent(){

    try{

        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";

    }catch(error){

        copyMsg.innerText = "failed";
    }

    // show copied or failed for only 2 seconds
    copyMsg.classList.add('active');
    setTimeout(() => {
        copyMsg.classList.remove('active');
    },2000);

}


inputSlider.addEventListener('input', (e) => {

    passwordLength = e.target.value;
    handleSlide();
})

copyBtn.addEventListener('click', ()=>{

    if(passwordDisplay.value){
       copyContent(); 
    }
})

function handleCheckbox(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlide();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('echang', handleCheckbox());
})

function shufflePass(passwordArray){

    // shuffle algo -> Fisher Yates Method

    for(let i = passwordArray.length -1 ; i>0 ; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = passwordArray[i];
        passwordArray[i] = passwordArray[j];
        passwordArray[j] = temp;
    }

    let str = "";
    passwordArray.forEach((el) =>{
        str += el;
    })

return str;
}

generateBtn.addEventListener('click', ()=>{


    if(checkCount = 0 ) return;

  
    if(passwordLength < checkCount) passwordLength = checkCount;

    // clear old password
    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked) funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked) funcArr.push(generateLowerCase);
    if(numberCheck.checked) funcArr.push(generateRandomNumber);
    if(symbolCheck.checked) funcArr.push(generateSymbol);



    // req inclusion
    for(let i =0 ; i<funcArr.length ; i++){

        password += funcArr[i]();
    }

    // remaining inclusion 
    for(let i =0 ; i<passwordLength - funcArr.length ; i++){
        let randnum = getRanInt(0 , funcArr.length);
        let myfunc = funcArr[randnum];
        password += myfunc();
    }

    // shuffle the password
    password = shufflePass(Array.from(password));

    // show the password
    passwordDisplay.value = password;

})


























