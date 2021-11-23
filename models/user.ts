export default interface User {
	id: BigInt;
	full_name: string;
	username: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}
