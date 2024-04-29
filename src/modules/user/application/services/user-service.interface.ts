import { UserEntity } from '../../domain/entities/user.entity';

export interface UserServiceInterface {
  getByEmail(email: string): Promise<UserEntity | null>;
}
