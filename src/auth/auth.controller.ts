import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	Post, UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth-dto';
import { AuthConstants } from './auth.constants';
import { AuthService } from './auth.service';
import { RegisterInterceptor } from './interceptors/register.interceptor';
import { JwtAuthGuard } from './guards/jwt-guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseInterceptors(RegisterInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto): Promise<any> {
		const oldUser = await this.authService.findUser(dto.login);
		if (oldUser) {
			throw new BadRequestException(AuthConstants.AlreadyRegisteredError);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto): Promise<any> {
		const { username } = await this.authService.validateUser(login, password);
		return this.authService.login(username);
	}

	@UseGuards(JwtAuthGuard)
	@Get('check')
	async check() {
		return 'Доступ есть.';
	}
}
