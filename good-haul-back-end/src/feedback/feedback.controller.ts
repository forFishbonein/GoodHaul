import { FeedbackService } from './feedback.service';
import { Controller, Get, Post, Req, Body, UnauthorizedException, InternalServerErrorException, Param } from '@nestjs/common';
import { FeedbackDto } from "./dto/feedback.dto"

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
  ) { }

  @Post('/create')
  async passwordLoginUser(@Body() feedbackDto: FeedbackDto, @Req() req: any) {
    try {
      let userId = req.user.id;
      const result = await this.feedbackService.createOneFeedback(
        feedbackDto.orderId,
        userId,
        feedbackDto.driverId,
        feedbackDto.userPhone,
        feedbackDto.content
      );
      return {
        code: 0,
        data: true
      };
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException();
    }
  }
}
