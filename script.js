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

let evaluatedValue;

let newEntry = true;
numberButtons.forEach(button => {
    button.onclick = () => {
        if (newEntry) {
            entry.textContent = "";
            newEntry = false;
        }

        entry.textContent += button.textContent;
        entryValue = Number(entry.textContent);

        // ensure that there are no uneccesary zeroes by 
        // reassinging entry.textContent with the actual 
        // number in entryValue
        entry.textContent = entryValue;

        console.log(typeof entryValue + ": " + entryValue);
    }
});

decimalButton.onclick = () => {
    if (!entry.textContent.includes(".")) {
        if (entry.textContent === "") {
            entry.textContent += "0.";
        } else {
            entry.textContent += decimalButton.textContent;
        }
        entryValue = Number(entry.textContent);
    }
    console.log(typeof entryValue + ": " + entryValue);
};

addButton.onclick = () => {
    if (equation.textContent === "") {
        equation.textContent = entryValue + " +";
        equationValue = entryValue;
        newEntry = true;
    } else {
        evaluatedValue = equationValue + entryValue;
        equation.textContent = evaluatedValue + " +";
        entry.textContent = evaluatedValue;
        equationValue = evaluatedValue;
        newEntry = true;
    }
};

minusButton.onclick = () => {
    if (equation.textContent === "") {
        equation.textContent = entryValue + " -";
        equationValue = entryValue;
        newEntry = true;
    } else {
        evaluatedValue = equationValue - entryValue;
        equation.textContent = evaluatedValue + " -";
        entry.textContent = evaluatedValue;
        equationValue = evaluatedValue;
        newEntry = true;
    }
};

multiplyButton.onclick = () => {
    if (equation.textContent === "") {
        equation.textContent = entryValue + " ×";
        equationValue = entryValue;
        newEntry = true;
    } else {
        evaluatedValue = equationValue * entryValue;
        equation.textContent = evaluatedValue + " ×";
        entry.textContent = evaluatedValue;
        equationValue = evaluatedValue;
        newEntry = true;
    }
};

divideButton.onclick = () => {
    if (equation.textContent === "") {
        equation.textContent = entryValue + " ÷";
        equationValue = entryValue;
        newEntry = true;
    } else {
        evaluatedValue = equationValue / entryValue;
        equation.textContent = evaluatedValue + " ÷";
        entry.textContent = evaluatedValue;
        equationValue = evaluatedValue;
        newEntry = true;
    }
};

equalsButton.onclick = () => {
    if (equationValue === 0 || equationValue !== 0 && newEntry === true) {
        return;
    } else {
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
        }
        equation.textContent += " " + entryValue + " =";
        entry.textContent = evaluatedValue;
        equationValue = evaluatedValue;
        newEntry = true;
    }

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

