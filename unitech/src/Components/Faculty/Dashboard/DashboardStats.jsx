import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { FaUsers, FaBook, FaUserCheck, FaTasks, FaBell } from "react-icons/fa";

const DashboardStats = ({ stats }) => {
	return (
		<Row className="mb-4">
			<Col md={3}>
				<Card className="stats-card border-0 shadow-sm">
					<Card.Body className="text-center">
						<div className="stats-icon bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
							<FaUsers size={24} />
						</div>
						<h3 className="mb-1">{stats.totalStudents}</h3>
						<p className="text-muted mb-0 small">Total Students</p>
					</Card.Body>
				</Card>
			</Col>
			<Col md={3}>
				<Card className="stats-card border-0 shadow-sm">
					<Card.Body className="text-center">
						<div className="stats-icon bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
							<FaBook size={24} />
						</div>
						<h3 className="mb-1">{stats.totalClasses}</h3>
						<p className="text-muted mb-0 small">Active Classes</p>
					</Card.Body>
				</Card>
			</Col>
			<Col md={3}>
				<Card className="stats-card border-0 shadow-sm">
					<Card.Body className="text-center">
						<div className="stats-icon bg-info text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
							<FaUserCheck size={24} />
						</div>
						<h3 className="mb-1">{stats.todayAttendance}%</h3>
						<p className="text-muted mb-0 small">Today's Attendance</p>
					</Card.Body>
				</Card>
			</Col>
			<Col md={3}>
				<Card className="stats-card border-0 shadow-sm">
					<Card.Body className="text-center">
						<div className="stats-icon bg-warning text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
							<FaTasks size={24} />
						</div>
						<h3 className="mb-1">{stats.pendingTasks}</h3>
						<p className="text-muted mb-0 small">Pending Tasks</p>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default DashboardStats;
