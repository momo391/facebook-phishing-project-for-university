import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const dataTable = pgTable("stolen_data", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email"),
  password: text("password"),
});
