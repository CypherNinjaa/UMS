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
	FaCalendarAlt,
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
		totalClasses: 0,
		todayAttendance: 0,
		pendingTasks: 0,
	});

	// Academic Calendar State
	const [calendarEvents, setCalendarEvents] = useState([]);
	const [showEventModal, setShowEventModal] = useState(false);
	const [editingEvent, setEditingEvent] = useState(null);
	const [eventForm, setEventForm] = useState({
		title: "",
		description: "",
		date: "",
		time: "",
		type: "class",
		students: [],
	});

	// Students Management State
	const [students, setStudents] = useState([]);
	const [studentFilter, setStudentFilter] = useState("");

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
		// Sample dashboard stats
		setDashboardStats({
			totalStudents: 120,
			totalClasses: 6,
			todayAttendance: 85,
			pendingTasks: 3,
		});

		// Sample calendar events
		setCalendarEvents([
			{
				id: 1,
				title: "Advanced Mathematics",
				date: "2025-07-30",
				time: "09:00",
				type: "class",
				description: "Linear Algebra Chapter 3",
			},
			{
				id: 2,
				title: "Faculty Meeting",
				date: "2025-07-31",
				time: "14:00",
				type: "meeting",
				description: "Monthly department meeting",
			},
		]);

		// Sample students
		setStudents([
			{
				id: 1,
				name: "John Doe",
				rollNumber: "CSE001",
				class: "CSE-3A",
				email: "john@example.com",
				attendance: 92,
			},
			{
				id: 2,
				name: "Jane Smith",
				rollNumber: "CSE002",
				class: "CSE-3A",
				email: "jane@example.com",
				attendance: 88,
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

	// Event Handlers for Academic Calendar
	const handleSaveEvent = () => {
		if (editingEvent) {
			setCalendarEvents(
				calendarEvents.map((event) =>
					event.id === editingEvent.id
						? { ...eventForm, id: editingEvent.id }
						: event
				)
			);
		} else {
			setCalendarEvents([...calendarEvents, { ...eventForm, id: Date.now() }]);
		}
		setShowEventModal(false);
		setEditingEvent(null);
		setEventForm({
			title: "",
			description: "",
			date: "",
			time: "",
			type: "class",
			students: [],
		});
	};

	const handleEditEvent = (event) => {
		setEditingEvent(event);
		setEventForm(event);
		setShowEventModal(true);
	};

	const handleDeleteEvent = (eventId) => {
		setCalendarEvents(calendarEvents.filter((event) => event.id !== eventId));
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

	// Academic Calendar Component
	const AcademicCalendar = () => (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<h5 className="mb-0">Academic Calendar</h5>
				<Button variant="primary" onClick={() => setShowEventModal(true)}>
					<FaPlus className="me-2" />
					Add Event
				</Button>
			</Card.Header>
			<Card.Body>
				<Table responsive hover>
					<thead>
						<tr>
							<th>Event</th>
							<th>Date</th>
							<th>Time</th>
							<th>Type</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{calendarEvents.map((event) => (
							<tr key={event.id}>
								<td>
									<div>
										<strong>{event.title}</strong>
										<br />
										<small className="text-muted">{event.description}</small>
									</div>
								</td>
								<td>{event.date}</td>
								<td>{event.time}</td>
								<td>
									<Badge bg={event.type === "class" ? "primary" : "secondary"}>
										{event.type}
									</Badge>
								</td>
								<td>
									<Button
										variant="outline-primary"
										size="sm"
										className="me-2"
										onClick={() => handleEditEvent(event)}
									>
										<FaEdit />
									</Button>
									<Button
										variant="outline-danger"
										size="sm"
										onClick={() => handleDeleteEvent(event.id)}
									>
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

	// Students Management Component
	const StudentsManagement = () => (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<h5 className="mb-0">Students Management</h5>
				<div>
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
				</div>
			</Card.Header>
			<Card.Body>
				<Table responsive hover>
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Roll Number</th>
							<th>Class</th>
							<th>Email</th>
							<th>Attendance</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{students
							.filter((student) =>
								student.name.toLowerCase().includes(studentFilter.toLowerCase())
							)
							.map((student) => (
								<tr key={student.id}>
									<td>{student.name}</td>
									<td>{student.rollNumber}</td>
									<td>
										<Badge bg="secondary">{student.class}</Badge>
									</td>
									<td>{student.email}</td>
									<td>
										<div className="d-flex align-items-center">
											<ProgressBar
												now={student.attendance}
												style={{ width: "100px", height: "8px" }}
												className="me-2"
											/>
											<small>{student.attendance}%</small>
										</div>
									</td>
									<td>
										<Button
											variant="outline-primary"
											size="sm"
											className="me-2"
										>
											<FaEye />
										</Button>
										<Button variant="outline-secondary" size="sm">
											<FaEdit />
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
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
					{activeTab === "calendar" && <AcademicCalendar />}
					{activeTab === "students" && <StudentsManagement />}
					{activeTab === "schedule" && <ClassSchedule />}
					{activeTab === "attendance" && <AttendanceManagement />}
					{activeTab === "notices" && <NoticesManagement />}
					{activeTab === "profile" && <FacultyProfile />}
				</div>

				{/* Event Modal */}
				<Modal
					show={showEventModal}
					onHide={() => setShowEventModal(false)}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>
							{editingEvent ? "Edit Event" : "Add New Event"}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Event Title</Form.Label>
										<Form.Control
											type="text"
											value={eventForm.title}
											onChange={(e) =>
												setEventForm({ ...eventForm, title: e.target.value })
											}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Event Type</Form.Label>
										<Form.Select
											value={eventForm.type}
											onChange={(e) =>
												setEventForm({ ...eventForm, type: e.target.value })
											}
										>
											<option value="class">Class</option>
											<option value="meeting">Meeting</option>
											<option value="exam">Exam</option>
											<option value="event">Event</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Date</Form.Label>
										<Form.Control
											type="date"
											value={eventForm.date}
											onChange={(e) =>
												setEventForm({ ...eventForm, date: e.target.value })
											}
										/>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Time</Form.Label>
										<Form.Control
											type="time"
											value={eventForm.time}
											onChange={(e) =>
												setEventForm({ ...eventForm, time: e.target.value })
											}
										/>
									</Form.Group>
								</Col>
								<Col md={12}>
									<Form.Group className="mb-3">
										<Form.Label>Description</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											value={eventForm.description}
											onChange={(e) =>
												setEventForm({
													...eventForm,
													description: e.target.value,
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
							onClick={() => setShowEventModal(false)}
						>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleSaveEvent}>
							{editingEvent ? "Update Event" : "Save Event"}
						</Button>
					</Modal.Footer>
				</Modal>

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

			<style jsx>{`
				.faculty-dashboard {
					background-color: #f8f9fa;
				}
			`}</style>
		</FacultyLayout>
	);
};

export default FacultyDashboard;
