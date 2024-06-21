use std::fmt::format;

use wasm_bindgen::prelude::wasm_bindgen;

use crate::{log, MAP_HOR_COUNT, OUTPUT_BUFFER, OUTPUT_BUFFER_SIZE};


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

    pub fn click_event(&self, mouse_x: f32, mouse_y: f32, map_pos_x: f32, map_pos_y: f32, tile_width: f32, tile_height: f32, map_height: f32) {
        if !self.is_in_maps_square(mouse_x, mouse_y, map_pos_x, map_pos_y, tile_width, tile_height, map_height) { return; }
        log(format!("HEIGHT: {:?}", self.in_which_row(mouse_y, map_pos_y, map_height, tile_height)).as_str());
    }

    pub fn tick_frame(&mut self) {
        // TODO!
    }
}

#[derive(Debug)]
enum WhichRow {
    Between(usize, usize),
    Exact(usize),
}

//find out what have been clicked
impl Tiles {
    fn is_in_maps_square(&self, mouse_x: f32, mouse_y: f32,  map_pos_x: f32, map_pos_y: f32, tile_width: f32, tile_height: f32, map_height: f32) -> bool {
        let map_width: f32 = tile_width * MAP_HOR_COUNT as f32;
        let map_height: f32 = tile_height * map_height/tile_height;
        if mouse_x < map_pos_x || mouse_x > map_pos_x + map_width ||
        mouse_y < map_pos_y || mouse_y > map_pos_y + map_height {
            return false;
        }
        return true;
    }

    fn in_which_row(&self, mouse_y: f32, map_pos_y: f32, map_height: f32, tile_height: f32) -> WhichRow {
        let mouse_advancement = mouse_y - map_pos_y;
        let y = mouse_advancement - (mouse_advancement%(tile_height*0.75));
        let height = (mouse_advancement/(tile_height*0.75)) as usize;
        let index = match height {
            0 => WhichRow::Exact(height),
            y if MAP_HOR_COUNT + 1 == y => WhichRow::Exact(height - 1),
            _ if mouse_advancement < y + tile_height*0.25 => WhichRow::Between(height - 1, height),
            _ => WhichRow::Exact(height),
        };
        return index;
    }

    fn which_hexagon(&self) -> usize {
        todo!()
    }

    fn row_to_tiles(&self, row: usize) {

    }
}

impl Default for Tiles {
    fn default() -> Self {
        Tiles (
            vec![tile::Tile::default(); OUTPUT_BUFFER_SIZE/3]
        )
    }
}



