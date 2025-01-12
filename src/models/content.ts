import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Session from "./session";

@Table({
  tableName: "Contents",
  timestamps: true,
  paranoid: true,
})
class Content extends Model {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.BIGINT })
  id!: number;

  @ForeignKey(() => Session)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    references: { model: "Sessions", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  sessionId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text!: string;
}

export default Content;
