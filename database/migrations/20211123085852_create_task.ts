import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("task", (table: Knex.TableBuilder) => {
		table.increments("id");
		table.string("title").notNullable();
		table.string("content").notNullable();
		table.bigInteger("user_id").notNullable();
		table.foreign("user_id").references("id").inTable("user");
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("task");
}
