export const mayCastErrorBasic = (value: unknown): Error =>
  value instanceof Error ? value : Error(String(value));
