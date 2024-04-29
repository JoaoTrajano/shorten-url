export class Email {
  public value: string;
  public constructor(value: string) {
    this.value = value;
  }

  static isValid(value: string): boolean {
    return value.includes('@');
  }
}
