import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { compare, genSalt, hash } from 'bcryptjs';
import { UsersRepositoryInterface } from '../users/repository/users.repository.interface';
import { DIConstants } from '../DIConstants';
import { AuthDto } from './dto/auth-dto';
import { UsersManagerInterface } from '../users/manager/users.manager.interface';

@Injectable()
export class AuthService {
	constructor(
		@Inject(DIConstants.UsersManager) private usersManager: UsersManagerInterface,
		@Inject(DIConstants.UsersRepository) private usersRepository: UsersRepositoryInterface,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const result = await this.usersManager.create(dto.login, await hash(dto.password, salt));
		return result;
	}

	async findUser(username: string) {
		return await this.usersRepository.findByUsername(username);
	}

	async validateUser(username: string, password: string): Promise<{ username: string }> {
		const user = await this.usersRepository.findByUsername(username);
		if (!user) {
			throw new UnauthorizedException(AuthConstants.UserNotFoundError);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(AuthConstants.WrongPasswordError);
		}
		return { username: user.username };
	}

	async login(username: string): Promise<{ access_token: string; message?: string }> {
		const payload = { username };
		const jwt_token = await this.jwtService.signAsync(payload);
		return {
			access_token: jwt_token,
		};
	}
}
