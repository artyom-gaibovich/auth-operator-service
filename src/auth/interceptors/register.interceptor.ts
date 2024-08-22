import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AuthConstants } from '../auth.constants';

@Injectable()
export class RegisterInterceptor implements NestInterceptor {
	constructor(private readonly configService: ConfigService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const secretWord = request.body.secretWord;
		if (!secretWord) {
			throw new BadRequestException(AuthConstants.SecretWordIsNotSetError);
		}
		const words = this.configService.get('SECRET_WORDS');
		if (!words.includes(secretWord)) {
			throw new BadRequestException(AuthConstants.SecretWordIsNotCorrectError);
		}
		return next.handle();
	}
}
