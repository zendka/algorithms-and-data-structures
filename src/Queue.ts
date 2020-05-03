export default interface Queue<T> {
  add(value: T): void;

  remove(): T | null;

  peek(): T | null;

  isEmpty(): boolean;
}
