import { IStack } from "./types";

export default class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  clearContainer = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;
}
