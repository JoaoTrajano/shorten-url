import { Prisma } from '@prisma/client';
import { Password } from '../../value-objects/password';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(schema: Prisma.UserGetPayload<Prisma.UserArgs>): UserEntity {
    const password = new Password(schema.password).value;
    const entity = new UserEntity({
      email: schema.email,
      name: schema.name,
      password,
    });
    // entity.email = schema.email ? new Email(schema.email) : null;
    entity.id = schema.id;
    entity.createdAt = schema.createdAt;
    entity.updatedAt = schema.updatedAt;

    return entity;
  }

  // static toPersistence(user: User): UserSchema {
  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email?.value ?? null,
  //     active: user.active,
  //     inactivedAt: user.inactivedAt,
  //     type: user.type as UserTypeSchema,
  //     password: user.password.value,
  //     permissions: user.permissions as unknown as Prisma.JsonValue,
  //     document: user.document?.value ?? null,
  //     documentType: user.document?.type ?? null,
  //     createdAt: user.createdAt,
  //     updatedAt: user.updatedAt,
  //     lastLoginAt: user.lastLoginAt,
  //     totalAttemptsSendSms: user.totalAttemptsSendSms,
  //     dateBlockAttemptsSendSms: user.dateBlockAttemptsSendSms,
  //   };
  // }
}
