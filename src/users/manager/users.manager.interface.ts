export interface UsersManagerInterface {
	create(username: string, passwordHash: string): Promise<any>;
}
