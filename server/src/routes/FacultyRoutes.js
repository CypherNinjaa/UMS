const express = require("express");
const router = express.Router();
const FacultyController = require("../controllers/FacultyController");

// Faculty routes
router.get("/", FacultyController.getAllFaculty);
router.get("/statistics", FacultyController.getFacultyStatistics);
router.get("/departments", FacultyController.getDepartments);
router.get("/featured", FacultyController.getFeaturedFaculty);
router.get("/:id", FacultyController.getFacultyById);
router.post("/", FacultyController.createFaculty);
router.put("/:id", FacultyController.updateFaculty);
router.delete("/:id", FacultyController.deleteFaculty);
router.delete("/", FacultyController.bulkDeleteFaculty);
router.patch("/:id/toggle-featured", FacultyController.toggleFeatured);

module.exports = router;
