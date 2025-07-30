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
import useDashboard from "../../../hooks/useDashboard";

const QuickActions = () => {
	const { statistics } = useDashboard();

	const handleExportData = () => {
		// Generate a CSV export with actual dashboard statistics
		const csvContent = `data:text/csv;charset=utf-8,Type,Count
Faculty,${statistics.totalFaculty}
Programs,${statistics.totalPrograms}
Students,${statistics.totalStudents}
Active News,${statistics.activeNews}`;

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute(
			"download",
			`dashboard_export_${new Date().toISOString().split("T")[0]}.csv`
		);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

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
			link: "/admin/programs",
		},
		{
			title: "Register Student",
			description: "Enroll new student",
			icon: FaUserGraduate,
			color: "info",
			link: "/admin/students",
		},
		{
			title: "Post News",
			description: "Add news or announcement",
			icon: FaNewspaper,
			color: "warning",
			link: "/admin/news",
		},
		{
			title: "Export Data",
			description: "Generate reports",
			icon: FaFileExport,
			color: "secondary",
			onClick: handleExportData,
		},
		{
			title: "Settings",
			description: "System configuration",
			icon: FaCog,
			color: "dark",
			link: "/admin/settings",
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
						const isLink = action.link;
						const hasOnClick = action.onClick;

						if (isLink) {
							return (
								<Col xs={6} className="mb-3" key={index}>
									<Button
										variant={`outline-${action.color}`}
										className="quick-action-btn w-100 h-100"
										as={Link}
										to={action.link}
									>
										<div className="text-center p-2">
											<IconComponent size={24} className="mb-2" />
											<div className="small fw-semibold">{action.title}</div>
											<div className="tiny text-muted">
												{action.description}
											</div>
										</div>
									</Button>
								</Col>
							);
						}

						return (
							<Col xs={6} className="mb-3" key={index}>
								<Button
									variant={`outline-${action.color}`}
									className="quick-action-btn w-100 h-100"
									onClick={hasOnClick ? action.onClick : undefined}
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
