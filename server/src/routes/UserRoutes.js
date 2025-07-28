const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.CreateUser);
router.get("/all", UserController.getAllUsers);
router.put("/edit/:id", UserController.updateUserById);
router.delete("/del/:id", UserController.deleteUserById);
router.get("/getbyid/:id", UserController.getUserID);
module.exports = router;
