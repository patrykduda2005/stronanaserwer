use wasm_bindgen::prelude::wasm_bindgen;

const OUTPUT_BUFFER_SIZE: usize = 64;
static mut OUTPUT_BUFFER: [u8; OUTPUT_BUFFER_SIZE] = [1; OUTPUT_BUFFER_SIZE];

const CANDLE_TIME: u8 = 5;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn get_output_buffer_pointer() -> *const u8 {
    unsafe {
        OUTPUT_BUFFER.as_ptr()
    }
}

#[derive(Clone, Copy, Debug, PartialEq)]
#[allow(dead_code)]
enum CandleState {
    TurnedOn = 0,
    TurningOff = 1,
    TurnedOff = 2,
}

#[derive(Clone)]
#[allow(dead_code)]
struct Candle {
    frame: u8,
    state: CandleState,
    time_left: u8,
}

impl Default for Candle {
    fn default() -> Self {
        Candle {
            frame: 0,
            state: CandleState::TurnedOff,
            time_left: CANDLE_TIME,
        }
    }
}

#[allow(dead_code)]
impl Candle {
    fn new(frame: u8, state: CandleState, time_left: u8) -> Self {
        Candle {
            frame,
            state,
            time_left,
        }
    }

    fn progress_frame(&mut self) {
        match self.state {
            CandleState::TurnedOn => {
                if self.frame != 4 {
                    self.frame += 1;
                } else {
                    self.frame = 0;
                }
            },
            CandleState::TurningOff => {
                if self.frame != 5 {
                    self.frame += 1;
                } else {
                    self.frame = 0;
                    self.state = CandleState::TurnedOff;
                }
            },
            CandleState::TurnedOff => (),
        }
    }

    fn tick(&mut self) {
        self.time_left -= 1;
        if self.time_left == 0 && self.state == CandleState::TurnedOn {
            self.state = CandleState::TurningOff;
            self.frame = 0;
        } 
    }

    fn set_on_fire(&mut self) {
        self.state = CandleState::TurnedOn;
        self.frame = 0;
        self.time_left = CANDLE_TIME;
    }

    fn get_js_info(&self) -> (u8, u8) {
        return (self.state as u8, self.frame);
    }

    fn reset(&mut self) {
        if self.state == CandleState::TurnedOn {
            self.state = CandleState::TurningOff;
        }
        self.time_left = CANDLE_TIME;
        self.frame = 0;
    }
}


#[wasm_bindgen]
struct Candles(Vec<Candle>);

impl Default for Candles {
    fn default() -> Self {
        Candles(
            vec![Candle::default(); OUTPUT_BUFFER_SIZE/2],
        )
    }
}

#[wasm_bindgen]
#[allow(dead_code)]
impl Candles {
    pub fn new() -> Self {
        Candles::default()
    }

    pub fn update_buffer(&self) {
        let mut temp_buffer = [0; OUTPUT_BUFFER_SIZE];
        self.0.iter().enumerate().for_each(|(i, x)| {
            let tuple = x.get_js_info();
            temp_buffer[i*2] = tuple.0;
            temp_buffer[i*2+1] = tuple.1;
        });
        unsafe {
            OUTPUT_BUFFER = temp_buffer;
        }
    }

    pub fn tick_frame(&mut self) {
        self.0.iter_mut().for_each(|x| x.progress_frame());
    }

    pub fn tick(&mut self) {
        self.0.iter_mut().for_each(|x| x.tick());
    }

    pub fn set_on_fire(&mut self, i: usize) {
        if i > 31 {return}
        self.0[i].set_on_fire();
    }

    pub fn add_candle(&mut self) {
        for c in self.0.iter_mut() {
            if c.state == CandleState::TurnedOn {
                continue;
            }
            c.set_on_fire();
            return;
        }
    }

    pub fn reset_all(&mut self) {
        self.0.iter_mut().for_each(|c| c.reset());
    }

}
