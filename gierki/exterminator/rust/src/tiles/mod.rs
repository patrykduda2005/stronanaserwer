use wasm_bindgen::prelude::wasm_bindgen;

use crate::{OUTPUT_BUFFER, OUTPUT_BUFFER_SIZE};


mod tile;

#[wasm_bindgen]
pub struct Tiles(Vec<tile::Tile>);

#[wasm_bindgen]
impl Tiles {
    pub fn new() -> Self {
        Tiles::default()
    }

    pub fn update_buffer(&self) {
        let mut temp_buffer = [0; OUTPUT_BUFFER_SIZE];
        self.0.iter().enumerate().for_each(|(i, x)| {
            let tuple = x.get_js_info();
            temp_buffer[i*3] = tuple.0;
            temp_buffer[i*3+1] = tuple.1;
            temp_buffer[i*3+2] = tuple.2;
        });
        unsafe {
            OUTPUT_BUFFER = temp_buffer;
        }
    }

    pub fn tick_frame(&mut self) {
        // TODO!
    }
}

impl Default for Tiles {
    fn default() -> Self {
        Tiles (
            vec![tile::Tile::default(); OUTPUT_BUFFER_SIZE/3]
        )
    }
}



