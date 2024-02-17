export default class LocalStorageService{
   static setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getItem<T>(key: string): T {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value): null;
  }
}