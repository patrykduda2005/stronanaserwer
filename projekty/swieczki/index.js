import wasmInit, {Canvas} from './rust/pkg/swieczki.js'

const load_sprites = (url, amount) => {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = () => {
            const widthperone = image.width / amount;
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
    const turnedOff = await load_sprites("./img/zgaszony.png", 1);
    const turnedOn = await load_sprites("./img/swieci-sheet.png", 5);
    const turningOff = await load_sprites("./img/zgaszenie-sheet.png", 6);

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //canvasImageData.data.set(imageDataArray);
    //ctx.putImageData(canvasImageData, 0, 0);

    var i = 0;
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(turningOff[i], 0, 0);
        i++;
        if (i > 5) i = 0;
    }, 250);
}

runWasm();
