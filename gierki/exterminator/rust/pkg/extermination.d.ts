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
export function get_array_components_amount(): number;
/**
*/
export function tick_frame(): void;
/**
*/
export class JsCommunicator {
  free(): void;
/**
* @returns {JsCommunicator}
*/
  static new(): JsCommunicator;
/**
*/
  update_buffer(): void;
/**
* @param {number} mouse_x
* @param {number} mouse_y
*/
  click_event(mouse_x: number, mouse_y: number): void;
/**
*/
  tick_frame(): void;
/**
* @returns {number}
*/
  get_turn_number(): number;
/**
*/
  advance_turn(): void;
/**
*/
  update_client_state(): void;
/**
*/
  update_map(): void;
/**
* @param {number} scale
*/
  scale_map(scale: number): void;
/**
* @returns {any}
*/
  get_map_properties(): any;
/**
* @param {number} x
* @param {number} y
*/
  move_map(x: number, y: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_output_buffer_pointer: () => number;
  readonly get_hex_amount: () => number;
  readonly get_array_components_amount: () => number;
  readonly __wbg_jscommunicator_free: (a: number) => void;
  readonly jscommunicator_new: () => number;
  readonly jscommunicator_update_buffer: (a: number) => void;
  readonly jscommunicator_click_event: (a: number, b: number, c: number) => void;
  readonly jscommunicator_tick_frame: (a: number) => void;
  readonly jscommunicator_get_turn_number: (a: number) => number;
  readonly jscommunicator_advance_turn: (a: number) => void;
  readonly jscommunicator_update_client_state: (a: number) => void;
  readonly jscommunicator_update_map: (a: number) => void;
  readonly jscommunicator_scale_map: (a: number, b: number) => void;
  readonly jscommunicator_get_map_properties: (a: number) => number;
  readonly jscommunicator_move_map: (a: number, b: number, c: number) => void;
  readonly tick_frame: () => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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
