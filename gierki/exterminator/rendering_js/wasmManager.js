import wasmInit, {Tiles} from '../rust/pkg/extermination.js'

const rustWasm = await wasmInit("./rust/pkg/extermination_bg.wasm");
const outputPointer = rustWasm.get_output_buffer_pointer();

class WasmManager {
    tiles;
    mapWidth;

    constructor() {
        this.tiles = Tiles.new();
        this.mapWidth = rustWasm.get_map_width();
    }

    getWasmArray() {
        this.tiles.tick_frame();
        this.tiles.update_buffer();
        return new Uint8Array(rustWasm.memory.buffer, outputPointer, 3 * rustWasm.get_hex_amount());
    }

    getMapWidth() {
        return this.mapWidth;
    }

    clickEvent(mouseCoords, mapPosition, tileSize, mapHeight) {
        this.tiles.click_event(mouseCoords.x, mouseCoords.y, mapPosition.x, mapPosition.y, tileSize.width, tileSize.height, mapHeight);
    }
}

export const wasmManager = new WasmManager();
