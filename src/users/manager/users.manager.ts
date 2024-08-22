import { UsersManagerInterface } from './users.manager.interface';
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../DIConstants';
import { PrismaService } from '../../prisma/prisma.service';

export class UsersManager implements UsersManagerInterface {
	constructor(@Inject(DIConstants.PrismaService) private prisma: PrismaService) {}

	async create(username: string, passwordHash: string): Promise<any> {
		const result = await this.prisma.users.create({
			data: { username, passwordHash },
		});
		return result;
	}
}
