import { AuthService } from './auth.service';
import { Controller, Get, Post, Req, Body, UnauthorizedException, InternalServerErrorException, Param } from '@nestjs/common';
import { InvalidCredentialsException, CodeErrorException } from "../core/exception/myException"
import { UserPasswordLoginDto, UserCodeLoginDto } from './dto/user.login.dto';
import { DriverLoginDto } from './dto/driver.login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Get('/code/:phone')
  async sendSMSCode(@Param('phone') phone) {
    try {
      const result = await this.authService.sendSMSCode(phone);
      if (result) {
        return { code: 0, data: true };
      } else {
        return { code: 0, data: false };
      }
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException();
    }
  }

  @Post('/user/password/login')
  async passwordLoginUser(@Body() loginDto: UserPasswordLoginDto) {
    try {
      const { token, user } = await this.authService.validateUserPassword(loginDto.phone, loginDto.password);
      console.log("登录token：", token)
      return {
        code: 0,
        data: {
          access_token: token,
          userInfo: user
        }
      };
    } catch (e) {
      console.log(e)
      throw new InvalidCredentialsException(e.response.message);
    }
  }

  @Post('/user/code/login')
  async codeLogin(@Body() loginDto: UserCodeLoginDto) {
    try {
      const result = await this.authService.validateUserCode(loginDto.phone, loginDto.code);
      console.log("登录token：", result.token)
      return {
        code: 0,
        data: {
          access_token: result.token,
          userInfo: result.user,
          type: result.type // 是否为新注册用户
        }
      };
    } catch (e) {
      console.log(e)
      throw new CodeErrorException(e.response.message);
    }
  }

  @Post('/driver/login')
  async passwordLoginDriver(@Body() loginDto: DriverLoginDto) {
    try {
      const { token, driver } = await this.authService.validateDriver(loginDto.account, loginDto.password);
      console.log("登录token：", token)
      return {
        code: 0,
        data: {
          access_token: token,
          driverInfo: driver
        }
      };
    } catch (e) {
      console.log(e)
      throw new InvalidCredentialsException(e.response.message);
    }
  }


}
