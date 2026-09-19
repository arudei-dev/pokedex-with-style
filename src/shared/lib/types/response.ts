export type Response<T> =
  | { $status: "loading" }
  | ({ $status: "success" } & T)
  | { $status: "failed"; error: Error };
