import { Entity } from '../../user.entity';

describe('Entity', () => {
  it('should create an entity with generated id, createdAt, and updatedAt', () => {
    const entity = new Entity();

    expect(entity.id).toBeDefined();
    expect(entity.createAt).toBeInstanceOf(Date);
    expect(entity.updateAt).toBeInstanceOf(Date);
  });

  it('should have different createdAt and updatedAt timestamps', () => {
    const entity = new Entity();
    entity.updateAt.setMinutes(entity.updateAt.getMinutes() + 1);
    expect(entity.createAt.getTime()).not.toEqual(entity.updateAt.getTime());
  });
});
