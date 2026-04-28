export class Collection<T> {

  private items: T[] = [];

  constructor(initialData: T[]) {
    this.items = [...initialData];
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
    this.items = this.items.filter((_, i) => i !== index);
  }

  replace(index: number, newItem: T): void {
    this.items = this.items.map((item, i) => i === index ? newItem : item);
  }

}