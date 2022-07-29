//constants
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearDisplay = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const history = document.querySelector('.previous_operation');
const display = document.querySelector('.current_operation');

const keyboardInputs = {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',  '.'],
    operators: ['-', '+', '=', '/', '*', '%'],
}


// Declares variables
let value1, value2, result, displayValue;
let operator = '';

// operation functions:
const add = (a, b) => {result = a + b};
const subtract = (a, b) => {result = a - b};
const multiply = (a, b) => {result = a * b};
const divide = (a, b) => {result = a / b};

const operate = (n1, op, n2) => {
    switch(op){
        case '+':
            add(n1, n2);
            break;
        case '-':
            subtract(n1, n2);
            break;
        case '*':
            multiply(n1, n2);
            break;
        case '/':
            divide(n1, n2);
            break;
    }
};

// reset the calculator
const clear = () => {
    value1 = undefined;
    value2 = undefined;
    result = undefined;
    displayValue = undefined;
    operator = '';
    history.textContent = "";
    display.textContent = "";
}
clearDisplay.addEventListener('click',clear);

// refresh display screen
const displayRefresh = () => {
    if(operator !== '' && (value2 !== 0 && value2 !== undefined)) {
        display.textContent = `${value1} ${operator} ${value2}`;
        return
    }
    if(operator !== '' && (value2 == 0 || value2 == undefined)) {
        display.textContent = `${value1} ${operator} `;
        return
    }
    display.textContent = `${value1}`;
};

// Check if theres already a dot "." on the value to prevent multiple dots
const dotChecker = (value) => {
    value = String(value);
    for(i = 0; i <= value.length; i++){
        if(value.charAt(i) == '.'){
            value = Number(value);
            return true
        }
    } 
    value = Number(value);
    return false
};


// Delete event handler
deleteButton.addEventListener('mouseup', e => {
    backspaceEventHandler();
});

const backspaceEventHandler = () => {
    if(display.textContent == '0'){
        clear();
        return;
    }
    if(String(value2) == ''){
        value2 = undefined;
        displayRefresh();
        return;
    }
    if((value2 !== 0 && value2 !== undefined && value2 !== '')){
        value2 = String(value2);
        value2 = value2.slice(0, -1);
        value2 = Number(value2);
        displayRefresh();
        return;
    }
    if(operator !== ''){
        operator = '';
        displayRefresh();
        return;
    }
    if(String(value1) == ''){
        value1 = undefined;
        displayRefresh();
        return;
    }
    if((value1 !== 0 && value1 !== undefined && value1 !== '')){
        value1 = String(value1);
        value1 = value1.slice(0, -1);
        value1 = Number(value1);
        displayRefresh();
        return;
    }
}

// Operation buttons event handler
operators.forEach(button => button.addEventListener('mouseup', e =>{
    opEventHandler(button.value);
}));

const opEventHandler = (value) => {
    if(keyboardInputs.operators.indexOf(value) == -1) return;
    if((value1 !== 0 && value1 !== undefined && value1 !== '') && operator !== '' && (value2 !== 0 && value2 !== undefined && value2 !== '')){
        equalEventHandler(); 
    }
    if((displayValue !== undefined && displayValue !== '' && displayValue !== 0) && (value1 === undefined || value1 === '' || value1 === 0)){
        value1 = displayValue;
    }
    if(display.textContent === 0 || display.textContent === '0' || display.textContent === `=  0`){
        value1 = 0;
    }
    operator = value;
    displayRefresh();
    return;
}


// Numeric buttons event handler
numbers.forEach(button => button.addEventListener('mouseup', e =>{
    numbersEventHandler(button.value);
}));
const numbersEventHandler = (value) => {
    if(keyboardInputs.numbers.indexOf(value) == -1) return;
    if(value == '.' && operator == '' && (value1 == 0 || value1 == undefined)){
        value1 = `0${value}`;
        displayRefresh();
        return;
    }
    if(value == '.' && operator == '' && (value1 !== 0 || value1 !== undefined)){
        if(dotChecker(value1) == true) {return};
        value1 = `${value1}${value}`;
        displayRefresh();
        return;
    }
    if(value == '.' && operator !== '' && (value2 == 0 || value2 == undefined)){
        value2 = `0${value}`;
        displayRefresh();
        return;
    }
    if(value == '.' && operator !== '' && (value2 !== 0 || value2 !== undefined)){
        if(dotChecker(value2) == true) {return};

        value2 = `${value2}${value}`;
        displayRefresh();
        return;
    }
    if(value1 === `${0.}`){
        value1 = Number(`${value1}${value}`);
        displayRefresh();
        return;
    }
    if((value1 === 0 || value1 === undefined) && operator === ''){
        value1 = value;
        displayRefresh();
        return;
    }
    if((value1 !== 0 || value1 !== undefined) && operator === ''){
        value1 = `${value1}${value}`;
        displayRefresh();
        return;
    }
    if(value2 === `${0.}`){
        value2 = Number(`${0.}${value}`);
        displayRefresh();
        return;
    }
    if((value1 !== 0 || value1 !== undefined) && operator !== '' && (value2 === 0 || value2 === undefined)){
        if(value == 0){return};
        value2 = value;
        displayRefresh();
        return;
    }
    if((value1 !== 0 || value1 !== undefined) && operator !== '' && (value2 !== 0 && value2 !== undefined)){
        value2 = `${value2}${value}`;
        displayRefresh();
        return;
    } 
}


// Equal event handler
equalsButton.addEventListener('mouseup', e => equalEventHandler());
const equalEventHandler = () => {  
    if((value1 !== 0 && value1 !== undefined) && (value2 !== 0 && value2 !== undefined) && operator !== ''){
        operate(Number(value1), operator, Number(value2));
        if(dotChecker(result) == true){
            result = Math.floor(result * 100) / 100;
            result = result.toFixed(2)

            if(String(result).charAt(-1) == 0){
                result = String(result);
                while(result.charAt(-1) == '0'){
                    result = result.slice(0, -1);
                };
                result = Number(result);
            };
        }
        display.textContent = `=  ${result}`;
        history.textContent = `${value1} ${operator} ${value2}`;
        displayValue = result;
    };
    if((value1 !== 0 && value1 !== undefined) && operator !== '' && (value2 === 0 || value2 === undefined)){
        display.textContent = `=  ${value1}`;
        history.textContent = `${value1} ${operator}`;
    };
    if((value1 !== 0 && value1 !== undefined) && operator === '' && (value2 === 0 || value2 === undefined)){
        display.textContent = `=  ${value1}`;
        history.textContent = `${value1}`;
    };
    if((value1 === 0 || value1 === undefined) && operator !== '' && (value2 === 0 || value2 === undefined)){
        display.textContent = `=  0`;
        history.textContent = `0 ${operator}`;
    };
    value1 = undefined;
    value2 = undefined;
    result = undefined;
    operator = '';
}


// Keyboard event handler
document.addEventListener('keydown', keyboardHandleKeydown);
function keyboardHandleKeydown (e){
    const keyPressed = e.key;
    if(keyboardInputs.numbers.indexOf(keyPressed) !== -1){
        numbersEventHandler(keyPressed);
    }
    if(keyboardInputs.operators.indexOf(keyPressed) !== -1){
       opEventHandler(keyPressed); 
    }
    if(keyPressed == 'Backspace'){
        backspaceEventHandler(keyPressed);
    }
    if(keyPressed == '=' || keyPressed == 'Enter'){
       equalEventHandler(keyPressed);  
    }
    if(keyPressed == 'Delete'){
        clear();
    } 
}