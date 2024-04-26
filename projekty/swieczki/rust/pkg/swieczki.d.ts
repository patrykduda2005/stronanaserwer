/* tslint:disable */
/* eslint-disable */
/**
* @returns {number}
*/
export function get_output_buffer_pointer(): number;
/**
*/
export class Candles {
  free(): void;
/**
* @returns {Candles}
*/
  static new(): Candles;
/**
*/
  update_buffer(): void;
/**
*/
  tick_frame(): void;
/**
*/
  tick(): void;
/**
* @param {number} i
*/
  set_on_fire(i: number): void;
/**
*/
  add_candle(): void;
/**
*/
  reset_all(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_output_buffer_pointer: () => number;
  readonly __wbg_candles_free: (a: number) => void;
  readonly candles_new: () => number;
  readonly candles_update_buffer: (a: number) => void;
  readonly candles_tick_frame: (a: number) => void;
  readonly candles_tick: (a: number) => void;
  readonly candles_set_on_fire: (a: number, b: number) => void;
  readonly candles_add_candle: (a: number) => void;
  readonly candles_reset_all: (a: number) => void;
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
