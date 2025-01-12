import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
// import type Content from "./content";

@Table({
  tableName: "Sessions",
  timestamps: true,
  paranoid: true,
})
class Session extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.BIGINT })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
  })
  sessionId!: string;

  @Column({
    type: DataType.ENUM("public", "private"),
    allowNull: false,
    defaultValue: "public",
  })
  visibility!: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  password!: string;

  // @HasMany(() => Content)
  // content!: Content;
}

export default Session;
