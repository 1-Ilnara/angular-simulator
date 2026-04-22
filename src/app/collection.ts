export class Collection<T> {
  private items: T[] = [];

  constructor(initialData: T[]) {
    this.items = initialData;
  }

  getAll(): T[] {
    return this.items;
  }

  getOne(index: number): T {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  remove(index: number): void {
    this.items.splice(index, 1);
  }

  replace(index: number, newItem: T): void {
    this.items[index] = newItem;
  }
}