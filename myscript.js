// Basic operations :
function add(a,b){
    return a+b;
}

function substract(a,b){
    return a-b;
}

function multiply(a,b){
    let result = Number((a*b).toFixed(2));
    return result;
}

function divide(a,b){
    if(b == 0) return 'ERROR!';
    let result = Number((a/b).toFixed(2));
    return result;
}

function power(a,b){
    let result = Math.pow(a,b);
    return Number(result.toFixed(2));
}

function operate(operator,a,b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "x":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        case "²":
            return power(a,b);
        default:
            return null;      
    }
}