use wasm_bindgen::prelude::wasm_bindgen;

const CANVAS_WIDTH: usize = 200;
const CANVAS_HEIGHT: usize = 200;
const CANDLE_HEIGHT: u32 = 11;
const CANDLE_WIDTH: u32 = 6;

const OUTPUT_BUFFER_SIZE: usize = CANVAS_WIDTH*CANVAS_HEIGHT*4;
static mut OUTPUT_BUFFER: [u8; OUTPUT_BUFFER_SIZE] = [0; OUTPUT_BUFFER_SIZE];

#[wasm_bindgen]
pub fn get_output_buffer_pointer() -> *const u8 {
    unsafe {
        OUTPUT_BUFFER.as_ptr()
    }
}

#[wasm_bindgen]
struct Canvas {
    board: [(u8, u8, u8); CANVAS_WIDTH * CANVAS_HEIGHT],
}

impl Canvas {
    fn set_pixel(&mut self, coord: (u32, u32), color: (u8, u8, u8)) {
        let idx: usize = coord.0 as usize + CANVAS_WIDTH * coord.1 as usize;
        self.board[idx] = color;
    }

    fn draw_candle(&mut self, coord: (u32, u32)) {
        let red: (u8, u8, u8) = (255, 0, 0);
        let orange: (u8, u8, u8) = (255, 205, 0);
        let yellow: (u8, u8, u8) = (255, 237, 0);
        let white: (u8, u8, u8) = (255, 255, 255);
        let candle: [[Option<(u8, u8, u8)>; CANDLE_WIDTH as usize]; CANDLE_HEIGHT as usize] = [
        [None, None, Some(yellow), Some(yellow), None, None],
        [None, Some(yellow), Some(orange), Some(orange), Some(yellow), None],
        [Some(yellow), Some(orange), Some(red), Some(red), Some(orange), Some(yellow)],
        [Some(yellow), Some(orange), Some(red), Some(red), Some(orange), Some(yellow)],
        [Some(yellow), Some(orange), Some(red), Some(red), Some(orange), Some(yellow)],
        [Some(yellow), Some(orange), Some(white), Some(white), Some(orange), Some(yellow)],
        [None, Some(yellow), Some(white), Some(white), Some(yellow), None],
        [None, None, Some(white), Some(white), None, None],
        [None, None, Some(white), Some(white), None, None],
        [None, None, Some(white), Some(white), None, None],
        [None, None, Some(white), Some(white), None, None],
        ];
        candle.iter().enumerate().for_each(|(iy, x)| x.iter().enumerate().for_each(|(ix, y)|
            if let Some(kolor) = y {
                self.set_pixel((ix as u32 + coord.0, iy as u32 + coord.1), *kolor);
            }
        ));
    }
    
    fn draw_all_candles(&mut self) {
        self.draw_candle((0,0));
        self.draw_candle((1*CANDLE_WIDTH + 1,0));
        self.draw_candle((2*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((3*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((4*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((5*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((6*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((7*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((8*(CANDLE_WIDTH + 1) ,0));
        self.draw_candle((9*(CANDLE_WIDTH + 1) ,0));

        self.draw_candle((0 + CANDLE_WIDTH/2, CANDLE_HEIGHT));
        self.draw_candle((CANDLE_WIDTH + 1 + CANDLE_WIDTH/2,  CANDLE_HEIGHT));
        self.draw_candle((2*(CANDLE_WIDTH + 1 + CANDLE_WIDTH/2) ,CANDLE_HEIGHT));
        self.draw_candle((3*(CANDLE_WIDTH + 1 + CANDLE_WIDTH/2) ,CANDLE_HEIGHT));
        self.draw_candle((4*(CANDLE_WIDTH + 1 + CANDLE_WIDTH/2) ,CANDLE_HEIGHT));
        self.draw_candle((5*(CANDLE_WIDTH + 1 + CANDLE_WIDTH/2) ,CANDLE_HEIGHT));
        self.draw_candle((6*(CANDLE_WIDTH + 1 + CANDLE_WIDTH/2) ,CANDLE_HEIGHT));
    }
}


#[wasm_bindgen]
impl Canvas {
    pub fn new() -> Self {
        Self {
            board: [(0 as u8, 0 as u8, 0 as u8); CANVAS_WIDTH * CANVAS_HEIGHT],
        }
    }

    pub fn update_data(&mut self) {
        self.draw_all_candles();
        let mut output = [0; OUTPUT_BUFFER_SIZE];
        for (i, x) in self.board.iter().enumerate() {
            output[i*4 + 0] = x.0;
            output[i*4 + 1] = x.1;
            output[i*4 + 2] = x.2;
            output[i*4 + 3] = 255;
        }
        unsafe {
            OUTPUT_BUFFER = output;
        }
    }
}
