use wasm_bindgen::prelude::wasm_bindgen;

const OUTPUT_BUFFER_SIZE: usize = 3 * 1900;
static mut OUTPUT_BUFFER: [u8; OUTPUT_BUFFER_SIZE] = [0; OUTPUT_BUFFER_SIZE];

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn get_output_buffer_pointer() -> *const u8 {
    unsafe {
        OUTPUT_BUFFER.as_ptr()
    }
}
