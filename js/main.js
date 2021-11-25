main();
let penActive = false;

function main(){
    creatingGrid();
    newGridButton();
    penColoring();
}

function newGridButton(){
    let gridButton = document.querySelector("#gridbutton");
    gridButton.addEventListener("click", e => {
        let gridSize = prompt("What grid-size do you want? (Max 100)");
        if (gridSize <= 100){
            return creatingGrid(gridSize);
        } else {
            alert("You entered a grid-size larger than 100. Please try again");
        }
    })
}

function creatingGrid(squares = 16){
    let gridDiv = document.querySelector(".grid");
    removeAllChildNodes(gridDiv);
    for (let i = 0; i < squares; i++){   
        let row = document.createElement("div");
        row.className="row";
        for (let j = 0; j < squares; j++){
            let column = document.createElement("div");
            column.className="column";
            column.addEventListener("mouseover", penDrawer);
            row.append(column);
        }
        gridDiv.append(row);
    }
}

function penDrawer(e){
    e.target.style.backgroundColor = randomColor();
}



function removeAllChildNodes(parent){
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