use std::fmt::{Debug, Pointer};

//Owner
#[derive(Clone, Copy)]
enum Color {
    Red = 1,
    Green = 2,
    Blue = 3,
}

#[derive(Clone, Copy)]
enum TileType {
    Plains = 0,
}

#[derive(Clone, Copy)]
pub struct Tile {
    color: Option<Color>,
    stored_man_power: Option<i32>,
    man_power: i32,
    frame: i32,
    action_points_generation: i32,
    r#type: TileType,
}

impl Default for Tile {
    fn default() -> Self {
        Tile {
            color: Some(Color::Red),
            stored_man_power: None,
            man_power: 0,
            frame: 0,
            action_points_generation: 1,
            r#type: TileType::Plains,
        }
    }
}

impl Tile {
    pub fn get_js_info(&self) -> (u8, u8, u8) {
        let color_num: u8 = match self.color {
            Some(c) => c as u8,
            None => 0,
        };
        return (
            self.r#type as u8,
            self.frame as u8,
            color_num,
        )
    }
}
