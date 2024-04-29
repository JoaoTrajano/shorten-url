import { Entity } from '../../user.entity';

describe('Entity', () => {
  it('should create an entity with generated id, createdAt, and updatedAt', () => {
    const entity = new Entity();

    expect(entity.id).toBeDefined();
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
  });

  it('should have different createdAt and updatedAt timestamps', () => {
    const entity = new Entity();
    entity.updatedAt.setMinutes(entity.updatedAt.getMinutes() + 1);
    expect(entity.createdAt.getTime()).not.toEqual(entity.updatedAt.getTime());
  });
});
