import { Entity } from '@/src/shared/domain/entities/user.entity';

export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
};

export class UserEntity extends Entity {
  public name: string;
  public email: string;
  public password: string;

  constructor(props: UserEntityProps) {
    super();
    Object.assign(this, props);
  }
}
