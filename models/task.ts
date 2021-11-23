export default interface Task {
	id: BigInt;
	title: string;
	content: string;
	user_id: string;
	created_at: Date;
	updated_at: Date;
}
