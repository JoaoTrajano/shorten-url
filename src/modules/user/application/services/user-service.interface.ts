import { UserEntity } from '../../domain/entities/user.entity';

export interface UserServiceInterface {
  getById(id: string): Promise<UserEntity | null>;
  getByEmail(email: string): Promise<UserEntity | null>;
}
