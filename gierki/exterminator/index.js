import wasmInit from './rust/pkg/extermination.js'

const canvas = document.querySelector("canvas#canvas");
const ctx = canvas.getContext('2d');

class AssetsWalker {
    index = 0;
    wasmArray;
    loadedAssets;

    constructor() {
        
    }

    next() {
        this.index++;
        //return this.loadedAssets[this.index-1];
    }

    reset() {
        this.index = 0;
    }
}

class HexagonDraw {
    hexagonHeight;
    hexagonWidth = 20;
    hexagonXCount;
    tileIndex = 0;
    assets;
    coords;

    constructor(hexagonXCount) {
        this.hexagonXCount = hexagonXCount;
        this.updateParameters();
        this.assets = new AssetsWalker();
        this.coords = this.getCenteredCoords();
    }

    updateParameters() {
        this.hexagonHeight = this.hexagonWidth/1.73205080757*2;
    }

    drawHexagon(x, y) {
        let texture = this.assets.next();
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + (this.hexagonWidth/2), y);
        ctx.lineTo(x + this.hexagonWidth, y + (this.hexagonHeight/4));
        ctx.lineTo(x + this.hexagonWidth, y + (this.hexagonHeight*3/4));
        ctx.lineTo(x + (this.hexagonWidth/2), y + (this.hexagonHeight));
        ctx.lineTo(x, y + (this.hexagonHeight*3/4));
        ctx.lineTo(x, y + (this.hexagonHeight/4));
        ctx.lineTo(x + (this.hexagonWidth/2), y);
        ctx.fill();
        ctx.stroke();
    }

    drawHexagonRow(y, x, count) {
        count = Math.floor(count);
        for (let i = 0; i < count; i++) {
            this.drawHexagon(x, y);
            x += this.hexagonWidth;
        }
    }

    getCenteredCoords() {
        const bigHexagonHeight = (this.hexagonXCount * this.hexagonHeight*3/4) + this.hexagonHeight;
        return {
            x: (canvas.width - this.hexagonWidth*this.hexagonXCount) / 2,
            y: (canvas.height - bigHexagonHeight)/2,
        }
    }

    draw({x, y} = this.coords) {
        this.assets.reset();
        x += this.hexagonWidth*this.hexagonXCount/4;
        let growDirection = 1;
        for (let count = this.hexagonXCount/2; count >= this.hexagonXCount/2; count += growDirection) {
            this.drawHexagonRow(y, x, count);
            if (count >= this.hexagonXCount) growDirection*=-1;
            y += this.hexagonHeight * 3/4;
            x -= this.hexagonWidth/2*growDirection;
        }
    }
}


let theHexagon = new HexagonDraw(50);
theHexagon.draw();

canvas.onwheel = zoom;
function zoom(e) {
    e.preventDefault();
    
    let scale = e.deltaY < 1 ?
        1.1 :
        0.9;
    theHexagon.hexagonWidth *= scale;
    drawFrame();
}

let originalMouseX;
let originalMouseY;
let isDrag = false;

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

function drawCrosshair() {
    ctx.strokeStyle = "violet";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
} drawCrosshair();

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    theHexagon.updateParameters();
    theHexagon.draw();
}

const rustWasm = await wasmInit("./rust/pkg/extermination_bg.wasm");
const renderLoop = async () => {
    drawFrame();
    await new Promise(r => setTimeout(r, 250));
    requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
