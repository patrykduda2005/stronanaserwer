use crate::log;

#[derive(Debug)]
enum SlopesSide {
    Left,
    Right,
    None,
}

pub struct TileCoordinates {
    pub map_descriptor: map_descriptor::MapDescriptor,
}

impl TileCoordinates {
    pub fn new() -> Self {
        TileCoordinates {
            map_descriptor: map_descriptor::MapDescriptor::new()
        }
    }

}

impl TileCoordinates {
    pub fn get_tile_coordinate(&self, mut mouse: (f32, f32)) -> Option<(usize, usize)> {
        if !self.is_in_maps_square(mouse.0, mouse.1) { return None }
        mouse.0 -= self.map_descriptor.map_pos.0;
        mouse.1 -= self.map_descriptor.map_pos.1;
        /*
        * -----------------------------------
        * | /\ | /\ | /\ | /\ | /\ | /\
        * |/  \|/  \|/  \|/  \|/  \|/  \
        * |   ||   ||   ||   ||   ||   |
        * |   ||   ||   ||   ||   ||   |
        * |-----------------------------------
        * |\  /|\  /|\  /|\  /|\  /|\  /
        * | \/ | \/ | \/ | \/ | \/ | \/
        * https://gamedev.stackexchange.com/questions/20742/how-can-i-implement-hexagonal-tilemap-picking-in-xna#answer-98430
        */

        let (mut column, mut row) = self.in_which_square((mouse.0, mouse.1));
        let which_slope: SlopesSide = self.which_slope(
            self.get_rel_coords((mouse.0, mouse.1), (column, row))
        );
        match which_slope {
            SlopesSide::None => (),
            SlopesSide::Left => row -= 1,
            SlopesSide::Right => { column += 1; row -= 1 },
        }
        return Some((column as usize + 12, row as usize));
    }


    fn in_which_square(&self, coords: (f32, f32)) -> (i32, i32) {
        let cell_height: f32 = self.map_descriptor.tile_size.1  * 0.75;
        let row: i32 = (coords.1 / cell_height) as i32;
        let column_offset: f32 = row as f32 * (self.map_descriptor.tile_size.0/2.0);
        let column: i32 = ((coords.0 - column_offset) / self.map_descriptor.tile_size.0).round() as i32;
        return (column, row);
    }

    fn get_rel_coords(&self, coords: (f32, f32), (column, row): (i32, i32)) -> (f32, f32) {
        let rel_y: f32 = coords.1 - (row as f32 * (self.map_descriptor.tile_size.1 * 0.75));
        let column_offset: f32 = row as f32 * (self.map_descriptor.tile_size.0/2.0);
        let rel_x: f32 = 
        (coords.0 - column_offset) 
        - (((column as f32) * self.map_descriptor.tile_size.0) - (self.map_descriptor.tile_size.0/2.0));
        return (rel_x, rel_y);
    }

    fn which_slope(&self, relcoords: (f32, f32)) -> SlopesSide {
        let c: f32 = self.map_descriptor.tile_size.1 * 0.25;
        let m: f32 = c / (self.map_descriptor.tile_size.0/2.0);
        if relcoords.1 < (-m * relcoords.0) + c {
            SlopesSide::Left
        } else if relcoords.1 < (m * relcoords.0) - c {
            SlopesSide::Right
        } else {
            SlopesSide::None
        }
    }

    fn is_in_maps_square(&self, mouse_x: f32, mouse_y: f32) -> bool {
        if mouse_x < self.map_descriptor.map_pos.0 || mouse_x > self.map_descriptor.map_pos.0 + self.map_descriptor.map_size.0 ||
        mouse_y < self.map_descriptor.map_pos.1 || mouse_y > self.map_descriptor.map_pos.1 + self.map_descriptor.map_size.1 {
            return false;
        }
        return true;
    }
}

mod map_descriptor;
