use std::fmt::{Debug, Pointer};

use crate::log;

//Owner
#[derive(Clone, Copy, Debug)]
pub enum Color {
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
    stored_man_power: Option<u8>,
    man_power: u8,
    frame: u32,
    action_points_generation: u32,
    r#type: TileType,
}

impl Default for Tile {
    fn default() -> Self {
        Tile {
            color: None,
            stored_man_power: None,
            man_power: 0,
            frame: 0,
            action_points_generation: 1,
            r#type: TileType::Plains,
        }
    }
}

impl Tile {
    pub fn get_js_info(&self) -> (u8, u8, u8, u8) {
        let color_num: u8 = match self.color {
            Some(c) => c as u8,
            None => 0,
        };
        return (
            self.r#type as u8,
            self.frame as u8,
            color_num,
            self.man_power as u8,
        )
    }

    pub fn change_color(&mut self, color: Option<Color>) {
        self.color = color;
    }

    pub fn change_man_power(&mut self, man_power_delta: i8) -> Result<(), &str> {
        let new_man_power: i16 = self.man_power as i16 + man_power_delta as i16;
        if new_man_power < 0 { return Err("Man power cannot be negative!") }
        if new_man_power > u8::MAX as i16 { return Err("Man power cannot be greater than 8 bytes!") }
        self.man_power = new_man_power as u8;
        return Ok(());
    }
}
