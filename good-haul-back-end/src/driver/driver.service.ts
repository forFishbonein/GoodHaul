
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';
@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) { }
  async getDriverInfoById(id): Promise<any> {
    let result = await this.driverRepository.findOne({
      where: {
        id: id
      }
    });
    return result;
  }
}
