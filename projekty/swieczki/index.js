import wasmInit, {Canvas} from './rust/pkg/swieczki.js'

const load_sprites = (url, amount) => {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = () => {
            const widthperone = 200;
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
    const krzak = await load_sprites("./img/krzak_trollface.png", 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //canvasImageData.data.set(imageDataArray);
    //ctx.putImageData(canvasImageData, 0, 0);

    var i = 0;
    setInterval(() => {
        ctx.drawImage(krzak[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(krzak[0], 200, 0, canvas.width, canvas.height);
        ctx.drawImage(krzak[0], 400, 0, canvas.width, canvas.height);

        ctx.drawImage(turnedOn[i], 0, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 50, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 100, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 150, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 200, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 250, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 300, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 350, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 400, 0, 100, 150);
        ctx.drawImage(turnedOn[i], 450, 0, 100, 150);

        ctx.drawImage(turnedOn[i], 25 + 0*133/2, 37/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 25 + 1*133/2, 37/1.5, 100, 150);
        ctx.drawImage(turnedOff[0], 25 + 2*133/2, 37/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 25 + 3*133/2, 37/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 25 + 4*133/2, 37/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 25 + 5*133/2, 37/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 25 + 6*133/2, 37/1.5, 100, 150);


        ctx.drawImage(turnedOn[i], 116/2 + 0*133/2, 75/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 116/2 + 1*133/2, 75/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 116/2 + 2*133/2, 75/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 116/2 + 3*133/2, 75/1.5, 100, 150);
        ctx.drawImage(turnedOff[0], 116/2 + 4*133/2, 75/1.5, 100, 150);
        ctx.drawImage(turnedOff[0], 116/2 + 5*133/2, 75/1.5, 100, 150);


        ctx.drawImage(turnedOn[i], 182/2 + 0*133/2, 112/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 182/2 + 1*133/2, 112/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 182/2 + 2*133/2, 112/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 182/2 + 3*133/2, 112/1.5, 100, 150);
        ctx.drawImage(turnedOff[0], 182/2 + 4*133/2, 112/1.5, 100, 150);


        ctx.drawImage(turnedOn[i], 248/2 + 0*133/2, 150/1.5, 100, 150);
        ctx.drawImage(turnedOff[0], 248/2 + 1*133/2, 150/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 248/2 + 2*133/2, 150/1.5, 100, 150);
        ctx.drawImage(turnedOn[i], 248/2 + 3*133/2, 150/1.5, 100, 150);
        i++;
        if (i > 4) i = 0;
    }, 250);
}

runWasm();
