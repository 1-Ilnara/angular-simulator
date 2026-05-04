export class Collection<T> {
  private items: T[] = [];

  constructor(initialData: T[]) {
    this.items = [...initialData];
  }

  getAll(): T[] {
    return this.items;
  }

  getByIndex(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  removeAt(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items = this.items.filter((item: T, i: number) => i !== index);
    }
  }

  replaceAt(index: number, newItem: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newItem;
    }
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }
}