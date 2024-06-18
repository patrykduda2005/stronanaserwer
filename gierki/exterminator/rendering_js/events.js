import { theHexagon, drawFrame } from "./index.js";

let originalMouseX;
let originalMouseY;
let isDrag = false;

canvas.onwheel = zoom;
function zoom(e) {
    e.preventDefault();
    
    let scale = e.deltaY < 1 ?
        1.1 :
        0.9;
    theHexagon.hexagonWidth *= scale;

    //const bounding = canvas.getBoundingClientRect();
    //const convertedX = (e.clientX - bounding.left)/(bounding.right - bounding.left)*canvas.width;
    //const convertedY = (e.clientY - bounding.top)/(bounding.bottom - bounding.top)*canvas.height;
    //theHexagon.coords.x = canvas.width - convertedX - theHexagon.bigHexagonWidth/2;
    //theHexagon.coords.y = canvas.height - convertedY - theHexagon.bigHexagonHeight/2;
    drawFrame();
}

canvas.addEventListener('contextmenu', e => {
    e.preventDefault();
    isDrag = true;
    originalMouseX = e.clientX;
    originalMouseY = e.clientY;
});

window.addEventListener('mouseup', e => {
    if (!isDrag) return;
    isDrag = false;
});

canvas.addEventListener('mousemove', e => {
    if (!isDrag) return;
    theHexagon.coords.x += (e.clientX - originalMouseX);
    theHexagon.coords.y += e.clientY - originalMouseY;
    //console.log(e.clientX - originalMouseX);
    //console.log(e.clientY - originalMouseY);
    originalMouseX = e.clientX;
    originalMouseY = e.clientY;
    drawFrame();
});
