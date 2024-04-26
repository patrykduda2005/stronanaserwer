import wasmInit, {Canvas} from './rust/pkg/swieczki.js'
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


const runWasm = async () => {

    //Preparing canvas
    const canvas = document.querySelector("canvas#canvas");
    const ctx = canvas.getContext('2d');
    const canvasImageData = ctx.createImageData(
        canvas.width,
        canvas.height
    );

    ctx.font = "80px serif";
    ctx.fillText("Loading...", 75, canvas.height/2);


    //Loading wasm
    const rustWasm = await wasmInit("./rust/pkg/swieczki_bg.wasm")
    //const board = Canvas.new();
    //board.update_data();
    const wasmByteMemoryArray = new Uint8Array(rustWasm.memory.buffer);
    const outputPointer = rustWasm.get_output_buffer_pointer();
    const imageDataArray = wasmByteMemoryArray.slice(
          outputPointer,
          outputPointer + 200 * 200 * 4
    );


    //Loading sprites
    const krzak = await load_sprites("./img/krzak_trollface.png", 1);
    const assets = [
        await load_sprites("./img/swieci-sheet.png", 5),        //turnedOn
        await load_sprites("./img/zgaszenie-sheet.png", 6),     //turningOff
        await load_sprites("./img/zgaszony.png", 1),            //turnedOff
    ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //canvasImageData.data.set(imageDataArray);
    //ctx.putImageData(canvasImageData, 0, 0);

    var i = 0;
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const candle_width = CANDLE_WIDTH*CANDLE_SCALE;
        const candle_height = CANDLE_HEIGHT*CANDLE_SCALE;
        const candle_hor_gap = 1/2; //in candle widths
        const candle_ver_gap = 1/6; //in candle heights
        const ten_to_seven = (8*candle_width/6) //conversion from 10 candles to 7
        ctx.drawImage(krzak[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(krzak[0], 200, 0, canvas.width, canvas.height);
        ctx.drawImage(krzak[0], 400, 0, canvas.width, canvas.height);
        ctx.drawImage(krzak[0], 600, 0, canvas.width, canvas.height);
        ctx.drawImage(krzak[0], 800, 0, canvas.width, canvas.height);

        ctx.drawImage(assets[0][i], 0*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 1*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 2*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 3*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 4*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 5*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 6*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 7*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 8*candle_width*candle_hor_gap, 0, candle_width, candle_height);
        ctx.drawImage(assets[0][i], 9*candle_width*candle_hor_gap, 0, candle_width, candle_height);

        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 0*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 1*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 2*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 3*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 4*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 5*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], candle_width*candle_hor_gap/2 + 6*ten_to_seven*candle_hor_gap, 1*candle_height*candle_ver_gap, candle_width, candle_height);


        ctx.drawImage(assets[0][i], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 0*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 1*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 2*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 3*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 4*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 1*ten_to_seven/2)*candle_hor_gap + 5*ten_to_seven*candle_hor_gap, 2*candle_height*candle_ver_gap, candle_width, candle_height);


        ctx.drawImage(assets[0][i], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 0*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 1*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 2*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 3*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 2*ten_to_seven/2)*candle_hor_gap + 4*ten_to_seven*candle_hor_gap, 3*candle_height*candle_ver_gap, candle_width, candle_height);


        ctx.drawImage(assets[0][i], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 0*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 1*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 2*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        ctx.drawImage(assets[0][i], (candle_width/2 + 3*ten_to_seven/2)*candle_hor_gap + 3*ten_to_seven*candle_hor_gap, 4*candle_height*candle_ver_gap, candle_width, candle_height);
        i++;
        if (i > 4) i = 0;
    }, 250);
}

runWasm();
