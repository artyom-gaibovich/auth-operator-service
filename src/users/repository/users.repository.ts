import { UsersRepositoryInterface } from './users.repository.interface';
import { Inject } from '@nestjs/common';
import { DIConstants } from '../../DIConstants';
import { PrismaService } from '../../prisma/prisma.service';
import { users } from '@prisma/client';

export class UsersRepository implements UsersRepositoryInterface {
	constructor(@Inject(DIConstants.PrismaService) private prisma: PrismaService) {}

	findByUsername(username: string): Promise<users> {
		return this.prisma.users.findUnique({
			where: {
				username: username,
			},
		});
	}
}
