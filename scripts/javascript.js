let divContainer
let rowCount= 16;
let columnCount = 16;

if (document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", generateGrid)
} else {
    generateGrid();
}

function assignColorClass(element) {
    element.className += ` dark`
}

function generateGrid () {
    divContainer = document.querySelector(".div-container");
    console.log("generating")
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < columnCount; x++) {
            let newDiv = document.createElement("div");
            newDiv.className = `div ${y}x${x}`
            newDiv.addEventListener("mouseover", () => {
                assignColorClass(newDiv)
            })
            divContainer.appendChild(newDiv);
        }
    }
    console.log(divContainer.childElementCount)
}


