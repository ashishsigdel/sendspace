import { Column, DataType, Model, Table } from "sequelize-typescript";

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
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "public",
  })
  visibility!: string;

  @Column({
    type: DataType.STRING(150),
  })
  password!: string;
}

export default Session;
