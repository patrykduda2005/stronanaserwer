import wasmInit, {Tiles} from '../rust/pkg/extermination.js'

const rustWasm = await wasmInit("./rust/pkg/extermination_bg.wasm");
const outputPointer = rustWasm.get_output_buffer_pointer();
export const map_width = rustWasm.get_map_width();


export class AssetsWalker {
    index = 0;      //index of tile
    wasmArray;      //array of textures from Wasm
    loadedAssets;   //available assets
    colors;         //available colors
    tiles;          //tiles class from wasm

    constructor() {
        return (async () => {
            this.tiles = Tiles.new();
            this.updateWasmArray();
            this.loadedAssets = [
                await this.loadSprites("img/trawa.png", 1, 34, 43, 31, 29),
            ];
            this.colors = [
                'none',
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
        this.tiles.tick_frame();
        this.tiles.update_buffer();
        this.wasmArray = new Uint8Array(rustWasm.memory.buffer, outputPointer, 3 * rustWasm.get_hex_amount());
    }

    reset() {
        this.index = 0;
    }
}
