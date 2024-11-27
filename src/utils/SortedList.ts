export class SortedList<T> {
  private _arr: T[] = [];
  private _comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this._comparator = comparator;
  }

  /**
   * Inserts elements while keeping the array sorted.
   *
   * @param values The values to insert.
   */
  push(...values: T[]): void {
    for (const value of values) {
      const index = this.binarySearchInsertPosition(value);
      this._arr.splice(index, 0, value);
    }
  }

  /**
   * Removes a specific element from the array.
   *
   * @param value The value to remove.
   * @returns `true` if the element was removed, `false` if not found.
   */
  remove(value: T): boolean {
    const index = this._arr.indexOf(value);
    if (index === -1) return false;
    this._arr.splice(index, 1);
    return true;
  }

  /**
   * Clears all elements in the array.
   */
  clear(): void {
    this._arr = [];
  }

  /**
   * Allows iteration over the array.
   */
  [Symbol.iterator](): Iterator<T> {
    let pointer = 0;
    const array = this._arr;

    return {
      next(): IteratorResult<T> {
        if (pointer < array.length) {
          return { done: false, value: array[pointer++] };
        } else {
          return { done: true, value: null };
        }
      },
    };
  }

  /**
   * Performs the specified action for each element in the list.
   *
   * @param callback The function to execute on each element.
   */
  forEach(callback: (value: T, index: number, array: T[]) => void): void {
    this._arr.forEach(callback);
  }

  /**
   * Performs the specified action for each element on the inverse of the list.
   *
   * @param callback The function to execute on each element.
   */
  forEachReverse(
    callback: (value: T, index: number, array: T[]) => void
  ): void {
    for (let i = this._arr.length - 1; i >= 0; i--) {
      callback(this._arr[i], i, this._arr);
    }
  }

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
   *
   * @param predicate The function to test each element.
   * @returns The element if found, or `undefined` if not found.
   */
  find(
    predicate: (value: T, index: number, array: T[]) => boolean
  ): T | undefined {
    for (let i = 0; i < this._arr.length; i++) {
      if (predicate(this._arr[i], i, this._arr)) {
        return this._arr[i];
      }
    }
    return undefined;
  }

  /**
   * Returns the value of the **last** element in the array where predicate is true, and undefined otherwise.
   *
   * @param predicate The function to test each element.
   * @returns The element if found, or `undefined` if not found.
   */
  findReverse(
    predicate: (value: T, index: number, array: T[]) => boolean
  ): T | undefined {
    for (let i = this._arr.length - 1; i >= 0; i--) {
      if (predicate(this._arr[i], i, this._arr)) {
        return this._arr[i];
      }
    }
    return undefined;
  }

  filter(predicate: (value: T, index: number, array: T[]) => boolean): void {
    this._arr = this._arr.filter(predicate);
  }

  reorder(value: T): boolean {
    const index = this._arr.indexOf(value);
    if (index === -1) return false;

    this._arr.splice(index, 1);

    const newIndex = this.binarySearchInsertPosition(value);
    this._arr.splice(newIndex, 0, value);
    return true;
  }

  /**
   * Performs a binary search to find the index at which to insert the element.
   *
   * @param value The value to insert.
   * @returns The index at which to insert the value.
   */
  private binarySearchInsertPosition(value: T): number {
    let left = 0;
    let right = this._arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this._comparator(this._arr[mid], value) < 0) left = mid + 1;
      else right = mid;
    }
    return left;
  }

  /**
   * Gets the sorted array.
   *
   * @returns The sorted array.
   */
  getArray(): T[] {
    return this._arr;
  }

  /**
   * Gets the length of the array.
   *
   * @returns The length of the array.
   */
  get length(): number {
    return this._arr.length;
  }
}
