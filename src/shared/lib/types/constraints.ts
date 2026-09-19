// biome-ignore lint/suspicious/noExplicitAny: for Generic constaints
export type AnyFunction = (...params: any[]) => any;

// biome-ignore lint/suspicious/noExplicitAny: for Generic constaints
export type AnyArray = any[];

// biome-ignore lint/suspicious/noExplicitAny: for Generic constaints
export type AnyReadonlyArray = readonly any[];

export type Primitives =
  | string //
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;
