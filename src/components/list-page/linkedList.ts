export class QNode<T> {
  value: T;
  next: QNode<T> | null = null;

  constructor(value: T, next?: QNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> {
  head: QNode<T> | null = null;
  tail: QNode<T> | null = null;

  addToHead = (value: T) => {
    const node = new QNode<T>(value);

    if (this.head === null) {
      this.tail = node;
      this.head = this.tail;
      return;
    }

    node.next = this.head;
    this.head = node;
  };

  addToTail = (value: T) => {
    const node = new QNode<T>(value);

    if (this.tail === null) {
      this.tail = node;
      this.head = this.tail;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  };

  removeFromHead = () => {
    if (this.head === null) {
      return;
    }

    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }
  };

  removeFromTail = (): QNode<T> | null => {
    if (this.isEmpty()) {
      throw new Error("list is empty");
    }
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode!.next) {
      if (!currentNode!.next.next) {
        currentNode!.next = null;
      } else {
        currentNode = currentNode!.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  };

  addByIndex(index: number, element: T) {
    let node = new QNode(element);
    let currentNode = this.head;
    let previousNode: QNode<T> | null;
    let currentIndex = 0;

    if (index === 0) {
      node.next = currentNode;
      this.head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode!.next;
      }
      node.next = currentNode;
      previousNode!.next = node;
    }
  }

  removeByIndex(index: number) {
    let currentNode = this.head;
    let previousNode: QNode<T> | null;
    let currentIndex = 0;

    if (index === 0) {
      this.head = currentNode!.next;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode!.next;
      }
      previousNode!.next = currentNode!.next;
    }
  }

  toArray() {
    const nodes: QNode<T>[] = [];

    let currentNode: QNode<T> | null = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toArrayOfValues() {
    const nodes: T[] = [];

    let currentNode: QNode<T> | null = this.head;

    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  isEmpty = (): boolean => {
    return this.head === null;
  };
}
