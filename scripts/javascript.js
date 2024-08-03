let divContainer;
let cellCountButton;
let displayModeButton;
let cellsPerSide = 16;
let rgbMode = true;

const CHANGE_TO_GREYSCALE_TEXT = "Change to Greyscale";
const CHANGE_TO_RGB_TEXT = "Change to RGB";

if (document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", initialize);

} else {
    initialize();
}

function initialize() {
    setupButtons();
    generateGrid();
}

function setupButtons() {
    cellCountButton = document.querySelector(".cell-count-button");
    cellCountButton.addEventListener("click", changeCellsPerSide);
    displayModeButton = document.querySelector(".display-mode-button");
    displayModeButton.addEventListener("click", changeDisplayMode);
}

function changeDisplayMode() {
    rgbMode = !rgbMode;
    displayModeButton.textContent = rgbMode ? CHANGE_TO_GREYSCALE_TEXT : CHANGE_TO_RGB_TEXT;
    resetGrid();
}

function generateGrid () {
    divContainer = document.querySelector(".div-container");
    if (divContainer.hasChildNodes) {
        divContainer.replaceChildren();
    }
    for (let y = 0; y < cellsPerSide; y++) {
        for (let x = 0; x < cellsPerSide; x++) {
            let newDiv = document.createElement("div");
            newDiv.className = `div ${y}x${x}`;
            newDiv.style.flexBasis = `${100 / cellsPerSide}%`;
            newDiv.addEventListener("mouseover", () => {
                updateDivClasses(newDiv);
            })
            divContainer.appendChild(newDiv);
        }
    }
}

function updateDivClasses(element){
    if (rgbMode) {
        let rgbArray = getRandomRgbArray();
        element.style.backgroundColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
    } else {
        if (element.style.backgroundColor !== "black") {
            element.style.backgroundColor = "black";
        }
    }
    if (element.style.opacity < +"1.0") {
        element.style.opacity = `${+element.style.opacity + .10}`;
    }
}

function getRandomRgbArray() {
    let colourArray = [];
    for (let i = 0; i < 3; i++) {
        colourArray.push(getRandomInt(0, 255));
    }
    return colourArray;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function changeCellsPerSide() {
    let value = validateUserInput(8, 100);
    if (value) {
        cellsPerSide = value;
        resetGrid();
    }
}

function validateUserInput(minValue, maxValue) {
    let isInputValid = false;
    let value;
    while (!isInputValid) {
        let error = false;
        value = prompt("How many squares per side? (8-100):");
        if (value === null || value === '') {
            value = null;
            break;
        }
        if (Number.isInteger(+value)) {
            value = +value;
            if (checkIfFloat(value) || (value < minValue || value > maxValue)) {
                error = true;
            }
        } else {
            error = true;
        }
        if (error) {
            alert("You entered an invalid value. Must be an integer between 8 and 100.");
            continue;
        }
        isInputValid = true;
    }
    return value;
}

function checkIfFloat(value) {
    return (Math.floor(value) !== value);
}

function resetGrid() {
    generateGrid();
}






