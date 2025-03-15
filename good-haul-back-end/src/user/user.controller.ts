import { UserService } from './user.service';
import { Controller, Get, Post, Req, Body, UnauthorizedException, InternalServerErrorException, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { InvalidCredentialsException } from "../core/exception/myException"
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }


  @Get('/logout')
  async logout(@Req() req: any) {
    try {
      let id = req.user.id;
      console.log("userId:" + id)
      await this.authService.logoutUser(id);
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
  async getUserProfileById(@Param('id') id) {
    try {
      const result = await this.userService.getUserProfileById(id);
      return {
        code: 0,
        data: {
          userProfile: result,
        }
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }

  @Post("/modify/name")
  async modifyName(@Body() params: any, @Req() req: any) {
    try {
      let id = req.user.id;
      const result = await this.userService.modifyName(params.name, id);
      return {
        code: 0,
        data: true
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }

  @Post("/modify/gender")
  async modifyGender(@Body() params: any, @Req() req: any) {
    try {
      let id = req.user.id;
      const result = await this.userService.modifyGender(params.gender, id);
      return {
        code: 0,
        data: true
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }
  @Post("/modify/sign")
  async modifySign(@Body() params: any, @Req() req: any) {
    try {
      let id = req.user.id;
      const result = await this.userService.modifySign(params.sign, id);
      return {
        code: 0,
        data: true
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }
  @Post("/upload/sts")
  async getStsUrlAndModifyAvatar(@Body() params: any, @Req() req: any) {
    try {
      let id = req.user.id;
      const url = await this.userService.getStsUrlAndModifyAvatar(params.name, id);
      return {
        code: 0,
        data: {
          url: url
        }
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }
  @Get("/if/password")
  async checkIfHavePassword(@Req() req: any) {
    try {
      let id = req.user.id;
      const res = await this.userService.checkIfHavePassword(id);
      return {
        code: 0,
        data: res
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException(); //500
    }
  }
  @Post("/modify/password")
  async modifyPasword(@Body() params: any, @Req() req: any) {
    try {
      let id = req.user.id;
      const result = await this.userService.modifyPasword(params.prePassword, params.newPassword, id);
      return {
        code: 0,
        data: true
      };
    } catch (e) {
      console.log(e)
      throw new InvalidCredentialsException("旧密码不正确！");
    }
  }
}
