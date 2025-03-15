import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor(message: string) {
    super({ message }, HttpStatus.UNAUTHORIZED); //UNAUTHORIZED就是401状态码
  }
}

export class TokenExpirationException extends HttpException {
  constructor(message: string) {
    super({ message }, HttpStatus.UNAUTHORIZED); //UNAUTHORIZED就是401状态码
  }
}
export class CodeErrorException extends HttpException {
  constructor(message: string) {
    super({ message }, HttpStatus.FORBIDDEN); //FORBIDDEN就是403状态码
  }
}

export class NotLoginException extends HttpException {
  constructor(message: string) {
    super({ message }, HttpStatus.FORBIDDEN); //FORBIDDEN就是403状态码
  }
}