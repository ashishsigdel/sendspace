import sequelize from "@/config/database";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); // Use { force: true } to reset tables
    console.log("✅ All models synchronized.");
  } catch (error) {
    console.log("❌ Unable to connect to the database:");
  }
};

export default syncDatabase;
