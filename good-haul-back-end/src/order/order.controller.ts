import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { MoveorderDto } from './dto/move-order.dto';
@Controller('order')
export class OrderController {
  //注入依赖关系
  constructor(private orderService: OrderService) { }
  // @Get()
  // async findAll(): Promise<any> {
  //   try {
  //     let result = await this.orderService.findAll();
  //     return { code: 0, data: result };
  //   } catch (error) {
  //     console.error('查询数据时出错：', error);
  //     // 如果发生错误，返回一个错误码和空数据
  //     return { status: 500, data: null };
  //   }
  // }
  @Get("/move")
  async getAllMoveOrder(): Promise<any> {
    try {
      let result = await this.orderService.getAllMoveOrder();
      return { code: 0, data: result };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
  @Get("/move/user")
  async getAllMoveOrderByUserId(@Req() req: any): Promise<any> {
    try {
      let id = req.user.id;
      console.log("userId：", id)
      let result = await this.orderService.getAllMoveOrderByUserId(id);
      return { code: 0, data: result };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
  @Get("/move/:id")
  async getMoveOrderById(@Param('id') id): Promise<any> { //这里是orderId
    try {
      let result = await this.orderService.getMoveOrderById(id);
      return { code: 0, data: result };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
  @Post("/move/create")
  async createOneMoveOrder(@Body() createOrderDto: MoveorderDto, @Req() req: any): Promise<any> {
    try {
      let id = req.user.id;
      createOrderDto.userId = id
      let result = await this.orderService.createOneMoveOrder(createOrderDto);
      return { code: 0, data: { insertedId: result.insertedId } };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
  @Get("/move/cancel/:id")
  async cancelMoveOrder(@Param('id') id): Promise<any> {
    try {
      let result = await this.orderService.cancelMoveOrder(id);
      if (result) {
        return { code: 0, data: true };
      } else {
        return { code: 0, data: false };
      }
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
  @Post("/move/payDeposit")
  async payMoveOrderDeposit(@Body() data: any): Promise<any> {
    // console.log(data.orderId)
    try {
      let result = await this.orderService.payMoveOrderDeposit(data.orderId, data.paidPrice);
      return { code: 0, data: true };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Post("/move/payRemain")
  async payMoveOrderRemain(@Body() data: any): Promise<any> {
    // console.log(data.orderId)
    try {
      let result = await this.orderService.payMoveOrderRemain(data.orderId);
      return { code: 0, data: true };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  //TODO 司机端
  @Get("/driver/grabable")
  async getGrabableOrder(@Req() req: any): Promise<any> {
    // console.log(id)
    try {
      let id = req.user.id;
      let type = req.user.driverType;
      console.log(id, type)
      let result = await this.orderService.getGrabableOrder(id, type);
      if (type == "driver") {
        return {
          code: 0, data: {
            orderList: result[0],
            carList: result[1]
          }
        };
      } else if (type == "rider") {
        return {
          code: 0, data: {
            orderList: result
          }
        };
      }
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/driver")
  async getOrderListByDriverId(@Req() req: any): Promise<any> {
    // console.log(id)
    try {
      let id = req.user.id;
      let result = await this.orderService.getOrderListByDriverId(id);
      return { code: 0, data: result };
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/driver/receive/:orderId/:carId")
  // async receiveOneOrder(@Query() query): Promise<any> { //不要用query很奇怪，出不来参数！可能是bug！
  async receiveOneOrder(@Param() params: any, @Req() req: any): Promise<any> {
    // console.log("params:" + params);
    let driverId = req.user.id;
    let type = req.user.driverType;
    try {
      let result = await this.orderService.receiveOneOrder(params.orderId, driverId, params.carId, type);
      if (result) {
        return { code: 0, data: true };
      } else {
        return { code: 0, data: false };
      }
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/driver/arrive/:id")
  async confirmArrive(@Param('id') id): Promise<any> {
    try {
      let result = await this.orderService.confirmArrive(id);
      if (result) {
        return { code: 0, data: true };
      } else {
        return { code: 0, data: false };
      }
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/driver/code/:id/:price")
  async generateCode(@Param() params): Promise<any> {
    try {
      let result = await this.orderService.generateCode(params.id, Number(params.price));
      if (result) {
        return { code: 0, data: true };
      } else {
        return { code: 0, data: false };
      }
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }

  @Get("/driver/finish/:id/:code")
  async confirmFinishOrder(@Param() params): Promise<any> {
    try {
      let result = await this.orderService.confirmFinishOrder(params.id, params.code);
      if (result) {
        return { code: 0, data: true };
      } else {
        return { code: 0, data: false };
      }
    } catch (error) {
      console.log(error)
      return { code: -1, message: "系统错误！" };
    }
  }
}
