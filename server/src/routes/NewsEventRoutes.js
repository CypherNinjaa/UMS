const express = require("express");
const NewsEventController = require("../controllers/NewsEventController");

const router = express.Router();

// Get all news and events with filtering and pagination
router.get("/", NewsEventController.getNewsEvents);

// Get dashboard statistics
router.get("/statistics", NewsEventController.getDashboardStats);

// Get featured news and events
router.get("/featured", NewsEventController.getFeaturedNewsEvents);

// Get news event by ID
router.get("/:id", NewsEventController.getNewsEventById);

// Create new news event
router.post("/", NewsEventController.createNewsEvent);

// Update news event
router.put("/:id", NewsEventController.updateNewsEvent);

// Update news event status
router.patch("/:id/status", NewsEventController.updateNewsEventStatus);

// Toggle featured status
router.patch("/:id/featured", NewsEventController.toggleFeatured);

// Delete news event
router.delete("/:id", NewsEventController.deleteNewsEvent);

module.exports = router;
