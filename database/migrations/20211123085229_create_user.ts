import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("user", (table: Knex.TableBuilder) => {
		table.increments("id");
		table.string("full_name").notNullable();
		table.string("username").notNullable().unique();
		table.string("password").notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("user");
}
