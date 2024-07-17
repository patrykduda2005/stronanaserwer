use core::panic;

use crate::{log, ARRAY_COMPONENTS, MAP_HOR_COUNT};

//Owner
#[derive(Clone, Copy, Debug)]
pub enum Color {
    Red = 1,
    Green = 2,
    Blue = 3,
}


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
                        temp_buffer[i*ARRAY_COMPONENTS] = tuple.0;
                        temp_buffer[i*ARRAY_COMPONENTS+1] = tuple.1;
                        temp_buffer[i*ARRAY_COMPONENTS+2] = tuple.2;
                        temp_buffer[i*ARRAY_COMPONENTS+3] = tuple.3;
                        i += 1;
                    }
                }
            });
        });
        unsafe {
            crate::OUTPUT_BUFFER = temp_buffer;
        }
    }

    pub fn click_tile(&mut self, x: usize, y: usize) {
        self.increase_man_power_at(x, y);
    }

    fn change_color_at(&mut self, x: usize, y: usize) {
        match self.0[y][x].as_mut() {
            None => (),
            Some(tile) => tile.change_color(Some(Color::Blue))
        }
    }

    fn increase_man_power_at(&mut self, x: usize, y: usize) {
        match self.0[y][x].as_mut() {
            None => (),
            Some(tile) => tile.change_man_power(1).unwrap(),
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

mod tile;
