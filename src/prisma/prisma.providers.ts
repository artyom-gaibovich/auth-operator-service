import { Provider } from '@nestjs/common';
import { DIConstants } from '../DIConstants';
import { PrismaService } from './prisma.service';

export const prismaProviders: Provider[] = [
	{
		provide: DIConstants.PrismaService,
		useClass: PrismaService,
	},
];
