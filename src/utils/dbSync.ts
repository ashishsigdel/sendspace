import sequelize from "@/config/database";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); // Use { force: true } to reset tables
    console.log("All models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default syncDatabase;
