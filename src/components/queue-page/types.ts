export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getLength: () => number;
}
