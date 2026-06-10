import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue: string = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error: unknown) {
      console.error('Ошибка записи в localStorage', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {   
      const serializedValue: string | null = localStorage.getItem(key);

      if (serializedValue === null) {
        return null;
      }

      return JSON.parse(serializedValue) as T;
    } catch (error: unknown) {
      console.error('Ошибка чтения из localStorage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

} 