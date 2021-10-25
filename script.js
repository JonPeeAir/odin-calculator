const equation = document.querySelector(".equation");
const entry = document.querySelector(".entry");
const deleteButton = document.getElementById("delete");
const clearEntryButton = document.getElementById("clear-entry");
const allClearButton = document.getElementById("all-clear");
const numberButtons = Array.from(document.getElementsByClassName("number"));
const decimalButton = document.getElementById("decimal");
const addButton = document.getElementById("add");
const minusButton = document.getElementById("minus");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("equals");

let equationValue = 0;
let entryValue = 0;
let evaluatedValue = 0;
let newEntry = true;

deleteButton.onclick = deleteFromEntry;
clearEntryButton.onclick = clearEntry;
allClearButton.onclick = allClear;
numberButtons.forEach(number => number.addEventListener("click", () => {
    addNumberToEquation(number.textContent)
}));
decimalButton.onclick = addDecimalToEquation;
addButton.onclick = addEquation;
minusButton.onclick = subtractEquation;
multiplyButton.onclick = multiplyEquation;
divideButton.onclick = divideEquation;
equalsButton.onclick = performEquation;

// Keyboard support
document.addEventListener("keydown", event => {
    if (["Backspace", "Delete"].includes(event.code) && event.ctrlKey && event.altKey) {
        allClear();
    } else if (["Backspace", "Delete"].includes(event.code) && event.ctrlKey) {
        clearEntry();
    } else if (["Backspace", "Delete"].includes(event.code)) {
        deleteFromEntry();
    } else if (event.code === "Period") {
        addDecimalToEquation();
    } else if (event.key === "+") {
        addEquation();
    } else if (event.key === "-") {
        subtractEquation();
    } else if (event.key === "*") {
        multiplyEquation();
    } else if (event.key === "/") {
        divideEquation();
    } else if (event.code.slice(0, -1) === "Digit") {
        addNumberToEquation(event.key);
    } else if (["Enter", "Equal"].includes(event.code)) {
        performEquation();
    }
});

function deleteFromEntry() {
    entry.textContent = entry.textContent.slice(0, entry.textContent.length - 1);
    if (entry.textContent === "") {
        entry.textContent = "0";
    }
    entryValue = Number(entry.textContent);
}

function clearEntry() {
    entryValue = 0;
    entry.textContent = entryValue;
}

function allClear() {
    entryValue = 0;
    equationValue = 0;
    evaluatedValue = 0;
    newEntry = true;
    equation.textContent = "";
    entry.textContent = entryValue;
}

function addNumberToEquation(number) {
    if (newEntry) {
        entryValue = 0;
        entry.textContent = "";
        newEntry = false;
    }
    if (entry.textContent.length < 11) {
        entry.textContent += number;
        entryValue = Number(entry.textContent);
        // ensure that entry.textContext display no uneccesary zeroes
        entry.textContent = entryValue;
    }
}

function addDecimalToEquation() {
    if (!entry.textContent.includes(".") && entry.textContent.length < 10) {
        if (entry.textContent === "") {
            entry.textContent += "0.";
        } else {
            entry.textContent += decimalButton.textContent;
        }
        entryValue = Number(entry.textContent);
        newEntry = false;
    }
}

function addEquation() {
    if (newEntry && equation.textContent.slice(-1) !== "=") {
        return;
    }
    
    if (equation.textContent === "") {
        equation.textContent = entryValue + " +";
        equationValue = entryValue;
        entryValue = 0;
        entry.textContent = entryValue;
        newEntry = true;
    } else {
        operate();
        equation.textContent = evaluatedValue + " +";
        entryValue = 0;
        entry.textContent = entryValue;
    }
}

function subtractEquation() {
    if (newEntry && equation.textContent.slice(-1) !== "=") {
        return;
    } else if (equation.textContent === "") {
        equation.textContent = entryValue + " -";
        equationValue = entryValue;
        entryValue = 0;
        entry.textContent = entryValue;
        newEntry = true;
    } else {
        operate();
        equation.textContent = evaluatedValue + " -";
        entryValue = 0;
        entry.textContent = entryValue;
    }
}

function multiplyEquation() {
    if (newEntry && equation.textContent.slice(-1) !== "=") {
        return;
    } else if (equation.textContent === "") {
        equation.textContent = entryValue + " ×";
        equationValue = entryValue;
        entryValue = 0;
        entry.textContent = entryValue;
        newEntry = true;
    } else {
        operate();
        equation.textContent = evaluatedValue + " ×";
        entryValue = 0;
        entry.textContent = entryValue;
    }
}

function divideEquation() {
    if (newEntry && equation.textContent.slice(-1) !== "=") {
        return;
    } else if (equation.textContent === "") {
        equation.textContent = entryValue + " ÷";
        equationValue = entryValue;
        entryValue = 0;
        entry.textContent = entryValue;
        newEntry = true;
    } else {
        operate();
        equation.textContent = evaluatedValue + " ÷";
        entryValue = 0;
        entry.textContent = entryValue;
    }
}

function performEquation() {
    if (newEntry || newEntry && entryValue === 0) {
        console.log("entryValue: " + entryValue + "; Type: " + typeof entryValue);
        return;
    } else {
        operate();
        equation.textContent += " " + entryValue + " =";
        entryValue = evaluatedValue.toString().length > 10 ? "cannot store value" : evaluatedValue;
        entry.textContent = entryValue;
    }
}

function operate(operation) {
    switch(equation.textContent.slice(-1)) {
        case addButton.textContent:
            evaluatedValue = add(equationValue, entryValue);
            break;
        case minusButton.textContent:
            evaluatedValue = subtract(equationValue, entryValue);
            break;
        case multiplyButton.textContent:
            evaluatedValue = multiply(equationValue, entryValue);
            break;
        case divideButton.textContent:
            evaluatedValue = divide(equationValue, entryValue)
            break;
        default:
            // Use the evaluated value as entry value
    }

    evaluatedValue = ensure_max_of_ten_characters(evaluatedValue);

    equationValue = evaluatedValue;
    newEntry = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function ensure_max_of_ten_characters(num) {
    let newNum = 0;
    if (num.toString().length > 10) {
        newNum = num.toExponential(3);
        if (newNum.toString().length > 10) {
            newNum = NaN;
        }
        return newNum;
    } 
    return num;
}
