
use crate::main::tiles::Color;

pub struct Player {
    color: Color,
}

impl Player {
    pub fn new(color: Color) -> Self {
        Player {
            color,
        }
    }
}
