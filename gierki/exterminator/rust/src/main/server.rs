use base64::Engine;
use base64::engine::general_purpose::STANDARD;
use wasm_bindgen::prelude::*;
use web_sys::HtmlInputElement;


pub struct ServerConnection;

impl ServerConnection {
    pub fn new() -> Self {
        ServerConnection
    }

    pub fn connect(&mut self) {

    }

    pub fn send_state(&self) {

    }

    pub fn get_state(&self) -> Vec<u8> {
        let str = self.get_string();
        let base = STANDARD.decode(str).unwrap();
        crate::log(format!("{:?}", base).as_str());
        return vec![0];
    }
}

impl ServerConnection {
    fn get_string(&self) -> String {
        let input = web_sys::window().unwrap().document().unwrap().get_element_by_id("server").unwrap().dyn_into::<HtmlInputElement>().unwrap();
        return input.value();
    }
}


