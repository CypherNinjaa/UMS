require("dotenv").config();
const { sequelize, connectToDatabase } = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const Users = require("./models/Users");
const Faculty = require("./models/Faculty");
const UserRoutes = require("./routes/UserRoutes");
const FacultyRoutes = require("./routes/FacultyRoutes");

app.get("/", (req, res) => {
	res.send("Hello Unitech!");
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/users", UserRoutes);
app.use("/api/faculty", FacultyRoutes);

// Start the server first, then try to connect to database
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

connectToDatabase()
	.then(() => {
		console.log("Database connected successfully!");

		return sequelize.sync();
	})
	.then(() => {
		console.log("Database tables synced successfully!");
	})
	.catch((error) => {
		console.error("Database connection failed:", error.message);
		console.log("Server is still running without database connection");
	});
