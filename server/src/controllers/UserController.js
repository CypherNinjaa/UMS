const Users = require("../models/Users");

const UserController = {
	CreateUser: async (req, res) => {
		try {
			const { name, email, password,role} = req.body;
			console.log(name, email, password,role);

			const NewUser = await Users.create({
				name,
				email,
				password,
				role
			});
			res.status(201).json(NewUser);
		} catch (error) {
			console.log("Error: ", error);
			res.status(500).json(error);
		}
	},
	getAllUsers: async (req, res) => {
		try {
			const allUsers = await Users.findAll();
			res.status(200).json(allUsers);
		} catch (error) {
			console.log(error);
			res.json({ message: "Error in GetAllUsers." });
		}
	},
	getUserID: async (req, res) => {
		try {
			const { id } = req.params;

			const User = await Users.findByPk(id);
			if (!User) {
				return res.status(404).json({ message: "user not found" });
			}
			res.status(200).json(User);
		} catch (error) {
			console.log(error);
			res.json({ message: "Error in GetUsers." });
		}
	},

	updateUserById: async (req, res) => {
		try {
			// 1st method
			const { id } = req.params;
			// const id = req.query.params.id

			const { name, email } = req.body;

			const User = await Users.findByPk(id);

			User.name = name || User.name;
			User.email = email || User.email;
			await User.save();
			res.status(200).json({ message: "User updated successfully" });
		} catch (error) {
			console.log(error);
			res.json({ message: "Update Failed" });
		}
	},
	deleteUserById: async (req, res) => {
		try {
			// 1st method
			const { id } = req.params;
			// const id = req.query.params.id

			const User = await Users.findByPk(id);
			if (!User) {
				return res.status(404).json({ message: "user not found" });
			}
			await User.destroy();
			res.status(201).json({ message: "User deleted successfully" });
		} catch (error) {
			console.log(error);
			res.json({ message: "delete Failed" });
		}
	},
};
module.exports = UserController;
