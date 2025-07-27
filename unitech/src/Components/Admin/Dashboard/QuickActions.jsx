import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	FaPlus,
	FaUsers,
	FaGraduationCap,
	FaUserGraduate,
	FaNewspaper,
	FaFileExport,
	FaCog,
} from "react-icons/fa";

const QuickActions = () => {
	const actions = [
		{
			title: "Add Faculty",
			description: "Add new faculty member",
			icon: FaUsers,
			color: "primary",
			link: "/admin/faculty",
		},
		{
			title: "Create Program",
			description: "Add new academic program",
			icon: FaGraduationCap,
			color: "success",
		},
		{
			title: "Register Student",
			description: "Enroll new student",
			icon: FaUserGraduate,
			color: "info",
		},
		{
			title: "Post News",
			description: "Add news or announcement",
			icon: FaNewspaper,
			color: "warning",
		},
		{
			title: "Export Data",
			description: "Generate reports",
			icon: FaFileExport,
			color: "secondary",
		},
		{
			title: "Settings",
			description: "System configuration",
			icon: FaCog,
			color: "dark",
		},
	];

	return (
		<Card className="quick-actions-card h-100">
			<Card.Header className="bg-light">
				<h6 className="mb-0">
					<FaPlus className="me-2" />
					Quick Actions
				</h6>
			</Card.Header>
			<Card.Body>
				<Row>
					{actions.map((action, index) => {
						const IconComponent = action.icon;
						return (
							<Col xs={6} className="mb-3" key={index}>
								<Button
									variant={`outline-${action.color}`}
									className="quick-action-btn w-100 h-100"
									as={action.link ? Link : "button"}
									to={action.link}
								>
									<div className="text-center p-2">
										<IconComponent size={24} className="mb-2" />
										<div className="small fw-semibold">{action.title}</div>
										<div className="tiny text-muted">{action.description}</div>
									</div>
								</Button>
							</Col>
						);
					})}
				</Row>
			</Card.Body>
		</Card>
	);
};

export default QuickActions;
