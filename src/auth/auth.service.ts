import { AuthDto } from './dto/auth-dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {
	}

	/*
    async createUser(dto: AuthDto) {
      const salt = await genSalt(10);
      const newUser = new this.userModel({
        email: dto.login,
        passwordHash: await hash(dto.password, salt)
      });
      return newUser.save();
    }
  */

	/* async findUser(email: string) {
     return this.userModel.findOne({ email }).exec();
   }*/

	async validateUser(email: string, password: string): any {
		//const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(AuthConstants.UserNotFoundError);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(AuthConstants.WrongPasswordError);
		}
		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
