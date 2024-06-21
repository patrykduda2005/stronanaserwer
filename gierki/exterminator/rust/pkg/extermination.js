let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @returns {number}
*/
export function get_output_buffer_pointer() {
    const ret = wasm.get_output_buffer_pointer();
    return ret >>> 0;
}

/**
* @returns {number}
*/
export function get_hex_amount() {
    const ret = wasm.get_hex_amount();
    return ret >>> 0;
}

/**
* @returns {number}
*/
export function get_map_width() {
    const ret = wasm.get_map_width();
    return ret >>> 0;
}

/**
*/
export function tick_frame() {
    wasm.tick_frame();
}

const TilesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tiles_free(ptr >>> 0));
/**
*/
export class Tiles {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Tiles.prototype);
        obj.__wbg_ptr = ptr;
        TilesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TilesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tiles_free(ptr);
    }
    /**
    * @returns {Tiles}
    */
    static new() {
        const ret = wasm.tiles_new();
        return Tiles.__wrap(ret);
    }
    /**
    */
    update_buffer() {
        wasm.tiles_update_buffer(this.__wbg_ptr);
    }
    /**
    * @param {number} mouse_x
    * @param {number} mouse_y
    * @param {number} map_pos_x
    * @param {number} map_pos_y
    * @param {number} tile_width
    * @param {number} tile_height
    * @param {number} map_height
    */
    click_event(mouse_x, mouse_y, map_pos_x, map_pos_y, tile_width, tile_height, map_height) {
        wasm.tiles_click_event(this.__wbg_ptr, mouse_x, mouse_y, map_pos_x, map_pos_y, tile_width, tile_height, map_height);
    }
    /**
    */
    tick_frame() {
        wasm.tiles_tick_frame(this.__wbg_ptr);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_assert_49b5027b7fa9f701 = function(arg0, arg1, arg2) {
        console.assert(arg0 !== 0, getStringFromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_log_5ecc9022fa3eba79 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('extermination_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
