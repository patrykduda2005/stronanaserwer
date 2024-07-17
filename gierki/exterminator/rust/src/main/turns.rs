
pub struct Turns {
    turn: u32,
}

impl Turns {
    pub fn new() -> Self {
        Turns {
            turn: 1,
        }
    }

    pub fn get_turn(&self) -> u32 {
        return self.turn;
    }

    pub fn advance_turn(&mut self) {
        self.turn += 1;
    }
}
