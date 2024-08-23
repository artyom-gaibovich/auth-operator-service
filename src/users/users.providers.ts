import { Provider } from '@nestjs/common';
import { DIConstants } from '../DIConstants';
import { UsersManager } from './manager/users.manager';
import { UsersRepository } from './repository/users.repository';

export const usersProviders: Provider[] = [
	{
		provide: DIConstants.UsersManager,
		useClass: UsersManager,
	},
	{
		provide: DIConstants.UsersRepository,
		useClass: UsersRepository,
	},
];
