const resultsDiv = document.querySelector('#results-div');
const clearBtn = document.querySelector('#clear-btn');
const userInput = document.querySelector('#user-input');
const checkBtn = document.querySelector('#check-btn');

const validateNumber = function () {
    const number = userInput.value;

    if (number.trim() === '') {
        alert("Please provide a phone number");
        return;
    }

    const cleanedNumber = number.replace(/[()\s+,-]/g, ''); // Remove special char
     
    const isValid = /^(1)?\d{10}$/.test(cleanedNumber) && 
                    !/[^0-9()\s+,-]/.test(number) && 
                    /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(number);

    if (isValid) {
        resultsDiv.innerHTML = `Valid US number: ${number}`;
    } else {
        resultsDiv.innerHTML = `Invalid US number: ${number}`;
    }
};

checkBtn.addEventListener('click', validateNumber);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        validateNumber();
    }
});
clearBtn.addEventListener('click', () => {
    userInput.value = '';
    resultsDiv.innerHTML = '';
});