import { Controller, Get, Post, Req, Body, Param, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(
    private readonly authService: AuthService,
    private readonly driverService: DriverService,
  ) { }

  @Get('/logout')
  async logout(@Req() req: any) {
    try {
      console.log("退出登录")
      let id = req.user.id;
      console.log("driverid:" + id)
      await this.authService.logoutDriver(id);
      return {
        code: 0,
        data: true
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }

  @Get("/info/:id") //这里是给司机端用的，所以不能从中间件取userId，需要传递过来
  async getDriverInfoById(@Param('id') id) {
    try {
      const result = await this.driverService.getDriverInfoById(id);
      return {
        code: 0,
        data: {
          driverInfo: result,
        }
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }
}
