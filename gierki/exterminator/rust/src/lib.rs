extern crate console_error_panic_hook;

use wasm_bindgen::prelude::wasm_bindgen;

const MAP_HOR_COUNT: usize = 8;
const HEX_AMOUNT: usize = ((MAP_HOR_COUNT/2) + (MAP_HOR_COUNT-1))*(MAP_HOR_COUNT/2) + MAP_HOR_COUNT;
const OUTPUT_BUFFER_SIZE: usize = 3 * HEX_AMOUNT;
static mut OUTPUT_BUFFER: [u8; OUTPUT_BUFFER_SIZE] = [0; OUTPUT_BUFFER_SIZE];

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn get_output_buffer_pointer() -> *const u8 {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    assert!(MAP_HOR_COUNT % 2 == 0, "MAP_WIDTH must be even!!!");
    unsafe {
        OUTPUT_BUFFER.as_ptr()
    }
}

#[wasm_bindgen]
pub fn get_hex_amount() -> usize {
    return HEX_AMOUNT;
}

//#[wasm_bindgen]
//pub fn get_map_width() -> usize {
//    return MAP_HOR_COUNT;
//}


#[wasm_bindgen]
pub fn tick_frame() {
    todo!()
}





mod main;
