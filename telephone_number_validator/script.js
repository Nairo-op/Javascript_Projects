const validateNumber = function () {
    const number = document.getElementById('user-input').value;
    const results = document.getElementById('results-div');

    if (!results) {
        console.error("Error: #results-div element is missing!");
        return;
    }

    if (number.trim() === '') {
        alert("Please provide a phone number");
        return;
    }

    const cleanedNumber = number.replace(/[()\s+,-]/g, ''); // Remove special characters

    // Strict regex to check for valid US numbers
    const isValid = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(number);

    results.innerHTML = isValid ? `Valid US number: ${number}` : `Invalid US number: ${number}`;
};

// Ensure elements exist before adding event listeners
const checkBtn = document.getElementById('check-btn');
const userInput = document.getElementById('user-input');
const clearBtn = document.getElementById('clear-btn');

if (checkBtn) {
    checkBtn.addEventListener('click', validateNumber);
}

if (userInput) {
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            validateNumber();
        }
    });
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        userInput.value = '';
        document.getElementById('results-div').innerHTML = '';
    });
}
