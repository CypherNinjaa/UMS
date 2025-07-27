import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
	FaUsers,
	FaGraduationCap,
	FaUserGraduate,
	FaNewspaper,
	FaArrowUp,
	FaArrowDown,
} from "react-icons/fa";

const StatsCards = () => {
	const stats = [
		{
			title: "Total Faculty",
			value: "156",
			change: "+12%",
			changeType: "increase",
			icon: FaUsers,
			color: "primary",
		},
		{
			title: "Academic Programs",
			value: "24",
			change: "+3",
			changeType: "increase",
			icon: FaGraduationCap,
			color: "success",
		},
		{
			title: "Total Students",
			value: "3,847",
			change: "+8.5%",
			changeType: "increase",
			icon: FaUserGraduate,
			color: "info",
		},
		{
			title: "Active News",
			value: "18",
			change: "-2",
			changeType: "decrease",
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
