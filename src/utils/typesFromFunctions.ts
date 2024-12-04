/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Infers a combined type from an array of functions.
 * Each function in the array should return an object.
 * The resulting type is an intersection of the return types of the functions.
 *
 * @typeParam T - A tuple of functions.
 */
export type TypesFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
    ? TypesFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;
