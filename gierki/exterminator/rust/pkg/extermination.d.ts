/* tslint:disable */
/* eslint-disable */
/**
* @returns {number}
*/
export function get_output_buffer_pointer(): number;
/**
* @returns {number}
*/
export function get_hex_amount(): number;
/**
* @returns {number}
*/
export function get_map_width(): number;
/**
*/
export function tick_frame(): void;
/**
*/
export class Tiles {
  free(): void;
/**
* @returns {Tiles}
*/
  static new(): Tiles;
/**
*/
  update_buffer(): void;
/**
* @param {number} mouse_x
* @param {number} mouse_y
* @param {number} map_pos_x
* @param {number} map_pos_y
* @param {number} tile_width
* @param {number} tile_height
* @param {number} map_height
*/
  click_event(mouse_x: number, mouse_y: number, map_pos_x: number, map_pos_y: number, tile_width: number, tile_height: number, map_height: number): void;
/**
*/
  tick_frame(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_output_buffer_pointer: () => number;
  readonly get_hex_amount: () => number;
  readonly get_map_width: () => number;
  readonly __wbg_tiles_free: (a: number) => void;
  readonly tiles_new: () => number;
  readonly tiles_update_buffer: (a: number) => void;
  readonly tiles_click_event: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly tiles_tick_frame: (a: number) => void;
  readonly tick_frame: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
