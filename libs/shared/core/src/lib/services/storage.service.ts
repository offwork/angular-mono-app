import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private memoryStore: { [key: string]: any } = {};
  private useLocalStorage: boolean = false;

  public constructor() {
    this.useLocalStorage = this.storageAvailable('localStorage');
  }

  /**
   * Gets an item.
   * @param key Key to identify the item
   * @returns The item (if any) retrieved by the key
   */
  public getItem(key: string): string | null {
    if (this.useLocalStorage) {
      return localStorage.getItem(key);
    } else {
      return this.memoryStore.hasOwnProperty(key)
        ? this.memoryStore[key]
        : null;
    }
  }

  /**
   * Stores an item
   * @param key Key to identify the item
   * @param data Data to store
   */
  public setItem(key: string, data: string) {
    if (this.useLocalStorage) {
      localStorage.setItem(key, data);
    } else {
      this.memoryStore[key] = data.toString();
    }
  }

  /** Removes all currently stored items. */
  public clear() {
    if (this.useLocalStorage) {
      localStorage.clear();
    } else {
      this.memoryStore = {};
    }
  }

  /**
   * Removes a single item.
   * @param key Key to identify the item
   */
  public removeItem(key: string) {
    if (this.useLocalStorage) {
      localStorage.removeItem(key);
    } else {
      delete this.memoryStore[key];
    }
  }

  /**
   * Is any item currently stored under `key`?
   * @param key Key identifying item to check
   * @returns True if key retrieves an item, false otherwise
   */
  public hasItem(key: string): boolean {
    if (this.useLocalStorage) {
      return localStorage.getItem(key) ? true : false;
    } else {
      return this.memoryStore.hasOwnProperty(key);
    }
  }

  private storageAvailable(type: string): boolean {
    try {
      const storage = window[type];
      const key = '__storage_test__';
      storage.setItem(key, key);
      storage.removeItem(key, key);
      return true;
    } catch (e) {
      return false;
    }
  }
}
