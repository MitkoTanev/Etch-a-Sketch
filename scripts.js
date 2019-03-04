let Game = (function() {
    const shadeBlendConvert = function (p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(to&&typeof(to)!="string"))return null; //ErrorCheck
    if(!this.sbcRip)this.sbcRip=(d)=>{
        let l=d.length,RGB={};
        if(l>9){
            d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].split("(")[1]),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
        }else{
            if(l==8||l==6||l<4)return null; //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 or 4 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=-1;
            if(l==9||l==5)RGB[3]=r((RGB[2]/255)*10000)/10000,RGB[2]=RGB[1],RGB[1]=RGB[0],RGB[0]=d>>24&255;
        }
    return RGB;}
    var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=this.sbcRip(from),t=this.sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb"+(f[3]>-1||t[3]>-1?"a(":"(")+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+r((t[0]-f[0])*p+f[0])*0x1000000+r((t[1]-f[1])*p+f[1])*0x10000+r((t[2]-f[2])*p+f[2])*0x100+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)).toString(16).slice(1,f[3]>-1||t[3]>-1?undefined:-2);
}
let createGrid = function (count) {
    for(let i = 1; i <= count * count; i++) {
        let div = document.createElement("div");
        div.className = "cell";
        let width = 500 / count - 2;
        let height = 500/ count - 2;
        div.style.width = "" + width + "px";
        div.style.height ="" + height + "px";;
        container.appendChild(div);
        div.style.backgroundColor = "#f0f0f0";
        
        }
    draw();
}

let draw = function() {
    const cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(function(el, index) {
        let percent = -0.1; 
        el.addEventListener("mouseover", function(event) {
            if (percent > -0.99) {
                console.log('PERCENT: ' + percent);
                percent -= 0.1;
            }
            let color = pallete.value;
            if(el.style.backgroundColor !== color) {
                el.style.backgroundColor =  shadeBlendConvert(percent, color);
                el.style.border = "1px solid " + shadeBlendConvert(percent, color);
                } else {
                el.style.backgroundColor =  "" + color;
                
            }    
        });
    });
}

let deleteGrid = function () {
    let cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(function(el) {
        el.remove();
    });
}
let clearGrid = function () {
    const cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(function(el) {
        let color = "#f0f0f0";
        el.style.backgroundColor =  color;
        el.style.borderColor = "#d4cfcf";    
    });
    draw();           
}
let eraser = function () {
    const cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(function(el, index) {
    el.addEventListener("mouseover", function(event) {
        let color = "#f0f0f0";
        el.style.backgroundColor =  color;
        el.style.borderColor = "#d4cfcf";  
    });
});
};
let container = document.querySelector(".container");
let pallete = document.getElementById("color");
pallete.value = "#b3b3b3";
pallete.addEventListener("click", function(event) {
    draw();
}); 
let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    clearGrid();

})
let newGridBtn = document.getElementById("new-grid");
newGridBtn.addEventListener("click", function(event){
    event.preventDefault();
    let grid = document.querySelector(".cell");
    do {
    var count = +prompt("Please enter a new grid size(from 2 to 100)");
    } while(count < 1 || count > 100);
    if (grid !== null) {
        deleteGrid();
        createGrid(count);
    } else {
        createGrid(count);
    }    
});
let eraserBtn = document.getElementById("eraser");
eraserBtn.addEventListener("click", function(event) {
    event.preventDefault();
    eraser();
});
})();







