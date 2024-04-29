import { v8 as uuid } from 'uuid';

export class Entity {
  public id: string;
  public createAt: Date;
  public updateAt: Date;

  constructor() {
    this.id = uuid();
    this.createAt = new Date();
    this.updateAt = new Date();
  }
}
