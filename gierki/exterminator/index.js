import wasmInit from './rust/pkg/extermination.js'

const canvas = document.querySelector("canvas#canvas");
const ctx = canvas.getContext('2d');

//import rustWasm
class AssetsWalker {
    index = 0;
    wasmArray;
    loadedAssets;
    colors;

    constructor() {
        return (async () => {
            this.updateWasmArray();
            console.log(this.wasmArray);
            this.loadedAssets = [
                await this.loadSprites("./trawa.png", 1, 34, 43, 31, 29),
            ];
            this.colors = [
                'red',
                'green',
                'blue',
            ];
            return this;
        })();
    }

    loadSprites(url, amount, sizeX, sizeY, offsetX = 0, offsetY = 0) {
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.onload = () => {
                const widthperone = sizeX;
                let promises = [];
                for (let i = 0; i < amount; i++) {
                    promises[i] = createImageBitmap(image, i * widthperone + offsetX, 0 + offsetY, widthperone, sizeY);
                }
                Promise.all(promises).then(sprites => {
                        resolve(sprites);
                })
            }
            image.onerror = () => reject();
            image.src = url;
        })
    }

    next() {
        this.index+=3;
    }

    getTexture() {
        return this.loadedAssets[this.wasmArray[this.index]][this.wasmArray[this.index+1]];
    }

    getColor() {
        return this.colors[this.wasmArray[this.index+2]];
    }

    updateWasmArray() {
        //tickAnimation();
        this.wasmArray = new Uint8Array(rustWasm.memory.buffer, outputPointer, 3 * 1900);
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
    bigHexagonWidth;
    bigHexagonHeight;
    assets;
    coords;

    constructor(hexagonXCount) {
        return (async () => {
            this.hexagonXCount = hexagonXCount;
            this.updateParameters();
            this.assets = await new AssetsWalker();
            this.coords = this.getCenteredCoords();
            return this;
        })();
    }

    updateParameters() {
        this.hexagonHeight = this.hexagonWidth/1.73205080757*2;
        this.bigHexagonWidth = this.hexagonXCount * this.hexagonWidth;
        this.bigHexagonHeight = (this.hexagonXCount * this.hexagonHeight*3/4) + this.hexagonHeight;
    }

    tintHexagon(x, y, tintColor) {
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = tintColor;

        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + (this.hexagonWidth/2), y);
        ctx.lineTo(x + this.hexagonWidth, y + (this.hexagonHeight/4));
        ctx.lineTo(x + this.hexagonWidth, y + (this.hexagonHeight*3/4));
        ctx.lineTo(x + (this.hexagonWidth/2), y + (this.hexagonHeight));
        ctx.lineTo(x, y + (this.hexagonHeight*3/4));
        ctx.lineTo(x, y + (this.hexagonHeight/4));
        ctx.lineTo(x + (this.hexagonWidth/2), y);
        ctx.closePath();

        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;
    }

    drawHexagon(x, y) {
        let texture = this.assets.getTexture();
        this.assets.next();
        ctx.drawImage(texture, x, y, this.hexagonWidth, this.hexagonHeight * 1.3);
        this.tintHexagon(x, y, this.assets.getColor());
        //ctx.fillStyle = "#FFFFFF";
        //ctx.strokeStyle = "#FF0000";
        //ctx.lineWidth = 1;
    }

    drawHexagonRow(y, x, count) {
        count = Math.floor(count);
        for (let i = 0; i < count; i++) {
            this.drawHexagon(x, y);
            x += this.hexagonWidth;
        }
    }

    getCenteredCoords() {
        return {
            x: (canvas.width - this.bigHexagonWidth) / 2,
            y: (canvas.height - this.bigHexagonHeight)/2,
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

function convertToReal({fakeX, fakeY}) {
    return {
        x: (fakeX - bounding.left)/(bounding.right - bounding.left)*canvas.width,
        y: (fakeY - bounding.top)/(bounding.bottom - bounding.top)*canvas.height
    }
}

const rustWasm = await wasmInit("./rust/pkg/extermination_bg.wasm");
const outputPointer = rustWasm.get_output_buffer_pointer();
let theHexagon = await new HexagonDraw(50);
theHexagon.draw();

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
