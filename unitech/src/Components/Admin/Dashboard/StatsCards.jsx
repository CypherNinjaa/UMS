import React from "react";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import {
	FaUsers,
	FaGraduationCap,
	FaUserGraduate,
	FaNewspaper,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa";
import useDashboard from "../../../hooks/useDashboard";

const StatsCards = () => {
	const { statistics, loading, error } = useDashboard();

	if (loading) {
		return (
			<Row>
				{[1, 2, 3, 4].map((index) => (
					<Col lg={3} md={6} className="mb-4" key={index}>
						<Card className="stats-card h-100 border-0 shadow-sm">
							<Card.Body className="text-center">
								<Spinner animation="border" size="sm" />
								<p className="mt-2 mb-0">Loading...</p>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		);
	}

	if (error) {
		return (
			<Alert variant="warning" className="mb-4">
				<strong>Unable to load statistics:</strong> {error}
			</Alert>
		);
	}

	const stats = [
		{
			title: "Total Faculty",
			value: statistics.totalFaculty,
			change: statistics.facultyChange,
			changeType: statistics.facultyChange.includes("+")
				? "increase"
				: "decrease",
			icon: FaUsers,
			color: "primary",
		},
		{
			title: "Academic Programs",
			value: statistics.totalPrograms,
			change: statistics.programsChange,
			changeType: statistics.programsChange.includes("+")
				? "increase"
				: "decrease",
			icon: FaGraduationCap,
			color: "success",
		},
		{
			title: "Total Students",
			value: statistics.totalStudents,
			change: statistics.studentsChange,
			changeType: statistics.studentsChange.includes("+")
				? "increase"
				: "decrease",
			icon: FaUserGraduate,
			color: "info",
		},
		{
			title: "Active News",
			value: statistics.activeNews,
			change: statistics.newsChange,
			changeType: statistics.newsChange.includes("+") ? "increase" : "decrease",
			icon: FaNewspaper,
			color: "warning",
		},
	];

	return (
		<Row>
			{stats.map((stat, index) => {
				const IconComponent = stat.icon;
				return (
					<Col lg={3} md={6} className="mb-4" key={index}>
						<Card className="stats-card h-100 border-0 shadow-sm">
							<Card.Body>
								<div className="d-flex align-items-center">
									<div className={`stats-icon bg-${stat.color}`}>
										<IconComponent />
									</div>
									<div className="ms-3 flex-grow-1">
										<div className="stats-value">{stat.value}</div>
										<div className="stats-title text-muted">{stat.title}</div>
									</div>
									<div
										className={`stats-change ${
											stat.changeType === "increase"
												? "text-success"
												: "text-danger"
										}`}
									>
										{stat.changeType === "increase" ? (
											<FaArrowUp className="me-1" />
										) : (
											<FaArrowDown className="me-1" />
										)}
										{stat.change}
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};

export default StatsCards;
