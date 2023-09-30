// JavaScript for the calculator functionality

let currentInput = '';
let currentOperator = '';
let previousInput = '';
let resultDisplayed = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.value = currentInput;
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.textContent);
    });
});

document.addEventListener('keydown', event => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        handleButtonClick(key);
    } else if (key === 'Enter') {
        handleEqualClick();
    } else if (key === 'Escape') {
        clearCalculator();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
    }
});

function handleButtonClick(buttonText) {
    if (!isNaN(buttonText) || buttonText === '.') {
        if (resultDisplayed) {
            currentInput = '';
            resultDisplayed = false;
        }
        currentInput += buttonText;
        updateDisplay();
    } else if (buttonText === 'C') {
        clearCalculator();
    } else if (['+', '-', '*', '/'].includes(buttonText)) {
        if (currentInput !== '') {
            if (previousInput !== '') {
                handleEqualClick();
            }
            currentOperator = buttonText;
            previousInput = currentInput;
            currentInput = '';
        }
    } else if (buttonText === '=') {
        handleEqualClick();
    }
}

function handleEqualClick() {
    if (previousInput !== '' && currentInput !== '') {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result = 0;

        switch (currentOperator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    alert('Cannot divide by zero');
                    clearCalculator();
                    return;
                }
                break;
        }

        clearCalculator();
        currentInput = result.toString();
        updateDisplay();
        resultDisplayed = true;
    }
}

function clearCalculator() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}
