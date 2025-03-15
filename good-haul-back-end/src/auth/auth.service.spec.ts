import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Driver } from '../entities/driver.entity';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../core/password/password.service';
import { Repository } from 'typeorm';
import { InvalidCredentialsException } from '../core/exception/myException';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: jest.Mocked<Repository<User>>;
  let driverRepositoryMock: jest.Mocked<Repository<Driver>>;
  let passwordServiceMock: jest.Mocked<PasswordService>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(async () => {
    // 创建模拟对象
    userRepositoryMock = {
      findOne: jest.fn(),
      update: jest.fn().mockResolvedValue({}), // 模拟 update 方法
    } as any;
    driverRepositoryMock = { findOne: jest.fn() } as any;
    passwordServiceMock = {
      comparePasswords: jest.fn()
    } as any;

    jwtServiceMock = {
      sign: jest.fn()
    } as any;
    const redisClientMock = {
      setex: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
        { provide: getRepositoryToken(Driver), useValue: driverRepositoryMock }, // 确保这里的标记与实际使用的标记相匹配
        { provide: PasswordService, useValue: passwordServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: 'REDIS_CLIENT', useValue: redisClientMock },
        { provide: 'ALiYunSMSToken', useValue: {} }, // 如果也需要模拟
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should throw an error if user does not exist', async () => {
    userRepositoryMock.findOne.mockResolvedValue(null);
    await expect(authService.validateUserPassword("15015686523", "123456"))
      .rejects.toThrow(InvalidCredentialsException);
  });

  it('should throw an error if password is incorrect', async () => {
    //@ts-ignore
    userRepositoryMock.findOne.mockResolvedValue({ id: '1', phone: '15530612150', password: '$10$CrnVb.v3DWRNQxRX5.ctfOt/lAMZ.jDMG1wMLp0rovbZQre86xzRm', type: "user" });
    passwordServiceMock.comparePasswords.mockResolvedValue(false);
    await expect(authService.validateUserPassword("15530612150", "wrongPassword"))
      .rejects.toThrow(InvalidCredentialsException);
  });

  it('should return user info and token if credentials are correct', async () => {
    //@ts-ignore
    userRepositoryMock.findOne.mockResolvedValue({ id: '1', phone: '15530612150', password: '$10$CrnVb.v3DWRNQxRX5.ctfOt/lAMZ.jDMG1wMLp0rovbZQre86xzRm', type: "user" });
    passwordServiceMock.comparePasswords.mockResolvedValue(true);
    jwtServiceMock.sign.mockReturnValue('generated-jwt-token');
    const result = await authService.validateUserPassword("15530612150", "123456");
    expect(result).toEqual({
      token: 'generated-jwt-token',
      user: expect.objectContaining({
        id: '1',
        phone: '15530612150',
      })
    });
  });

  // 更多测试...
});