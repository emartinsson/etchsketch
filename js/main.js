main();
let color = "black";
let penActive = false;

function main(){
    newGrid();
    buttonListeners();
    updateSlider();
    penToggler();
}

function penToggler(){
    let gridDiv = document.querySelector(".grid");
    gridDiv.addEventListener("click", () => {
        if (!penActive){
            penActive = true;
            eventToggler(penActive);
        } else {
            penActive = false;
            eventToggler(penActive);
        }
    })
}

function eventToggler(){
    let allColumns = document.querySelectorAll(".column");
    if (penActive){
        allColumns.forEach(column => column.addEventListener("mouseover", penColor));
    } else{
        allColumns.forEach(column => column.removeEventListener("mouseover", penColor));
    }
}




function buttonListeners(){
    let buttons= document.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener("click", eventSelection))
}

function eventSelection(e){
    switch (e.target.id){
        case "blackButton":
            color="black";
            break;
        case "rgbButton":
            color="rgb"
            break;
        case "grayButton":
            color="grayScale"
            break;
        case "cleargridbutton":
            clearGrid();
            break;
        case "eraseButton":
            color="eraser"
            break;
    }
    let penActive = false;
}


function newGrid(squares = 16){
    let gridDiv = document.querySelector(".grid");
    for (let i = 0; i < squares; i++){   
        let row = document.createElement("div");
        row.className="row";
        for (let j = 0; j < squares; j++){
            let column = document.createElement("div");
            column.className="column";
            row.append(column);
        }
        gridDiv.append(row);
    }
}

function penColor(e){
    switch(color){
        case "black":
            e.target.style.backgroundColor=dark();
            break;
        case "rgb":
            e.target.style.backgroundColor=randomColor();
            break;
        case "grayScale":
            e.target.style.backgroundColor=darker(e.target.style.backgroundColor);
            break;
        case "eraser":
            e.target.style.backgroundColor=eraser();
    }
}

function clearGrid(){
    let allColumns = document.querySelectorAll(".column");
    allColumns.forEach(column => column.style.backgroundColor="rgb(255, 255, 255)");
}


function removeGrid(){
    let parent = document.querySelector(".grid");
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function randomColor(){
    let randomColorBox = [];
    for (let i = 0; i < 3; i++){
        randomColorBox.push(Math.floor(Math.random()*255+1));
    }
    let randomColor = `rgb(${randomColorBox.join(", ")})`;

    return randomColor;
}

function darker(currentColor){
    if (!currentColor){
        currentColor = `rgb(${255}, ${255}, ${255})`;
    }
    const rgb = currentColor.slice(4,-1);
    const rgbColorBox = rgb.split(", ");
    const shadingLevels = 5;
    const shadingIncrement = 255/shadingLevels;
    let r = rgbColorBox[0] - shadingIncrement;
    let g = rgbColorBox[1] - shadingIncrement;
    let b = rgbColorBox[2] - shadingIncrement;
    currentColor = `rgb(${r}, ${g}, ${b})`;

    return currentColor;
}

function dark(){
    return `rgb(${0}, ${0}, ${0})`;
}

function eraser(){
    return `rgb(${255}, ${255}, ${255})`;
}


function updateSlider(){
    let slider = document.getElementById("gridSizeSlider");
    let output = document.getElementById("gridSizeSliderV");
    output.innerHTML = `Grid-size: ${slider.value} x ${slider.value} `;
    slider.addEventListener("change", () => {
        let value = slider.value;
        removeGrid();
        newGrid(value);
        output.innerHTML = `Grid-size: ${value} x ${value} `;
    })
    
    
    

}

