let Game = (function() {
    //creating the 16x16 grid 

let container = document.querySelector(".container");
function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}
let createGrid = function (count) {
    for(let i = 1; i <= count * count; i++) {
        let div = document.createElement("div");
        div.className = "cell";
        let width = 400 / count - 2;
        let height = 400 / count - 2;
        div.style.width = "" + width + "px";
        div.style.height ="" + height + "px";;
        container.appendChild(div);
        }
    const cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(function(el, index) {
        el.addEventListener("mouseover", function(event) {
            let percent = 10;
            percent+=10;
            let color = "rgb(179, 175, 175)";
            el.style.backgroundColor = "black"

            });
    });
}
//remove cells 
let clearGrid = function () {
    let cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(function(el) {
        el.remove();
    });
}
return {
    createGrid: createGrid,
    clearGrid: clearGrid
}

})();

let btn = document.getElementById("new-grid");
btn.addEventListener("click", function(event){
    event.preventDefault();
    let grid = document.querySelector(".cell");
    do {
    var count = +prompt("Please enter a new grid size(from 2 to 100)");
    } while(count < 1 || count > 100);
    if (grid !== null) {
        Game.clearGrid();
        Game.createGrid(count);
    } else {
        Game.createGrid(count);
    }    
})