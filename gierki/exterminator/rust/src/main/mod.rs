use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

#[wasm_bindgen]
struct JsCommunicator {
    tiles: tiles::Tiles,
    coordinates_manager: tile_coordinates::TileCoordinates,
}

#[allow(unused)]
#[wasm_bindgen]
impl JsCommunicator {
    pub fn new() -> Self {
        let tile_coordinates = tile_coordinates::TileCoordinates::new();
        JsCommunicator { 
            tiles: tiles::Tiles::new(tile_coordinates.get_horizontal_diameter()),
            coordinates_manager: tile_coordinates,
        }
    }

    pub fn update_buffer(&self) {
        self.tiles.update_buffer();
    }

    pub fn click_event(&mut self, mouse_x: f32, mouse_y: f32) {
        let (x, y) = self.coordinates_manager.get_tile_coordinate();
        self.tiles.click_tile(x, y);
    }

    pub fn tick_frame(&mut self) {
        //TODO
    }
}

//moving and scaling the map
#[allow(unused)]
#[wasm_bindgen]
impl JsCommunicator {
    pub fn update_map(&mut self) {
        self.coordinates_manager.update_size();
    }

    pub fn scale_map(&mut self, scale: f32) {
        self.coordinates_manager.scale(scale);
    }

    pub fn get_map_properties(&self) -> JsValue {
        JsValue::from_str(self.coordinates_manager.get_map_properties().as_str())
    }

    pub fn move_map(&mut self, x: f32, y: f32) {
        self.coordinates_manager.r#move((x, y));
    }
}

mod tiles;
mod tile_coordinates;
