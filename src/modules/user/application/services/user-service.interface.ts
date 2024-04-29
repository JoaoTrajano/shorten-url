import { UserEntity } from '../../domain/entities/user.entity';

export interface UserServiceInterface {
  getByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity | null>;
}
