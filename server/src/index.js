require("dotenv").config();
const { sequelize, connectToDatabase } = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const Users = require("./models/Users");
const UserRoutes = require("./routes/UserRoutes");

app.get("/", (req, res) => {
	res.send("Hello vikash");
});

app.use(cors());
app.use(express.json());
app.use("/api/users", UserRoutes);

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
