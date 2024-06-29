use crate::log;

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
        else {
            // Convert to their coordinate system
            //mouse.0 *= 1.0/3.0_f32.sqrt();
            //mouse.1 *= -1.0/3.0_f32.sqrt();
            // Algorithm emailed to me from Charles Chambers in 2013
            //let temp = (mouse.0 + 3.0_f32.sqrt() * mouse.1 + 1.0).floor();
            //let q = (((2.0*mouse.0+1.0).floor() + temp) / 3.0).floor();
            //let r = ((temp + (-mouse.0 + 3.0_f32.sqrt() * mouse.1 + 1.0).floor())/3.0).floor();
            //return {q, r: -r}
            //TODO
            mouse.0 -= self.map_descriptor.map_pos.0;
            mouse.1 -= self.map_descriptor.map_pos.1;
            //let q = ((3.0_f32.sqrt()/3.0 * mouse.0) - (1.0/3.0 * mouse.1)) / self.map_descriptor.tile_size.0;
            //let r = (2.0/3.0 * mouse.1) / self.map_descriptor.tile_size.0;
            let q = ((1.0/self.map_descriptor.tile_size.0)*(mouse.0/1.0)) - ((2.0/(3.0 * self.map_descriptor.tile_size.1))*(mouse.1/1.0));
            let r = (4.0/(3.0*self.map_descriptor.tile_size.1))*(mouse.1/1.0);
            log(format!("{}, {}, rounded: {:?}", q, -r, self.round_to_hex((q, r))).as_str());
            let (wynikx, wyniky) = self.round_to_hex((q, r));
            return Some((wynikx as usize, wyniky as usize));
        }
    }

    fn round_to_hex(&self, coords: (f32, f32)) -> (i32, i32) {
        let frac_s = -coords.0 - coords.1;
        let mut q = coords.0.round();
        let mut r = coords.1.round();
        let mut s = frac_s.round();

        let q_diff = (q - coords.0).abs();
        let r_diff = (r - coords.1).abs();
        let s_diff = (s - frac_s).abs();

        if q_diff > r_diff && q_diff > s_diff {
            q = -r - s;
        } else if r_diff > s_diff {
            r = -q - s;
        } else {
            s = -q - r;
        }
        
        return (q as i32 + 12, r as i32);

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
