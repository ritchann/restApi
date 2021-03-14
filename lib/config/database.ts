import { Sequelize } from "sequelize";

export const database = new Sequelize({
  database: "notes",
  dialect: "postgres",
  storage: ":memory:",
  username: "postgres",
  password: "123456",
});
