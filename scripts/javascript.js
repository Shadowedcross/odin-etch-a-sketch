let divContainer
let cellCountButton
let cellsPerSide = 16;

if (document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", initialize)

} else {
    initialize()
}

function initialize() {
    setupCellCountButton()
    generateGrid();
}

function setupCellCountButton() {
    cellCountButton = document.querySelector(".cell-count-button")
    cellCountButton.addEventListener("click", changeCellsPerSide)
}

function generateGrid () {
    divContainer = document.querySelector(".div-container");
    if (divContainer.hasChildNodes) {
        divContainer.replaceChildren();
    }
    for (let y = 0; y < cellsPerSide; y++) {
        for (let x = 0; x < cellsPerSide; x++) {
            let newDiv = document.createElement("div");
            newDiv.className = `div ${y}x${x}`
            newDiv.style.flexBasis = `${100 / cellsPerSide}%`
            newDiv.addEventListener("mouseover", () => {
                assignColorClass(newDiv)
            })
            divContainer.appendChild(newDiv);
        }
    }
}

function assignColorClass(element) {
    element.className += ` dark`
}

function changeCellsPerSide() {
    let value = validateUserInput(8, 100)

    if (value) {
        cellsPerSide = value
        resetGrid()
    } else {
    }
}

function validateUserInput(minValue, maxValue) {
    let isInputValid = false;
    while (!isInputValid) {
        let error = false
        let value = prompt("How many squares per side? (8-100):")
        if (value === null || value === '') {
            value = null;
            break;
        }
        if (Number.isInteger(+value)) {
            value = +value;
            if (checkIfFloat(value) || (value < minValue || value > maxValue)) {
                error = true
            }
        } else {
            error = true
        }
        if (error) {
            alert("You entered an invalid value. Must be an integer between 8 and 100.")
            continue
        }
        console.log(`Finish, value: ${value}`)
        return value
    }
}

function checkIfFloat(value) {
    return (Math.floor(value) !== value)
}

function resetGrid() {
    generateGrid()
}






