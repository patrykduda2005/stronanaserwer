const HORIZONTAL_DIAMETER: usize = crate::MAP_HOR_COUNT;
const TILE_WIDTH: f32 = 40.0;

pub struct TileCoordinates {
    hex_diameter_count: (usize, usize),
    map_pos: (f32, f32),
    tile_size: (f32, f32),
    map_size: (f32, f32),
}

impl TileCoordinates {
    pub fn new() -> Self {
        TileCoordinates::default()
    }

    pub fn get_horizontal_diameter(&self) -> usize {
        return self.hex_diameter_count.0;
    }

    pub fn get_tile_coordinate(&self) -> (usize, usize) {
        todo!()
    }
}

impl TileCoordinates {
    pub fn update_size(&mut self) {
        self.tile_size.1 = self.tile_size.0 / 1.73205080757*2.0;
        self.map_size.0 = self.hex_diameter_count.0 as f32 * self.tile_size.0;
        self.map_size.1 = (self.hex_diameter_count.0 as f32 * self.tile_size.1 * 0.75) + self.tile_size.1;
    }

    pub fn get_map_properties(&self) -> String {
        let string = format!(r#"
            {{
                "mapPos": {{
                    "x": {},
                    "y": {}
                }},
                "tileSize": {{
                    "width": {},
                    "height": {}
                }},
                "hexDiameterCount": {{
                    "horizontal": {},
                    "vertical": {}
                }}
            }}"#,
            self.map_pos.0, self.map_pos.1,
            self.tile_size.0, self.tile_size.1,
            self.hex_diameter_count.0, self.hex_diameter_count.1
        );
        return string;
    }

    pub fn scale(&mut self, scale: f32) {
        self.tile_size.0 *= scale;
    }
    
    pub fn r#move(&mut self, vector: (f32, f32)) {
        self.map_pos.0 += vector.0;
        self.map_pos.1 += vector.1;
    }
}

impl Default for TileCoordinates {
    fn default() -> Self {
        let horizontal_diameter: usize = HORIZONTAL_DIAMETER;
        let tile_width = TILE_WIDTH;
        let tile_height = tile_width / 1.73205080757*2.0;
        TileCoordinates {
            hex_diameter_count: (horizontal_diameter, horizontal_diameter + 1),
            map_pos: (0.0, 0.0),
            tile_size: ( tile_width, tile_width / 1.73205080757*2.0 ),
            map_size: (tile_width * horizontal_diameter as f32, tile_height * horizontal_diameter as f32 + 1.0),
        }
    }
}
