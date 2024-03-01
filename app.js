const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const specialCharacters = '!"@#$%^&*()-_+=[]{};:\'\,./<>?';
const allChars = lowercaseLetters + uppercaseLetters + numbers + specialCharacters;
// initializing dom elements
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
            let finalPassword = '';
            // Ensure at least one character from each category:
            finalPassword += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
            finalPassword += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
            finalPassword += numbers[Math.floor(Math.random() * 10)];
            finalPassword += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

            // Fill remaining characters randomly:
            while (finalPassword.length < passLength) {
                finalPassword += allChars[Math.floor(Math.random() * allChars.length)];
            }

            // displaying the password 
            passwordBox.value = finalPassword;
            
            // displaying password strength
            if (passLength >= 8 && passLength < 20) {
                description.innerHTML = 'Password Strength: Medium';
            }
            else if (passLength > 20 && passLength < 100) {
                description.innerHTML = 'Password Strength: Strong';
            }
            else if (passLength >= 100 && passLength < 200) {
                description.innerHTML = 'Relax dude no one can crack this.'
            }
            else if (passLength >= 200 && passLength < 300) {
                description.innerHTML = 'How will you remember this?'
            }
            else if (passLength >= 300 && passLength < 400) {
                description.innerHTML = 'The one who cracks this is a crackhead.'
            }
            else if (passLength >= 400 && passLength <= 500) {
                description.innerHTML = 'Bro you work for FBI?'
            }
        }
        // running this function.
        generatingPassword();
    }
}
generatePass.addEventListener('click', generatePassword);
passwordLength.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        generatePassword();
    }
})
document.addEventListener('keydown', (e) => {
    // ' ' represents space bar in some browsers
    if (e.key === ' ' || e.key === 'Spacebar') {
        generatePassword();
    }
});
copy.addEventListener('click', () => {
    if (passwordBox.value === '') {
        description.innerHTML = 'Nothing to copy!';
    }
    else {
        navigator.clipboard.writeText(passwordBox.value);
        description.innerHTML = 'Password Copied!';
    }
})