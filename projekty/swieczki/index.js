window.advanceATick = advanceATick;
window.addCandle = addCandle;
window.getSaveString = getSaveString;
window.processSaveString = processSaveString;
window.reset = reset;
window.addPause = addPause;
window.changeCandleTime = changeCandleTime;

import wasmInit, {Candles} from './rust/pkg/swieczki.js'
const CANDLE_WIDTH = 200;
const CANDLE_HEIGHT = 300;
const CANDLE_SCALE = 1;


const load_sprites = (url, amount) => {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = () => {
            const widthperone = CANDLE_WIDTH;
            let promises = [];
            for (let i = 0; i < amount; i++) {
                promises[i] = createImageBitmap(image, i * widthperone, 0, widthperone, image.height);
            }
            Promise.all(promises).then(sprites => {
                    resolve(sprites);
            })
        }
        image.onerror = () => reject();
        image.src = url;
    })
}



const drawFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        candles.update_buffer();
        candleData = new Uint8Array(rustWasm.memory.buffer, outputPointer, 2*32);

        const candle_width = CANDLE_WIDTH*CANDLE_SCALE;
        const candle_height = CANDLE_HEIGHT*CANDLE_SCALE;
        const candle_hor_gap = 1/3; //in candle widths
        const candle_ver_gap = 1/5.5; //in candle heights
        const ten_to_seven = (8*candle_width/6) //conversion from 10 candles to 7
        //ctx.drawImage(krzak[0], 0, 0, canvas.width, canvas.height);
        //ctx.drawImage(krzak[0], 200, 0, canvas.width, canvas.height);
        //ctx.drawImage(krzak[0], 400, 0, canvas.width, canvas.height);
        //ctx.drawImage(krzak[0], 600, 0, canvas.width, canvas.height);
        //ctx.drawImage(krzak[0], 800, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#B9A7BB";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(assets[candleData[44]][candleData[45]], 0*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[46]][candleData[47]], 1*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[48]][candleData[49]], 2*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[50]][candleData[51]], 3*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[52]][candleData[53]], 4*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[54]][candleData[55]], 5*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[56]][candleData[57]], 6*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[58]][candleData[59]], 7*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[60]][candleData[61]], 8*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[candleData[62]][candleData[63]], 9*candle_width*candle_hor_gap, 0, candle_width, candle_height);

        ctx.drawImage(assets[candleData[30]][candleData[31]], candle_width*candle_hor_gap/2 + 0*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[32]][candleData[33]], candle_width*candle_hor_gap/2 + 1*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[34]][candleData[35]], candle_width*candle_hor_gap/2 + 2*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[36]][candleData[37]], candle_width*candle_hor_gap/2 + 3*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[38]][candleData[39]], candle_width*candle_hor_gap/2 + 4*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[40]][candleData[41]], candle_width*candle_hor_gap/2 + 5*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[42]][candleData[43]], candle_width*candle_hor_gap/2 + 6*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);


        ctx.drawImage(assets[candleData[18]][candleData[19]], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 0*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[20]][candleData[21]], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 1*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[22]][candleData[23]], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 2*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[24]][candleData[25]], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 3*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[26]][candleData[27]], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 4*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[28]][candleData[29]], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 5*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);


        ctx.drawImage(assets[candleData[8]][candleData[9]], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 0*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[10]][candleData[11]], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 1*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[12]][candleData[13]], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 2*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[14]][candleData[15]], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 3*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[16]][candleData[17]], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 4*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);


        ctx.drawImage(assets[candleData[0]][candleData[1]], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 0*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[2]][candleData[3]], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 1*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[4]][candleData[5]], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 2*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[candleData[6]][candleData[7]], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 3*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
}


var candleTime = 5;
var saveString = "";
var tick = 0;
function advanceATick() {
    candles.tick();
    tick++;
    document.getElementById("tick").innerHTML = "Tick: " + tick;
    saveString += ".";
}

function addCandle() {
    candles.add_candle();
    drawFrame();
    saveString += "^";
}

function getSaveString() {
    document.getElementById("savestring").innerHTML = "Save string: " + saveString;
}

function changeCandleTime(change) {
    candleTime += change;
    if (candleTime == -1) candleTime = 255;
    else if (candleTime == 256) candleTime = 0;
    candles.change_default_candle_time(candleTime);
    if (change == 1) saveString+=">";
    else if (change == -1) saveString+="<";
    document.getElementById("candletime").innerHTML = "Czas palenia: " + candleTime + " ticków";
}

async function processSaveString(ss) {
    const sstab = Array.from(ss);
    for (const char of sstab) {
        if (char == ".") {
            advanceATick();
        } else if (char == "^") {
            addCandle();
        } else if (char == "\\") {
            candles.cease_turning_off();
            drawFrame();
            await new Promise(r => setTimeout(r, 100));
        } else if (char == "|") {
            candles.cease_turning_off();
            drawFrame();
            await new Promise(r => setTimeout(r, 1000));
        } else if (char == "/") {
            candles.cease_turning_off();
            drawFrame();
            await new Promise(r => setTimeout(r, 10000));
        } else if (char == ">") {
            changeCandleTime(1);
        } else if (char == "<") {
            changeCandleTime(-1);
        }
    }
}

function addPause() {
    saveString += "\\";
}

function reset() {
    candleTime = 4;
    changeCandleTime(1);
    saveString = "";
    tick = 0;
    document.getElementById("tick").innerHTML = "Tick: " + tick;
    document.getElementById("savestring").innerHTML = "Save string: " + saveString;
    candles.reset_all();
    drawFrame();
}

//canvas
const canvas = document.querySelector("canvas#canvas");
const ctx = canvas.getContext('2d');
ctx.font = "80px serif";
ctx.fillText("Loading...", 75, canvas.height/2);

var candleData;

//load sprites
const krzak = await load_sprites("./img/krzak_trollface.png", 1);
const assets = [
    await load_sprites("./img/swieci-sheet.png", 5),        //turnedOn
    await load_sprites("./img/zgaszenie-sheet.png", 6),     //turningOff
    await load_sprites("./img/zgaszony.png", 1),            //turnedOff
];

//wasm init
const rustWasm = await wasmInit("./rust/pkg/swieczki_bg.wasm")
const candles = Candles.new();
const outputPointer = rustWasm.get_output_buffer_pointer();

const renderLoop = async () => {
    candles.tick_frame();
    drawFrame();
    await new Promise(r => setTimeout(r, 250));
    requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
