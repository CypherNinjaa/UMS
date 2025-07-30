const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

// Student routes
router.get("/", StudentController.getAllStudents);
router.get("/statistics", StudentController.getStudentStatistics);
router.get("/programs", StudentController.getPrograms);
router.get("/featured", StudentController.getFeaturedStudents);
router.get("/:id", StudentController.getStudentById);
router.post("/", StudentController.createStudent);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);
router.delete("/", StudentController.bulkDeleteStudents);
router.patch("/:id/status", StudentController.updateStudentStatus);
router.patch("/:id/gpa", StudentController.updateGPA);
router.patch("/:id/toggle-featured", StudentController.toggleFeatured);

module.exports = router;
