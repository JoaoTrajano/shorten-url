import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

export type GetByEmailAndPasswordUseCaseInput = {
  email: string;
  password: string;
};

@Injectable()
export class GetByEmailAndPasswordUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(input: GetByEmailAndPasswordUseCaseInput) {
    if (!input.email) return null;
    if (!input.password) return null;

    const user = await this.authService.getByEmailAndPassword(
      input.email,
      input.password,
    );

    console.log(user);
  }
}
