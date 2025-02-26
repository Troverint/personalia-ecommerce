import { Sequelize } from "sequelize";
import "dotenv/config";

// Membuat instance Sequelize
const db = new Sequelize(process.env.DB_NAME, "root", "", {
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  logging: false, // Untuk menonaktifkan log query di console
});

// Fungsi untuk mengecek koneksi database
const checkDBConnection = async () => {
  try {
    await db.authenticate(); // Cek koneksi database
    console.log("Database connected successfully.");
    return { status: true };
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return { status: false, error: error.message };
  }
};

export { checkDBConnection };
export default db;
