import { HexagonDraw } from './hexagondraw.js';
import { ctx } from './hexagondraw.js';

function convertToReal({fakeX, fakeY}) {
    return {
        x: (fakeX - bounding.left)/(bounding.right - bounding.left)*canvas.width,
        y: (fakeY - bounding.top)/(bounding.bottom - bounding.top)*canvas.height
    }
}

export const theHexagon = await new HexagonDraw();

function drawCrosshair() {
    ctx.strokeStyle = "violet";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
} drawCrosshair();

export function drawFrame() {
    theHexagon.assets.updateWasmArray();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    theHexagon.updateParameters();
    theHexagon.draw();
}

const renderLoop = async () => {
    drawFrame();
    drawCrosshair();
    await new Promise(r => setTimeout(r, 250));
    requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
