import Queue from "./Queue";

class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

class Q<T> implements Queue<T> {
  first: Node<T> | null = null;
  last: Node<T> | null = null;

  add(value: T): void {
    const node = new Node<T>(value);
    if (!this.last) {
      this.last = node;
      this.first = node;
    }
    this.last.next = node;
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.first.value;
  }

  remove(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.first.value;
    this.first = this.first.next;
    return value;
  }

  isEmpty(): boolean {
    return this.first !== null;
  }
}

abstract class Animal {
  order: number;
  constructor(public name: string) {}
  isOlderThan(animal: Animal): boolean {
    return this.order < animal.order;
  }
}

class Dog extends Animal {}

class Cat extends Animal {}

export default class AnimalShelter {
  dogs = new Q<Animal>();
  cats = new Q<Animal>();
  order = 1;

  enqueue(animal: Animal): void {
    animal.order = this.order++;

    if (animal instanceof Dog) {
      this.dogs.add(animal);
    } else if (animal instanceof Cat) {
      this.cats.add(animal);
    }
  }

  dequeueDog(): Animal | null {
    return this.dogs.remove();
  }

  dequeueCat(): Animal | null {
    return this.cats.remove();
  }

  dequeueAny(): Animal | null {
    if (this.dogs.isEmpty()) {
      return this.dequeueCat();
    }
    if (this.cats.isEmpty()) {
      return this.dequeueDog();
    }

    const oldestDog = this.dogs.peek();
    const oldestCat = this.cats.peek();
    return oldestDog.isOlderThan(oldestCat)
      ? this.dequeueDog()
      : this.dequeueCat();
  }
}
