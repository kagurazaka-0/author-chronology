/**
 * いずれか一つのパラメーターが必須なunion objectを生成する
 *
 * @example
 *   type Sample = EitherRequired<{
 *     a: string
 *     b: number
 *     c: boolean
 *   }>
 *
 *   const sample1: Sample = { a: "" } // ok!
 *   const sample2: Sample = { b: 10 } // ok!
 *   const sample3: Sample = { c: true } // ok!
 *
 *   const sample4: Sample = {} // error!
 *
 */
export type EitherRequired<T extends {}> = {
  [key in keyof T]: { [_ in key]: T[key] }
}[keyof T]
