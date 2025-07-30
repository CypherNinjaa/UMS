import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
	FaUsers,
	FaGraduationCap,
	FaUserGraduate,
	FaChartLine,
	FaPlus,
	FaEye,
} from "react-icons/fa";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import "./DashboardOverview.css";

const DashboardOverview = () => {
	return (
		<div className="dashboard-overview">
			{/* Page Header */}
			<div className="dashboard-header mb-4">
				<Row className="align-items-center">
					<Col>
						<h2 className="dashboard-title">Dashboard Overview</h2>
						<p className="dashboard-subtitle text-muted">
							Welcome back! Here's what's happening at EduVerse University.
						</p>
					</Col>
					
				</Row>
			</div>

			{/* Stats Cards */}
			<StatsCards />

			{/* Main Content Grid */}
			<Row className="mt-4">
				{/* Quick Actions */}
				<Col lg={12} className="mb-4">
					<QuickActions />
				</Col>

				
			</Row>

			{/* Analytics Section */}
			<Row className="mt-4">
				<Col lg={6} className="mb-4">
					<Card className="h-100">
						<Card.Header className="bg-primary text-white">
							<h6 className="mb-0">
								<FaChartLine className="me-2" />
								Enrollment Trends
							</h6>
						</Card.Header>
						<Card.Body className="text-center py-5">
							<p className="text-muted">
								Chart component will be integrated here
							</p>
							<small className="text-muted">
								Monthly enrollment statistics
							</small>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={6} className="mb-4">
					<Card className="h-100">
						<Card.Header className="bg-success text-white">
							<h6 className="mb-0">
								<FaUsers className="me-2" />
								Department Distribution
							</h6>
						</Card.Header>
						<Card.Body className="text-center py-5">
							<p className="text-muted">
								Pie chart component will be integrated here
							</p>
							<small className="text-muted">
								Faculty distribution by department
							</small>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardOverview;
