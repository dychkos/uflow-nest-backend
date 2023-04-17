import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, VerifyTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.service.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/verify')
  verifyAuth(@Body() dto: VerifyTokenDto) {
    return this.service.verifyAuth(dto.token);
  }
}
