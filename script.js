// created a character set.
const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '{', '}', '[', ']', ';', ':', '\'', ',', '.', '<', '>', '/', '?'];

// initializing dom elements

const passwordLength = document.querySelector('#passwordLength');
const passwordBox = document.querySelector('#passwordBox');
const generatePass = document.querySelector('#generatePass');
const copy = document.querySelector('#copy');
const description = document.querySelector('.description');

function generatePassword() {
    let passLength = passwordLength.value;
    if (passLength === '') {
        description.innerHTML = 'Please select length';
    }
    else if (passLength < 8 || passLength > 500) {
        description.innerHTML = 'Password length range is 8-500 characters';
    }
   
    else {
        const generatingPassword = () => {
            let randomArray=[];
            // Ensure at least one character from each category:
            randomArray.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]);
            randomArray.push(uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]);
            randomArray.push(numbers[Math.floor(Math.random() * 10)]);
            randomArray.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);

            let elementCount = 4; // Increment counter for added guaranteed characters

            // Fill remaining characters randomly:
            while (elementCount < passLength) {
                let randomChoice = Math.floor(Math.random() * 4); // Randomly choose a number between 0 and 3
                // Push a character based on the chosen type:
                if (randomChoice === 0) {
                    randomArray.push(lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]);
                } else if (randomChoice === 1) {
                    randomArray.push(uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]);
                } else if (randomChoice === 2) {
                    randomArray.push(numbers[Math.floor(Math.random() * 10)]);
                } else {
                    randomArray.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
                }
                elementCount++; // Increment counter for every added element
            }

            passwordBox.innerHTML = randomArray.join('');
            if (passLength>=8 && passLength<20) {
                description.innerHTML = 'Password Strength: Medium';
            }
            else if (passLength>20 && passLength<100) {
                description.innerHTML = 'Password Strength: Strong';
            }
            else if(passLength>=100 && passLength<200){
                description.innerHTML='Relax dude no one can crack this.'
            }
            else if(passLength>=200 && passLength<300){
                description.innerHTML='How will you remember this?'
            }
            else if(passLength>=300 && passLength<400){
                description.innerHTML='The one who cracks this is a crackhead.'
            }
            else if(passLength>=400 && passLength<=500){
                description.innerHTML='Bro you work for FBI?'
            } 
        }
        generatingPassword();
    }
    console.log(passLength);
}
generatePass.addEventListener('click', generatePassword);
passwordLength.addEventListener('keydown',(e)=>{
    if (e.key==='Enter') {
        generatePassword();
    }
})
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
        generatePassword();
    }
});
copy.addEventListener('click',()=>{
    if (passwordBox.value==='') {
        description.innerHTML='Nothing to copy!';   
    }
    else{
        navigator.clipboard.writeText(passwordBox.value);
        description.innerHTML='Password Copied!';   
    }
})