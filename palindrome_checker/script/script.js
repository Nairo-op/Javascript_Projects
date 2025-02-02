
function checkPalindrome() {
  const input = document.querySelector('#text-input').value;
  if (input === '') {
    alert('Please input a value');
    return;
  }
   const cleanedInput = input.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const output = document.querySelector('#result');
    const result = isPalindrome(cleanedInput);
    output.innerHTML = result ? `${input} is a Palindrome` : `${input} is not a Palindrome`;
}

function isPalindrome(input) {
  if (input.length <= 1) {
    return true;
  }
  if (input[0] !== input[input.length - 1]) {
    return false;
  }
  return isPalindrome(input.slice(1, -1));
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    checkPalindrome();
  }
});
document.querySelector('#check-btn').addEventListener('click', checkPalindrome);