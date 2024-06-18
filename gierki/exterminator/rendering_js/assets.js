import wasmInit from '../rust/pkg/extermination.js'

const rustWasm = await wasmInit("./rust/pkg/extermination_bg.wasm");
const outputPointer = rustWasm.get_output_buffer_pointer();

export class AssetsWalker {
    index = 0;
    wasmArray;
    loadedAssets;
    colors;

    constructor() {
        return (async () => {
            this.updateWasmArray();
            this.loadedAssets = [
                await this.loadSprites("img/trawa.png", 1, 34, 43, 31, 29),
            ];
            this.colors = [
                'none',
                'green',
                'blue',
                'red',
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
