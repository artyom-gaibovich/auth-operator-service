import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: usersProviders,
	exports: usersProviders,
})
export class UsersModule {}
