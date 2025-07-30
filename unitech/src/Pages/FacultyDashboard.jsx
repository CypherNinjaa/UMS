import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Card,
	Button,
	Table,
	Badge,
	Form,
	Modal,
	Alert,
	InputGroup,
	ProgressBar,
} from "react-bootstrap";
import {
	FaUsers,
	FaClock,
	FaClipboardCheck,
	FaBullhorn,
	FaUser,
	FaPlus,
	FaEdit,
	FaTrash,
	FaEye,
	FaSearch,
	FaUpload,
	FaBell,
	FaBook,
	FaTasks,
	FaUserCheck,
	FaGraduationCap,
	FaChartLine,
	FaCalendarWeek,
	FaPercentage,
	FaClipboardList,
	FaUserGraduate,
	FaBookOpen,
	FaAward,
} from "react-icons/fa";
import FacultyLayout from "../Components/Faculty/Layout/FacultyLayout";
import DashboardStats from "../Components/Faculty/Dashboard/DashboardStats";
import QuickActions from "../Components/Faculty/Dashboard/QuickActions";
import "../Components/Faculty/Dashboard/FacultyDashboard.css";
import { useAuth } from "../hooks/useAuth";

const FacultyDashboard = () => {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState("overview");
	const [error, setError] = useState(null);

	// State for different sections
	const [dashboardStats, setDashboardStats] = useState({
		totalStudents: 0,
		totalCourses: 0,
		todayClasses: 0,
		pendingGrading: 0,
		attendanceRate: 0,
	});

	// My Courses State
	const [myCourses, setMyCourses] = useState([]);
	const [courseFilter, setCourseFilter] = useState("");

	// Students Management State (Faculty's students only)
	const [students, setStudents] = useState([]);
	const [facultyStudents, setFacultyStudents] = useState([]);
	const [studentFilter, setStudentFilter] = useState("");
	const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
	const [performanceFilter, setPerformanceFilter] = useState("");
	const [attendanceFilter, setAttendanceFilter] = useState("");

	// Class Schedule State
	const [classSchedule, setClassSchedule] = useState([]);
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [editingSchedule, setEditingSchedule] = useState(null);
	const [scheduleForm, setScheduleForm] = useState({
		subject: "",
		class: "",
		time: "",
		duration: "",
		room: "",
		dayOfWeek: "",
	});

	// Attendance State
	const [selectedClass, setSelectedClass] = useState("");
	const [attendanceDate, setAttendanceDate] = useState(
		new Date().toISOString().split("T")[0]
	);

	// Notice State
	const [notices, setNotices] = useState([]);
	const [showNoticeModal, setShowNoticeModal] = useState(false);
	const [editingNotice, setEditingNotice] = useState(null);
	const [noticeForm, setNoticeForm] = useState({
		title: "",
		content: "",
		priority: "medium",
		targetStudents: "all",
		expiryDate: "",
	});

	// Faculty Profile State
	const [facultyProfile, setFacultyProfile] = useState({
		name: user?.name || "",
		email: user?.email || "",
		department: "",
		subjects: [],
		qualification: "",
		experience: "",
		contact: "",
		officeHours: "",
		profileImage: "",
	});

	// Sample data initialization
	useEffect(() => {
		initializeSampleData();

		// Listen for tab change events from sidebar
		const handleTabChange = (event) => {
			setActiveTab(event.detail);
		};

		window.addEventListener("changeTab", handleTabChange);

		return () => {
			window.removeEventListener("changeTab", handleTabChange);
		};
	}, []);

	const initializeSampleData = () => {
		// Sample dashboard stats (faculty-specific)
		setDashboardStats({
			totalStudents: 89, // Students in faculty's courses
			totalCourses: 4, // Courses taught by faculty
			todayClasses: 3, // Classes today
			pendingGrading: 12, // Assignments/exams to grade
			attendanceRate: 87, // Average attendance across faculty's courses
		});

		// Sample courses taught by this faculty
		setMyCourses([
			{
				id: 1,
				code: "CSE301",
				name: "Advanced Data Structures",
				section: "A",
				enrolledStudents: 32,
				schedule: "Mon, Wed, Fri 09:00-10:00",
				room: "CS-101",
				semester: "Fall 2025",
				credits: 3,
				attendanceRate: 89,
				avgGrade: 3.4,
				pendingAssignments: 5,
				nextClass: "2025-07-30 09:00",
			},
			{
				id: 2,
				code: "CSE401",
				name: "Database Management Systems",
				section: "B",
				enrolledStudents: 28,
				schedule: "Tue, Thu 11:00-12:30",
				room: "CS-102",
				semester: "Fall 2025",
				credits: 4,
				attendanceRate: 92,
				avgGrade: 3.6,
				pendingAssignments: 3,
				nextClass: "2025-07-30 11:00",
			},
			{
				id: 3,
				code: "CSE501",
				name: "Machine Learning",
				section: "A",
				enrolledStudents: 24,
				schedule: "Mon, Wed 14:00-15:30",
				room: "CS-103",
				semester: "Fall 2025",
				credits: 4,
				attendanceRate: 85,
				avgGrade: 3.2,
				pendingAssignments: 4,
				nextClass: "2025-07-30 14:00",
			},
			{
				id: 4,
				code: "CSE101",
				name: "Introduction to Programming",
				section: "C",
				enrolledStudents: 35,
				schedule: "Tue, Thu, Fri 10:00-11:00",
				room: "CS-104",
				semester: "Fall 2025",
				credits: 3,
				attendanceRate: 88,
				avgGrade: 3.1,
				pendingAssignments: 0,
				nextClass: "2025-07-30 10:00",
			},
		]);

		// Sample students from faculty's courses with detailed performance data
		setFacultyStudents([
			{
				id: 1,
				name: "John Doe",
				rollNumber: "CSE2021001",
				email: "john.doe@unitech.edu",
				enrolledCourse: "CSE301",
				section: "Section A",
				attendance: 92,
				classesAttended: 23,
				totalClasses: 25,
				currentGrade: 3.5,
				status: "active",
				lastAssignment: {
					title: "Data Structures Assignment",
					score: 18,
					total: 20,
					submittedAt: "2025-07-25",
				},
			},
			{
				id: 2,
				name: "Jane Smith",
				rollNumber: "CSE2021002",
				email: "jane.smith@unitech.edu",
				enrolledCourse: "CSE301",
				section: "Section A",
				attendance: 88,
				classesAttended: 22,
				totalClasses: 25,
				currentGrade: 3.8,
				status: "active",
				lastAssignment: {
					title: "Data Structures Assignment",
					score: 19,
					total: 20,
					submittedAt: "2025-07-24",
				},
			},
			{
				id: 3,
				name: "Mike Johnson",
				rollNumber: "CSE2021003",
				email: "mike.johnson@unitech.edu",
				enrolledCourse: "CSE401",
				section: "Section B",
				attendance: 95,
				classesAttended: 19,
				totalClasses: 20,
				currentGrade: 3.2,
				status: "active",
				lastAssignment: {
					title: "Database Design Project",
					score: 16,
					total: 20,
					submittedAt: "2025-07-26",
				},
			},
			{
				id: 4,
				name: "Sarah Wilson",
				rollNumber: "CSE2021004",
				email: "sarah.wilson@unitech.edu",
				enrolledCourse: "CSE501",
				section: "Section A",
				attendance: 78,
				classesAttended: 14,
				totalClasses: 18,
				currentGrade: 2.9,
				status: "at-risk",
				lastAssignment: {
					title: "ML Algorithm Implementation",
					score: 14,
					total: 20,
					submittedAt: "2025-07-23",
				},
			},
			{
				id: 5,
				name: "David Brown",
				rollNumber: "CSE2021005",
				email: "david.brown@unitech.edu",
				enrolledCourse: "CSE401",
				section: "Section B",
				attendance: 85,
				classesAttended: 17,
				totalClasses: 20,
				currentGrade: 3.6,
				status: "active",
				lastAssignment: {
					title: "Database Design Project",
					score: 17,
					total: 20,
					submittedAt: "2025-07-25",
				},
			},
			{
				id: 6,
				name: "Emily Davis",
				rollNumber: "CSE2021006",
				email: "emily.davis@unitech.edu",
				enrolledCourse: "CSE501",
				section: "Section A",
				attendance: 91,
				classesAttended: 16,
				totalClasses: 18,
				currentGrade: 3.7,
				status: "active",
				lastAssignment: {
					title: "ML Algorithm Implementation",
					score: 18,
					total: 20,
					submittedAt: "2025-07-26",
				},
			},
			{
				id: 7,
				name: "Robert Taylor",
				rollNumber: "CSE2021007",
				email: "robert.taylor@unitech.edu",
				enrolledCourse: "CSE101",
				section: "Section C",
				attendance: 72,
				classesAttended: 13,
				totalClasses: 18,
				currentGrade: 2.3,
				status: "at-risk",
				lastAssignment: {
					title: "Programming Fundamentals",
					score: 12,
					total: 20,
					submittedAt: "2025-07-22",
				},
			},
			{
				id: 8,
				name: "Lisa Anderson",
				rollNumber: "CSE2021008",
				email: "lisa.anderson@unitech.edu",
				enrolledCourse: "CSE301",
				section: "Section A",
				attendance: 94,
				classesAttended: 24,
				totalClasses: 25,
				currentGrade: 3.9,
				status: "active",
				lastAssignment: {
					title: "Data Structures Assignment",
					score: 20,
					total: 20,
					submittedAt: "2025-07-27",
				},
			},
		]);

		// Sample students (legacy - for compatibility)
		setStudents([
			{
				id: 1,
				name: "John Doe",
				studentId: "CSE001",
				email: "john@example.com",
				courses: ["CSE301", "CSE401"],
				overallAttendance: 92,
				averageGrade: 3.5,
				pendingSubmissions: 2,
				lastActive: "2025-07-29",
			},
			{
				id: 2,
				name: "Jane Smith",
				studentId: "CSE002",
				email: "jane@example.com",
				courses: ["CSE301", "CSE501"],
				overallAttendance: 88,
				averageGrade: 3.8,
				pendingSubmissions: 1,
				lastActive: "2025-07-29",
			},
			{
				id: 3,
				name: "Mike Johnson",
				studentId: "CSE003",
				email: "mike@example.com",
				courses: ["CSE101", "CSE401"],
				overallAttendance: 95,
				averageGrade: 3.2,
				pendingSubmissions: 0,
				lastActive: "2025-07-30",
			},
		]);

		// Sample class schedule
		setClassSchedule([
			{
				id: 1,
				subject: "Advanced Mathematics",
				class: "CSE-3A",
				time: "09:00-10:00",
				room: "Room 101",
				dayOfWeek: "Monday",
			},
			{
				id: 2,
				subject: "Data Structures",
				class: "CSE-3B",
				time: "11:00-12:00",
				room: "Room 102",
				dayOfWeek: "Tuesday",
			},
		]);

		// Sample notices
		setNotices([
			{
				id: 1,
				title: "Assignment Submission Reminder",
				content: "Please submit your assignments by Friday.",
				priority: "high",
				createdAt: "2025-07-29",
				targetStudents: "CSE-3A",
			},
		]);
	};

	// Event Handlers for Class Schedule
	const handleSaveSchedule = () => {
		if (editingSchedule) {
			setClassSchedule(
				classSchedule.map((schedule) =>
					schedule.id === editingSchedule.id
						? { ...scheduleForm, id: editingSchedule.id }
						: schedule
				)
			);
		} else {
			setClassSchedule([...classSchedule, { ...scheduleForm, id: Date.now() }]);
		}
		setShowScheduleModal(false);
		setEditingSchedule(null);
		setScheduleForm({
			subject: "",
			class: "",
			time: "",
			duration: "",
			room: "",
			dayOfWeek: "",
		});
	};

	// Event Handlers for Notice
	const handleSaveNotice = () => {
		if (editingNotice) {
			setNotices(
				notices.map((notice) =>
					notice.id === editingNotice.id
						? { ...noticeForm, id: editingNotice.id }
						: notice
				)
			);
		} else {
			setNotices([
				...notices,
				{
					...noticeForm,
					id: Date.now(),
					createdAt: new Date().toISOString().split("T")[0],
				},
			]);
		}
		setShowNoticeModal(false);
		setEditingNotice(null);
		setNoticeForm({
			title: "",
			content: "",
			priority: "medium",
			targetStudents: "all",
			expiryDate: "",
		});
	};

	// Event Handlers for Attendance
	const handleMarkAttendance = (studentId, status) => {
		// Implementation for marking attendance
		console.log(`Marking ${status} for student ${studentId}`);
	};

	// Dashboard Overview Component
	const DashboardOverview = () => (
		<div className="dashboard-overview">
			{/* Welcome Header */}
			<div className="welcome-header mb-4">
				<Row className="align-items-center">
					<Col>
						<h2 className="mb-1">Welcome back, {user?.name || "Faculty"}!</h2>
						<p className="mb-0">
							Here's what's happening in your classes today.
						</p>
					</Col>
					<Col xs="auto">
						<Badge bg="success" className="fs-6 p-2">
							<FaBell className="me-2" />
							{dashboardStats.pendingTasks} pending tasks
						</Badge>
					</Col>
				</Row>
			</div>

			{/* Stats Cards */}
			<DashboardStats stats={dashboardStats} />

			{/* Quick Actions */}
			<QuickActions onActionClick={setActiveTab} />

			{/* Recent Activity */}
			<Row>
				<Col md={6}>
					<Card>
						<Card.Header>
							<h6 className="mb-0">Today's Schedule</h6>
						</Card.Header>
						<Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
							{classSchedule.slice(0, 3).map((schedule) => (
								<div
									key={schedule.id}
									className="d-flex align-items-center mb-3"
								>
									<div className="me-3">
										<div className="bg-primary text-white rounded p-2">
											<FaClock size={16} />
										</div>
									</div>
									<div className="flex-grow-1">
										<h6 className="mb-1">{schedule.subject}</h6>
										<small className="text-muted">
											{schedule.class} • {schedule.time} • {schedule.room}
										</small>
									</div>
								</div>
							))}
						</Card.Body>
					</Card>
				</Col>
				<Col md={6}>
					<Card>
						<Card.Header>
							<h6 className="mb-0">Recent Notices</h6>
						</Card.Header>
						<Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
							{notices.slice(0, 3).map((notice) => (
								<div key={notice.id} className="d-flex align-items-start mb-3">
									<div className="me-3">
										<Badge
											bg={
												notice.priority === "high"
													? "danger"
													: notice.priority === "medium"
													? "warning"
													: "info"
											}
											className="p-2"
										>
											<FaBullhorn size={12} />
										</Badge>
									</div>
									<div className="flex-grow-1">
										<h6 className="mb-1">{notice.title}</h6>
										<small className="text-muted">{notice.createdAt}</small>
									</div>
								</div>
							))}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);

	// My Courses Component
	const MyCoursesManagement = () => (
		<div className="my-courses">
			<Row className="mb-4">
				<Col>
					<h4 className="mb-3">My Courses - Fall 2025</h4>
				</Col>
				<Col xs="auto">
					<InputGroup style={{ width: "300px" }}>
						<InputGroup.Text>
							<FaSearch />
						</InputGroup.Text>
						<Form.Control
							type="text"
							placeholder="Search courses..."
							value={courseFilter}
							onChange={(e) => setCourseFilter(e.target.value)}
						/>
					</InputGroup>
				</Col>
			</Row>

			{/* Course Cards */}
			<Row>
				{myCourses
					.filter(
						(course) =>
							course.name.toLowerCase().includes(courseFilter.toLowerCase()) ||
							course.code.toLowerCase().includes(courseFilter.toLowerCase())
					)
					.map((course) => (
						<Col lg={6} className="mb-4" key={course.id}>
							<Card
								className="h-100 course-card"
								style={{ transition: "all 0.3s ease" }}
							>
								<Card.Header className="bg-primary text-white">
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<h6 className="mb-0">
												{course.code} - {course.section}
											</h6>
											<small>{course.name}</small>
										</div>
										<Badge bg="light" text="dark">
											{course.credits} Credits
										</Badge>
									</div>
								</Card.Header>
								<Card.Body>
									<Row className="mb-3">
										<Col md={6}>
											<div className="course-stat d-flex align-items-center">
												<FaUsers className="text-primary me-2" />
												<strong>{course.enrolledStudents}</strong> Students
											</div>
										</Col>
										<Col md={6}>
											<div className="course-stat d-flex align-items-center">
												<FaPercentage className="text-success me-2" />
												<strong>{course.attendanceRate}%</strong> Attendance
											</div>
										</Col>
									</Row>
									<Row className="mb-3">
										<Col md={6}>
											<div className="course-stat d-flex align-items-center">
												<FaAward className="text-warning me-2" />
												Avg Grade: <strong>{course.avgGrade}/4.0</strong>
											</div>
										</Col>
										<Col md={6}>
											<div className="course-stat d-flex align-items-center">
												<FaClipboardList className="text-danger me-2" />
												<strong>{course.pendingAssignments}</strong> Pending
											</div>
										</Col>
									</Row>
									<div className="mb-3">
										<small className="text-muted d-flex align-items-center">
											<FaClock className="me-1" />
											{course.schedule}
										</small>
										<small className="text-muted d-flex align-items-center mt-1">
											📍 {course.room}
										</small>
									</div>
									<div className="d-flex justify-content-between align-items-center">
										<small className="text-muted">
											Next Class: {new Date(course.nextClass).toLocaleString()}
										</small>
									</div>
								</Card.Body>
								<Card.Footer>
									<Row>
										<Col>
											<Button
												variant="outline-primary"
												size="sm"
												className="w-100"
											>
												<FaEye className="me-1" />
												View Details
											</Button>
										</Col>
										<Col>
											<Button
												variant="outline-success"
												size="sm"
												className="w-100"
											>
												<FaClipboardCheck className="me-1" />
												Take Attendance
											</Button>
										</Col>
										<Col>
											<Button
												variant="outline-warning"
												size="sm"
												className="w-100"
											>
												<FaEdit className="me-1" />
												Manage
											</Button>
										</Col>
									</Row>
								</Card.Footer>
							</Card>
						</Col>
					))}
			</Row>

			{/* Quick Stats */}
			<Card className="mt-4">
				<Card.Header>
					<h6 className="mb-0">Teaching Overview</h6>
				</Card.Header>
				<Card.Body>
					<Row>
						<Col md={3}>
							<div className="text-center">
								<FaGraduationCap size={24} className="text-primary mb-2" />
								<h5>
									{myCourses.reduce(
										(acc, course) => acc + course.enrolledStudents,
										0
									)}
								</h5>
								<small className="text-muted">Total Students</small>
							</div>
						</Col>
						<Col md={3}>
							<div className="text-center">
								<FaBook size={24} className="text-success mb-2" />
								<h5>{myCourses.length}</h5>
								<small className="text-muted">Active Courses</small>
							</div>
						</Col>
						<Col md={3}>
							<div className="text-center">
								<FaChartLine size={24} className="text-warning mb-2" />
								<h5>
									{(
										myCourses.reduce(
											(acc, course) => acc + course.attendanceRate,
											0
										) / myCourses.length
									).toFixed(1)}
									%
								</h5>
								<small className="text-muted">Avg Attendance</small>
							</div>
						</Col>
						<Col md={3}>
							<div className="text-center">
								<FaClipboardList size={24} className="text-danger mb-2" />
								<h5>
									{myCourses.reduce(
										(acc, course) => acc + course.pendingAssignments,
										0
									)}
								</h5>
								<small className="text-muted">Pending Grading</small>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</div>
	);

	// Students Management Component (Faculty's Students Only)
	const StudentsManagement = () => (
		<div className="students-management">
			<Row className="mb-4">
				<Col>
					<h4 className="mb-3">My Students ({facultyStudents.length})</h4>
				</Col>
				<Col xs="auto">
					<InputGroup style={{ width: "300px" }}>
						<InputGroup.Text>
							<FaSearch />
						</InputGroup.Text>
						<Form.Control
							type="text"
							placeholder="Search students..."
							value={studentFilter}
							onChange={(e) => setStudentFilter(e.target.value)}
						/>
					</InputGroup>
				</Col>
			</Row>

			{/* Filter by Course */}
			<Row className="mb-4">
				<Col md={4}>
					<Form.Select
						value={selectedCourseFilter}
						onChange={(e) => setSelectedCourseFilter(e.target.value)}
					>
						<option value="">All Courses</option>
						{myCourses.map((course) => (
							<option key={course.id} value={course.code}>
								{course.code} - {course.name}
							</option>
						))}
					</Form.Select>
				</Col>
				<Col md={4}>
					<Form.Select
						value={performanceFilter}
						onChange={(e) => setPerformanceFilter(e.target.value)}
					>
						<option value="">All Performance Levels</option>
						<option value="excellent">Excellent (3.5+)</option>
						<option value="good">Good (2.5-3.5)</option>
						<option value="needs-improvement">
							Needs Improvement (&lt;2.5)
						</option>
					</Form.Select>
				</Col>
				<Col md={4}>
					<Form.Select
						value={attendanceFilter}
						onChange={(e) => setAttendanceFilter(e.target.value)}
					>
						<option value="">All Attendance Levels</option>
						<option value="excellent">Excellent (90%+)</option>
						<option value="good">Good (75-90%)</option>
						<option value="poor">Poor (&lt;75%)</option>
					</Form.Select>
				</Col>
			</Row>

			{/* Students Table */}
			<Card>
				<Card.Header>
					<div className="d-flex justify-content-between align-items-center">
						<h6 className="mb-0">Student Performance Overview</h6>
						<Button variant="outline-primary" size="sm">
							<FaDownload className="me-1" />
							Export Report
						</Button>
					</div>
				</Card.Header>
				<Card.Body className="p-0">
					<Table responsive striped hover>
						<thead>
							<tr>
								<th>Student</th>
								<th>Course</th>
								<th>Attendance</th>
								<th>Current Grade</th>
								<th>Last Assignment</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{facultyStudents
								.filter((student) => {
									const nameMatch =
										student.name
											.toLowerCase()
											.includes(studentFilter.toLowerCase()) ||
										student.email
											.toLowerCase()
											.includes(studentFilter.toLowerCase()) ||
										student.rollNumber
											.toLowerCase()
											.includes(studentFilter.toLowerCase());

									const courseMatch =
										!selectedCourseFilter ||
										student.enrolledCourse === selectedCourseFilter;

									const performanceMatch =
										!performanceFilter ||
										(performanceFilter === "excellent" &&
											student.currentGrade >= 3.5) ||
										(performanceFilter === "good" &&
											student.currentGrade >= 2.5 &&
											student.currentGrade < 3.5) ||
										(performanceFilter === "needs-improvement" &&
											student.currentGrade < 2.5);

									const attendanceMatch =
										!attendanceFilter ||
										(attendanceFilter === "excellent" &&
											student.attendance >= 90) ||
										(attendanceFilter === "good" &&
											student.attendance >= 75 &&
											student.attendance < 90) ||
										(attendanceFilter === "poor" && student.attendance < 75);

									return (
										nameMatch &&
										courseMatch &&
										performanceMatch &&
										attendanceMatch
									);
								})
								.map((student) => (
									<tr key={student.id}>
										<td>
											<div>
												<strong>{student.name}</strong>
												<br />
												<small className="text-muted">
													{student.rollNumber}
												</small>
												<br />
												<small className="text-muted">{student.email}</small>
											</div>
										</td>
										<td>
											<Badge bg="primary">{student.enrolledCourse}</Badge>
											<br />
											<small className="text-muted">{student.section}</small>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<div className="me-2">
													{student.attendance >= 90 ? (
														<FaCheckCircle className="text-success" />
													) : student.attendance >= 75 ? (
														<FaExclamationTriangle className="text-warning" />
													) : (
														<FaTimesCircle className="text-danger" />
													)}
												</div>
												<div>
													<strong>{student.attendance}%</strong>
													<br />
													<small className="text-muted">
														{student.classesAttended}/{student.totalClasses}{" "}
														classes
													</small>
												</div>
											</div>
										</td>
										<td>
											<div>
												<strong>{student.currentGrade.toFixed(2)}/4.0</strong>
												<br />
												<Badge
													bg={
														student.currentGrade >= 3.5
															? "success"
															: student.currentGrade >= 2.5
															? "warning"
															: "danger"
													}
												>
													{student.currentGrade >= 3.5
														? "Excellent"
														: student.currentGrade >= 2.5
														? "Good"
														: "Needs Improvement"}
												</Badge>
											</div>
										</td>
										<td>
											<div>
												<strong>{student.lastAssignment.title}</strong>
												<br />
												<small className="text-muted">
													Score: {student.lastAssignment.score}/
													{student.lastAssignment.total}
												</small>
												<br />
												<small className="text-muted">
													{new Date(
														student.lastAssignment.submittedAt
													).toLocaleDateString()}
												</small>
											</div>
										</td>
										<td>
											<Badge
												bg={
													student.status === "active"
														? "success"
														: student.status === "at-risk"
														? "warning"
														: "danger"
												}
											>
												{student.status === "active"
													? "Active"
													: student.status === "at-risk"
													? "At Risk"
													: "Inactive"}
											</Badge>
										</td>
										<td>
											<Dropdown>
												<Dropdown.Toggle variant="outline-secondary" size="sm">
													<FaEllipsisV />
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item>
														<FaEye className="me-2" />
														View Details
													</Dropdown.Item>
													<Dropdown.Item>
														<FaEdit className="me-2" />
														Update Grade
													</Dropdown.Item>
													<Dropdown.Item>
														<FaComments className="me-2" />
														Send Message
													</Dropdown.Item>
													<Dropdown.Divider />
													<Dropdown.Item>
														<FaChartLine className="me-2" />
														Performance Report
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>

			{/* Students Performance Summary */}
			<Row className="mt-4">
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<FaUserGraduate size={24} className="text-success mb-2" />
							<h5>
								{facultyStudents.filter((s) => s.currentGrade >= 3.5).length}
							</h5>
							<small className="text-muted">Excellent Students</small>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<FaExclamationTriangle size={24} className="text-warning mb-2" />
							<h5>
								{facultyStudents.filter((s) => s.status === "at-risk").length}
							</h5>
							<small className="text-muted">At Risk Students</small>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<FaPercentage size={24} className="text-info mb-2" />
							<h5>
								{(
									facultyStudents.reduce((acc, s) => acc + s.attendance, 0) /
									facultyStudents.length
								).toFixed(1)}
								%
							</h5>
							<small className="text-muted">Avg Attendance</small>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="text-center">
						<Card.Body>
							<FaChartLine size={24} className="text-primary mb-2" />
							<h5>
								{(
									facultyStudents.reduce((acc, s) => acc + s.currentGrade, 0) /
									facultyStudents.length
								).toFixed(2)}
							</h5>
							<small className="text-muted">Avg Grade</small>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);

	// Class Schedule Component
	const ClassSchedule = () => (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<h5 className="mb-0">Class Schedule</h5>
				<Button variant="primary" onClick={() => setShowScheduleModal(true)}>
					<FaPlus className="me-2" />
					Add Schedule
				</Button>
			</Card.Header>
			<Card.Body>
				<Table responsive hover>
					<thead>
						<tr>
							<th>Subject</th>
							<th>Class</th>
							<th>Day</th>
							<th>Time</th>
							<th>Room</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{classSchedule.map((schedule) => (
							<tr key={schedule.id}>
								<td>
									<strong>{schedule.subject}</strong>
								</td>
								<td>
									<Badge bg="primary">{schedule.class}</Badge>
								</td>
								<td>{schedule.dayOfWeek}</td>
								<td>{schedule.time}</td>
								<td>{schedule.room}</td>
								<td>
									<Button variant="outline-primary" size="sm" className="me-2">
										<FaEdit />
									</Button>
									<Button variant="outline-danger" size="sm">
										<FaTrash />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);

	// Attendance Management Component
	const AttendanceManagement = () => (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<h5 className="mb-0">Attendance Management</h5>
				<div className="d-flex gap-2">
					<Form.Select
						value={selectedClass}
						onChange={(e) => setSelectedClass(e.target.value)}
						style={{ width: "200px" }}
					>
						<option value="">Select Class</option>
						<option value="CSE-3A">CSE-3A</option>
						<option value="CSE-3B">CSE-3B</option>
					</Form.Select>
					<Form.Control
						type="date"
						value={attendanceDate}
						onChange={(e) => setAttendanceDate(e.target.value)}
						style={{ width: "150px" }}
					/>
				</div>
			</Card.Header>
			<Card.Body>
				{selectedClass ? (
					<Table responsive hover>
						<thead>
							<tr>
								<th>Student Name</th>
								<th>Roll Number</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{students
								.filter((student) => student.class === selectedClass)
								.map((student) => (
									<tr key={student.id}>
										<td>{student.name}</td>
										<td>{student.rollNumber}</td>
										<td>
											<Badge bg="success">Present</Badge>
										</td>
										<td>
											<Button
												variant="success"
												size="sm"
												className="me-2"
												onClick={() =>
													handleMarkAttendance(student.id, "present")
												}
											>
												<FaUserCheck /> Present
											</Button>
											<Button
												variant="danger"
												size="sm"
												onClick={() =>
													handleMarkAttendance(student.id, "absent")
												}
											>
												<FaUserCheck /> Absent
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				) : (
					<div className="text-center py-4 text-muted">
						<FaClipboardCheck size={48} className="mb-3" />
						<p>Please select a class to mark attendance</p>
					</div>
				)}
			</Card.Body>
		</Card>
	);

	// Notices Management Component
	const NoticesManagement = () => (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<h5 className="mb-0">Notice Management</h5>
				<Button variant="primary" onClick={() => setShowNoticeModal(true)}>
					<FaPlus className="me-2" />
					Create Notice
				</Button>
			</Card.Header>
			<Card.Body>
				<Table responsive hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Priority</th>
							<th>Target</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{notices.map((notice) => (
							<tr key={notice.id}>
								<td>
									<strong>{notice.title}</strong>
									<br />
									<small className="text-muted">
										{notice.content.substring(0, 50)}...
									</small>
								</td>
								<td>
									<Badge
										bg={
											notice.priority === "high"
												? "danger"
												: notice.priority === "medium"
												? "warning"
												: "info"
										}
									>
										{notice.priority}
									</Badge>
								</td>
								<td>{notice.targetStudents}</td>
								<td>{notice.createdAt}</td>
								<td>
									<Button variant="outline-primary" size="sm" className="me-2">
										<FaEdit />
									</Button>
									<Button variant="outline-danger" size="sm">
										<FaTrash />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);

	// Faculty Profile Component
	const FacultyProfile = () => (
		<Card>
			<Card.Header>
				<h5 className="mb-0">Faculty Profile</h5>
			</Card.Header>
			<Card.Body>
				<Row>
					<Col md={4}>
						<div className="text-center mb-4">
							<div
								className="profile-image-placeholder mx-auto mb-3 bg-light d-flex align-items-center justify-content-center rounded-circle"
								style={{ width: "150px", height: "150px" }}
							>
								<FaUser size={60} className="text-muted" />
							</div>
							<Button variant="outline-primary" size="sm">
								<FaUpload className="me-2" />
								Upload Photo
							</Button>
						</div>
					</Col>
					<Col md={8}>
						<Form>
							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Full Name</Form.Label>
										<Form.Control
											type="text"
											value={facultyProfile.name}
											onChange={(e) =>
												setFacultyProfile({
													...facultyProfile,
													name: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											value={facultyProfile.email}
											onChange={(e) =>
												setFacultyProfile({
													...facultyProfile,
													email: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Department</Form.Label>
										<Form.Select
											value={facultyProfile.department}
											onChange={(e) =>
												setFacultyProfile({
													...facultyProfile,
													department: e.target.value,
												})
											}
										>
											<option value="">Select Department</option>
											<option value="Computer Science">Computer Science</option>
											<option value="Mathematics">Mathematics</option>
											<option value="Physics">Physics</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Contact Number</Form.Label>
										<Form.Control
											type="tel"
											value={facultyProfile.contact}
											onChange={(e) =>
												setFacultyProfile({
													...facultyProfile,
													contact: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={12}>
									<Form.Group className="mb-3">
										<Form.Label>Qualification</Form.Label>
										<Form.Control
											as="textarea"
											rows={2}
											value={facultyProfile.qualification}
											onChange={(e) =>
												setFacultyProfile({
													...facultyProfile,
													qualification: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={12}>
									<Form.Group className="mb-3">
										<Form.Label>Office Hours</Form.Label>
										<Form.Control
											type="text"
											placeholder="e.g., Mon-Fri 2:00 PM - 4:00 PM"
											value={facultyProfile.officeHours}
											onChange={(e) =>
												setFacultyProfile({
													...facultyProfile,
													officeHours: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Button variant="primary">Save Profile</Button>
						</Form>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);

	return (
		<FacultyLayout>
			<div className="faculty-dashboard">
				{/* Error Alert */}
				{error && (
					<Alert variant="danger" dismissible onClose={() => setError(null)}>
						{error}
					</Alert>
				)}

				{/* Dynamic Content Based on Active Tab */}
				<div className="tab-content">
					{activeTab === "overview" && <DashboardOverview />}
					{activeTab === "courses" && <MyCoursesManagement />}
					{activeTab === "students" && <StudentsManagement />}
					{activeTab === "schedule" && <ClassSchedule />}
					{activeTab === "attendance" && <AttendanceManagement />}
					{activeTab === "notices" && <NoticesManagement />}
					{activeTab === "profile" && <FacultyProfile />}
				</div>

				{/* Schedule Modal */}
				<Modal
					show={showScheduleModal}
					onHide={() => setShowScheduleModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Add Class Schedule</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Subject</Form.Label>
										<Form.Control
											type="text"
											value={scheduleForm.subject}
											onChange={(e) =>
												setScheduleForm({
													...scheduleForm,
													subject: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Class</Form.Label>
										<Form.Select
											value={scheduleForm.class}
											onChange={(e) =>
												setScheduleForm({
													...scheduleForm,
													class: e.target.value,
												})
											}
										>
											<option value="">Select Class</option>
											<option value="CSE-3A">CSE-3A</option>
											<option value="CSE-3B">CSE-3B</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Day of Week</Form.Label>
										<Form.Select
											value={scheduleForm.dayOfWeek}
											onChange={(e) =>
												setScheduleForm({
													...scheduleForm,
													dayOfWeek: e.target.value,
												})
											}
										>
											<option value="">Select Day</option>
											<option value="Monday">Monday</option>
											<option value="Tuesday">Tuesday</option>
											<option value="Wednesday">Wednesday</option>
											<option value="Thursday">Thursday</option>
											<option value="Friday">Friday</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Time</Form.Label>
										<Form.Control
											type="text"
											placeholder="e.g., 09:00-10:00"
											value={scheduleForm.time}
											onChange={(e) =>
												setScheduleForm({
													...scheduleForm,
													time: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={12}>
									<Form.Group className="mb-3">
										<Form.Label>Room</Form.Label>
										<Form.Control
											type="text"
											value={scheduleForm.room}
											onChange={(e) =>
												setScheduleForm({
													...scheduleForm,
													room: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowScheduleModal(false)}
						>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleSaveSchedule}>
							Save Schedule
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Notice Modal */}
				<Modal
					show={showNoticeModal}
					onHide={() => setShowNoticeModal(false)}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>Create Notice</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Row>
								<Col md={8}>
									<Form.Group className="mb-3">
										<Form.Label>Notice Title</Form.Label>
										<Form.Control
											type="text"
											value={noticeForm.title}
											onChange={(e) =>
												setNoticeForm({ ...noticeForm, title: e.target.value })
											}
										/>
									</Form.Group>
								</Col>
								<Col md={4}>
									<Form.Group className="mb-3">
										<Form.Label>Priority</Form.Label>
										<Form.Select
											value={noticeForm.priority}
											onChange={(e) =>
												setNoticeForm({
													...noticeForm,
													priority: e.target.value,
												})
											}
										>
											<option value="low">Low</option>
											<option value="medium">Medium</option>
											<option value="high">High</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Target Students</Form.Label>
										<Form.Select
											value={noticeForm.targetStudents}
											onChange={(e) =>
												setNoticeForm({
													...noticeForm,
													targetStudents: e.target.value,
												})
											}
										>
											<option value="all">All Students</option>
											<option value="CSE-3A">CSE-3A</option>
											<option value="CSE-3B">CSE-3B</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Expiry Date</Form.Label>
										<Form.Control
											type="date"
											value={noticeForm.expiryDate}
											onChange={(e) =>
												setNoticeForm({
													...noticeForm,
													expiryDate: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
								<Col md={12}>
									<Form.Group className="mb-3">
										<Form.Label>Notice Content</Form.Label>
										<Form.Control
											as="textarea"
											rows={5}
											value={noticeForm.content}
											onChange={(e) =>
												setNoticeForm({
													...noticeForm,
													content: e.target.value,
												})
											}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowNoticeModal(false)}
						>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleSaveNotice}>
							Publish Notice
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</FacultyLayout>
	);
};

export default FacultyDashboard;
