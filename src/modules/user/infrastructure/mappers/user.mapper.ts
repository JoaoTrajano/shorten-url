import { Prisma } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';
import { Password } from '../../value-objects/password.value-object';
import { User as UserSchema } from '@prisma/client';

export class UserMapper {
  static toDomain(schema: Prisma.UserGetPayload<Prisma.UserArgs>): UserEntity {
    const password = new Password(schema.password).value;
    const entity = new UserEntity({
      email: schema.email,
      name: schema.name,
      password,
    });
    entity.email = schema.email;
    entity.id = schema.id;
    entity.createdAt = schema.createdAt;
    entity.updatedAt = schema.updatedAt;

    return entity;
  }

  static toPersistence(user: UserEntity): UserSchema {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
