import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
}

export interface NoteInterface {
  id: number;
  title: string;
  content: string;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "notes",
    sequelize: database,
  }
);

Note.sync({ force: true }).then(() => console.log(""));
