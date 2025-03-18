export interface helperApiReturn<T> {
    status: "OK" | "ERROR",
    result: T
}