const { sequelize } = require("./src/config/db");

async function alterTable() {
	try {
		await sequelize.authenticate();
		console.log("Connected to database");

		// Alter the table to change id from INT to BIGINT
		await sequelize.query(
			"ALTER TABLE faculty MODIFY id BIGINT AUTO_INCREMENT;"
		);
		console.log(
			"Successfully altered faculty table: id column changed to BIGINT"
		);

		await sequelize.close();
		console.log("Database connection closed");
	} catch (error) {
		console.error("Error altering table:", error);
	}
}

alterTable();
