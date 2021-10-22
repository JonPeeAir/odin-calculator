const equation = document.querySelector(".equation");
const entry = document.querySelector(".entry");
const deleteButton = document.getElementById("delete");
const clearEntryButton = document.getElementById("clear-entry");
const allClearButton = document.getElementById("all-clear");
const numberButtons = Array.from(document.getElementsByClassName("number"));
const operatorButtons = Array.from(document.getElementsByClassName("operator"));


numberButtons.forEach(button => {
    button.onclick = () => {
        entry.textContent += button.textContent;
    }
});


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