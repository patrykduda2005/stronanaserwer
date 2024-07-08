import wasmInit, {JsCommunicator} from '../rust/pkg/extermination.js'
import { theHexagon } from './index.js';

const rustWasm = await wasmInit("./rust/pkg/extermination_bg.wasm");
const outputPointer = rustWasm.get_output_buffer_pointer();

class WasmManager {
    jsCommunicator;

    constructor() {
        this.jsCommunicator = JsCommunicator.new();
    }

    getWasmArray() {
        this.jsCommunicator.tick_frame();
        this.jsCommunicator.update_buffer();
        return new Uint8Array(rustWasm.memory.buffer, outputPointer, rustWasm.get_array_components_amount() * rustWasm.get_hex_amount());
    }

    getArrayComponentsCount() {
        return rustWasm.get_array_components_amount();
    }

    getMapProperties() {
        this.jsCommunicator.update_map();
        return this.jsCommunicator.get_map_properties();
    }

    move_map(x, y) {
        this.jsCommunicator.move_map(x, y);
    }

    scaleMap(scale) {
        this.jsCommunicator.scale_map(scale);
    }

    clickEvent(mouseCoords) {
        this.jsCommunicator.click_event(mouseCoords.x, mouseCoords.y);
    }
}

export const wasmManager = new WasmManager();
