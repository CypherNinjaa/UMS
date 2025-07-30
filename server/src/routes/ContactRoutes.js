const express = require("express");
const ContactController = require("../controllers/ContactController");

const router = express.Router();

// Public routes
router.post("/", ContactController.createContact);

// Admin routes (these should be protected with authentication middleware in production)
router.get("/", ContactController.getAllContacts);
router.get("/stats", ContactController.getContactStats);
router.get("/:id", ContactController.getContactById);
router.put("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

module.exports = router;
