export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
}
