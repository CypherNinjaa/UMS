const { sequelize } = require("./src/config/db");

const addUserReferences = async () => {
	try {
		// Check if columns already exist
		const [results] = await sequelize.query(`
			SELECT COLUMN_NAME 
			FROM INFORMATION_SCHEMA.COLUMNS 
			WHERE TABLE_SCHEMA = DATABASE() 
			AND TABLE_NAME = 'Users' 
			AND COLUMN_NAME IN ('faculty_id', 'student_id');
		`);

		const existingColumns = results.map((row) => row.COLUMN_NAME);

		// Drop and recreate columns with correct data types if they exist
		if (existingColumns.includes("faculty_id")) {
			console.log(
				"ℹ️ Dropping existing faculty_id column to recreate with correct type"
			);
			await sequelize.query(`ALTER TABLE Users DROP COLUMN faculty_id;`);
		}

		if (existingColumns.includes("student_id")) {
			console.log(
				"ℹ️ Dropping existing student_id column to recreate with correct type"
			);
			await sequelize.query(`ALTER TABLE Users DROP COLUMN student_id;`);
		}

		// Add faculty_id column with correct data type (BIGINT to match faculty table)
		await sequelize.query(`
			ALTER TABLE Users 
			ADD COLUMN faculty_id BIGINT;
		`);
		console.log("✅ Added faculty_id column (BIGINT) to Users table");

		// Add student_id column with correct data type (INT to match students table)
		await sequelize.query(`
			ALTER TABLE Users 
			ADD COLUMN student_id INT;
		`);
		console.log("✅ Added student_id column (INT) to Users table");

		// Check if foreign key constraints already exist
		const [constraintResults] = await sequelize.query(`
			SELECT CONSTRAINT_NAME 
			FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
			WHERE TABLE_SCHEMA = DATABASE() 
			AND TABLE_NAME = 'Users' 
			AND CONSTRAINT_NAME IN ('fk_users_faculty', 'fk_users_student');
		`);

		const existingConstraints = constraintResults.map(
			(row) => row.CONSTRAINT_NAME
		);

		// Add foreign key constraint for faculty_id if it doesn't exist
		if (!existingConstraints.includes("fk_users_faculty")) {
			await sequelize.query(`
				ALTER TABLE Users 
				ADD CONSTRAINT fk_users_faculty 
				FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE SET NULL;
			`);
			console.log("✅ Added foreign key constraint fk_users_faculty");
		} else {
			console.log("ℹ️ Foreign key constraint fk_users_faculty already exists");
		}

		// Add foreign key constraint for student_id if it doesn't exist
		if (!existingConstraints.includes("fk_users_student")) {
			await sequelize.query(`
				ALTER TABLE Users 
				ADD CONSTRAINT fk_users_student 
				FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL;
			`);
			console.log("✅ Added foreign key constraint fk_users_student");
		} else {
			console.log("ℹ️ Foreign key constraint fk_users_student already exists");
		}

		console.log("✅ Successfully completed user references migration");
	} catch (error) {
		console.error("❌ Error adding user references:", error);

		// More specific error handling
		if (error.message.includes("doesn't exist")) {
			console.log(
				"ℹ️ Referenced table doesn't exist yet. Make sure faculty and students tables are created first."
			);
		} else if (error.message.includes("Duplicate")) {
			console.log("ℹ️ Constraints already exist, skipping...");
		}
	} finally {
		await sequelize.close();
	}
};

// Run the migration
if (require.main === module) {
	addUserReferences();
}

module.exports = addUserReferences;
