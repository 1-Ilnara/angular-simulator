interface Identifiable {
  id: string | number;
}export class Collection< T extends Identifiable> {

  private items: T[] = [];

  constructor(initialData: T[]) {
    this.items = [...initialData];
  }

  getAll(): T[] {
    return this.items;
  }

  getOne(id: string | number): T | undefined {
  return this.items.find(item => item.id === id);
}

  clear(): void {
    this.items = [];
  }

  remove(id: string | number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  replace(id: string | number, newItem: T): void {
    this.items = this.items.map(item => item.id === id ? newItem : item);
  }

}