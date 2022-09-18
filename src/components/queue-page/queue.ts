import { runInThisContext } from "vm";
import { IQueue } from "./types";

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail = this.tail + 1;
    this.length = this.length + 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    delete this.container[this.head];
    this.head = this.head + 1;
    this.length = this.length - 1;
  };

  getLength = () => {
    return this.length;
  };

  isEmpty = () => this.length === 0;

  clear = () => {
    this.container = Array(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  };
}
