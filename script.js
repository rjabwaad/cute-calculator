let total = 0;
let buffer = '0';
let previousOperator = null;
const screen = document.querySelector('.display');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = '0';
            total = 0;
            previousOperator = null;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = '' + total;
            total = 0;
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    if (buffer === '0') {
        return;
    }
    const floatBuffer = parseFloat(buffer);
    if (total === 0) {
        total = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        total += floatBuffer;
    } else if (previousOperator === '−') {
        total -= floatBuffer;
    } else if (previousOperator === '×') {
        total *= floatBuffer;
    } else if (previousOperator === '÷') {
        if (floatBuffer === 0) {
            alert('Cannot divide by zero!');
            return;
        }
        total /= floatBuffer;
    }
}

function init() {
    document.querySelector('.buttons')
        .addEventListener('click', function(event) {
            if (event.target.classList.contains('btn')) {
                buttonClick(event.target.innerText);
            }
        });
}

init();