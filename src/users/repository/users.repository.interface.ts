import { users } from '@prisma/client';

export interface UsersRepositoryInterface {
	findByUsername(username: string): Promise<users>;
}
