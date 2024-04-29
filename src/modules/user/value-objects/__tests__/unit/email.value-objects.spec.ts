import { Email } from '../../email.value-object';

describe('Email', () => {
  it('should create a new Email instance', () => {
    const email = new Email('test@test.com');
    expect(email.value).toBe('test@test.com');
  });

  it('should validate invalid email values', () => {
    const invalidValue = 'test.com';

    expect(Email.isValid(invalidValue)).toBeFalsy();
  });

  it('should validate valid email values', () => {
    const validValue = 'test@test.com';

    expect(Email.isValid(validValue)).toBeTruthy();
  });
});
