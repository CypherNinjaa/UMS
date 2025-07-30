const express = require("express");
const ProgramController = require("../controllers/ProgramController");

const router = express.Router();

// Get all programs with filtering and pagination
router.get("/", ProgramController.getPrograms);

// Get program statistics
router.get("/statistics", ProgramController.getProgramStatistics);

// Get unique departments
router.get("/departments", ProgramController.getDepartments);

// Get program by ID
router.get("/:id", ProgramController.getProgramById);

// Create new program
router.post("/", ProgramController.createProgram);

// Update program
router.put("/:id", ProgramController.updateProgram);

// Update enrollment
router.patch("/:id/enrollment", ProgramController.updateEnrollment);

// Toggle featured status
router.patch("/:id/featured", ProgramController.toggleFeatured);

// Delete program
router.delete("/:id", ProgramController.deleteProgram);

// Bulk delete programs
router.delete("/", ProgramController.bulkDeletePrograms);

module.exports = router;
