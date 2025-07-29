import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import {
	FaClipboardCheck,
	FaBullhorn,
	FaClock,
	FaUsers,
	FaCalendarAlt,
	FaUser,
} from "react-icons/fa";

const QuickActions = ({ onActionClick }) => {
	const actions = [
		{
			key: "attendance",
			icon: FaClipboardCheck,
			label: "Mark Attendance",
			variant: "outline-primary",
		},
		{
			key: "notices",
			icon: FaBullhorn,
			label: "Post Notice",
			variant: "outline-success",
		},
		{
			key: "schedule",
			icon: FaClock,
			label: "View Schedule",
			variant: "outline-info",
		},
		{
			key: "students",
			icon: FaUsers,
			label: "Manage Students",
			variant: "outline-warning",
		},
		{
			key: "calendar",
			icon: FaCalendarAlt,
			label: "Academic Calendar",
			variant: "outline-secondary",
		},
		{
			key: "profile",
			icon: FaUser,
			label: "My Profile",
			variant: "outline-dark",
		},
	];

	return (
		<Card className="mb-4">
			<Card.Header>
				<h5 className="mb-0">Quick Actions</h5>
			</Card.Header>
			<Card.Body>
				<Row>
					{actions.map((action) => (
						<Col md={2} key={action.key}>
							<Button
								variant={action.variant}
								className="w-100 mb-2"
								onClick={() => onActionClick(action.key)}
								style={{ minHeight: "80px" }}
							>
								<action.icon className="mb-2 d-block mx-auto" size={20} />
								<small>{action.label}</small>
							</Button>
						</Col>
					))}
				</Row>
			</Card.Body>
		</Card>
	);
};

export default QuickActions;
