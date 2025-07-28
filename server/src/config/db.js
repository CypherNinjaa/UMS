require("dotenv").config(); // <-- Load .env variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		port: process.env.DB_PORT,
		logging: console.log,
	}
);

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.log("Unable to connect to the database:", error);
		throw error;
	}
};

module.exports = { sequelize, connectToDatabase };
