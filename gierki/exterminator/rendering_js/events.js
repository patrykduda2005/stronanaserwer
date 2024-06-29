import { drawFrame } from "./index.js";
import { wasmManager } from "./wasmManager.js";

let originalMouseX;
let originalMouseY;
let isDrag = false;

function convertViewport({x, y}) {
    const bounding = canvas.getBoundingClientRect();
    const convertedX = (x - bounding.left)/(bounding.right - bounding.left)*canvas.width;
    const convertedY = (y - bounding.top)/(bounding.bottom - bounding.top)*canvas.height;
    return {x: convertedX, y: convertedY};
}

canvas.onwheel = zoom;
function zoom(e) {
    e.preventDefault();
    
    let scale = e.deltaY < 1 ?
        1.1 :
        0.9;
    wasmManager.scaleMap(scale);

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
    wasmManager.move_map(
        e.clientX - originalMouseX,
        e.clientY - originalMouseY,
    );
    originalMouseX = e.clientX;
    originalMouseY = e.clientY;
    drawFrame();
});

canvas.addEventListener('click', e =>  {
    const mouseCoords = convertViewport({x: e.clientX, y: e.clientY});
    console.log(mouseCoords);
    wasmManager.clickEvent(mouseCoords);
});
