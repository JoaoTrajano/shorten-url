import { Entity } from '@/src/shared/domain/user.entity';

export class UserEntity extends Entity {
  public name: string;
  public email: string;
  public password: string;

  constructor() {
    super();
  }
}
