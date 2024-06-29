use core::panic;

use crate::{log, MAP_HOR_COUNT};


mod tile;

pub struct Tiles(Vec<Vec<Option<tile::Tile>>>);

impl Tiles {
    pub fn new(map_hor_count: usize) -> Self {
        let mut final_vector: Vec<Vec<Option<tile::Tile>>> = Vec::new();
        let mut offset = map_hor_count/2;
        let mut lenght = map_hor_count/2;
        for y in 0..map_hor_count+1 {
            let mut row: Vec<Option<tile::Tile>> = Vec::new();
            for _ in 0..offset {
                row.push(None);
            }
            for _ in 0..lenght {
                row.push(Some(tile::Tile::default()));
            }
            for _ in lenght+offset..map_hor_count {
                row.push(None);
            }
            if y < (map_hor_count+1)/2 {
                offset -= 1;
                lenght += 1;
            } else {
                lenght -= 1;
            }
            final_vector.push(row);
        }
        Tiles (
            final_vector,
        )
    }

    pub fn update_buffer(&self) {
        let mut temp_buffer = [0; crate::OUTPUT_BUFFER_SIZE];
        let mut i = 0;
        self.0.iter().for_each(|y| {
            y.iter().for_each(|x| {
                match x {
                    None => {},
                    Some(thing) => {
                        let tuple = thing.get_js_info();
                        temp_buffer[i*3] = tuple.0;
                        temp_buffer[i*3+1] = tuple.1;
                        temp_buffer[i*3+2] = tuple.2;
                        i += 1;
                    }
                }
            });
        });
        unsafe {
            crate::OUTPUT_BUFFER = temp_buffer;
        }
    }

    pub fn click_event(&self, mouse_x: f32, mouse_y: f32, map_pos_x: f32, map_pos_y: f32, tile_width: f32, tile_height: f32, map_height: f32) {
        if !self.is_in_maps_square(mouse_x, mouse_y, map_pos_x, map_pos_y, tile_width, tile_height, map_height) { return; }
        let index = self.in_which_row(mouse_y, map_pos_y, map_height, tile_height);
        let canditates: Vec<usize> = self.row_to_tiles(index);
        log(format!("{:?}", canditates).as_str());
        for ind in canditates.iter() {
            log(format!("row: {}", self.index_to_row(*ind)).as_str());
        }
    }

    pub fn click_tile(&mut self, x: usize, y: usize) {
        self.change_color_at(x, y);
    }

    fn change_color_at(&mut self, x: usize, y: usize) {
        match self.0[y][x].as_mut() {
            None => (),
            Some(tile) => tile.change_color(Some(tile::Color::Blue))
        }
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

#[allow(unused)]
//find out what have been clicked
impl Tiles {
    fn get_sum_of_rows(&self, y: usize) -> usize {
        let mut sum;
        let middle_y: usize = ((MAP_HOR_COUNT as f32 + 1.0) / 2.0).ceil() as usize;

        let clamped_y = if y > middle_y { middle_y } else { y };
        let a1 = MAP_HOR_COUNT as f32 / 2.0;
        let an = self.get_yth_row_count(clamped_y) as f32;
        sum = (((a1 + an) / 2.0) * clamped_y as f32) as usize;

        if y > middle_y {
            let a1 = MAP_HOR_COUNT as f32 - 1.0;
            let an = self.get_yth_row_count(y) as f32;
            sum += (((a1 + an) / 2.0) * (y - middle_y) as f32) as usize;
        }

        return sum;
    }

    fn get_yth_row_count(&self, y: usize) -> usize {
        if y > MAP_HOR_COUNT + 1 { return 0; }
        let an: i32;
        let middle_y: usize = ((MAP_HOR_COUNT as f32 + 1.0) / 2.0).ceil() as usize;
        if y as usize <= middle_y {
            let a1 = MAP_HOR_COUNT as i32/2;
            let r = 1;
            an = a1 + ((y as i32 - 1) * r);
        } else {
            let a1 = MAP_HOR_COUNT as i32 - 1;
            let r = -1;
            an = a1 + (((y as i32 - middle_y as i32) - 1) * r);
        }
        return an as usize;
    }

    fn index_to_row(&self, hex_index: usize) -> f32 {
        let middle_y_sum = self.get_sum_of_rows((MAP_HOR_COUNT as f32 + 1.0 / 2.0).ceil() as usize);
        let r = if hex_index < middle_y_sum { 1 } else { -1 };
        let an = if hex_index < middle_y_sum {MAP_HOR_COUNT} else {MAP_HOR_COUNT/2};
        let a1 = if hex_index < middle_y_sum { MAP_HOR_COUNT/2 } else {MAP_HOR_COUNT - 1};
        let n = ((2.0 * hex_index as f32) / (a1 as f32 + hex_index as f32));
        return n;
    }

    fn get_tile_y(&self, map_pos_y: f32, tile_height: f32, hex_index: usize) {
        let row: usize;
    }

    fn get_tile_x(&self, map_pos_x: f32, tile_width: f32, hex_index: usize) {

    }

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

    fn is_in_hexagon(&self, mouse_x: f32, mouse_y: f32, hex_index: usize, tile_width: f32) -> bool {
        //index -> coordinates (needed: x(row offset from left, index of first), y(whichrow))
        todo!()
    }

    fn row_to_tiles(&self, row: WhichRow) -> Vec<usize> {
        match row {
            WhichRow::Exact(y) => {
                return self.exact_row_to_tiles(row);
            },
            WhichRow::Between(y1, y2) => {
                let rows = [self.exact_row_to_tiles(WhichRow::Exact(y1)), self.exact_row_to_tiles(WhichRow::Exact(y2))].concat();
                return rows;
            }
        }
    }

    fn exact_row_to_tiles(&self, row: WhichRow) -> Vec<usize> {
        let mut tiles = Vec::new();
        match row {
            WhichRow::Between(_, _) => panic!("Wrong use of exact function"),
            WhichRow::Exact(y) => {
                let sum = self.get_sum_of_rows(y);
                let next_sum = self.get_sum_of_rows(y + 1);
                for tile in sum..next_sum{
                    tiles.push(tile);
                }
            }
        }
        return tiles;
    }
}
