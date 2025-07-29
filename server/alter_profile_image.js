const { sequelize } = require("./src/config/db");

async function alterProfileImageColumn() {
	try {
		await sequelize.authenticate();
		console.log("Connected to database");

		// Alter the table to change profileImage from VARCHAR(255) to LONGTEXT
		await sequelize.query("ALTER TABLE faculty MODIFY profileImage LONGTEXT;");
		console.log(
			"Successfully altered faculty table: profileImage column changed to LONGTEXT"
		);

		await sequelize.close();
		console.log("Database connection closed");
	} catch (error) {
		console.error("Error altering table:", error);
	}
}

alterProfileImageColumn();
