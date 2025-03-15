import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { config } from "./config"

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = config.SALTROUNDS; // 盐值的轮数，这里设置为 10
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

