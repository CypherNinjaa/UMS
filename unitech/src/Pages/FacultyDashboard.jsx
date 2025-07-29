import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import FacultyLayout from "../Components/Faculty/Layout/FacultyLayout";

const FacultyDashboard = () => {
	return (
		<FacultyLayout>
			<div style={{ width: "100%", margin: 0, padding: 0 }}>
				<h2>Faculty Dashboard</h2>
				<p className="mb-4">
					Welcome to the faculty dashboard. Here you can manage your courses,
					view student progress, and access faculty resources.
				</p>

				<Row
					className="mb-4"
					style={{ marginRight: 0, marginLeft: 0, width: "100%" }}
				>
					<Col md={4}>
						<Card className="text-white bg-primary mb-3">
							<Card.Body>
								<Card.Title>Courses</Card.Title>
								<Card.Text>5 Active</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4}>
						<Card className="text-white bg-success mb-3">
							<Card.Body>
								<Card.Title>Students</Card.Title>
								<Card.Text>150 Enrolled</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4}>
						<Card className="text-white bg-warning mb-3">
							<Card.Body>
								<Card.Title>Messages</Card.Title>
								<Card.Text>3 New</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<h4>Student Overview</h4>
				<div className="table-responsive" style={{ width: "100%", margin: 0 }}>
					<Table striped bordered hover style={{ width: "100%" }}>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Course</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>John Doe</td>
								<td>Maths</td>
								<td>Active</td>
							</tr>
							<tr>
								<td>2</td>
								<td>Jane Smith</td>
								<td>Physics</td>
								<td>Completed</td>
							</tr>
							<tr>
								<td>3</td>
								<td>Alice Johnson</td>
								<td>Chemistry</td>
								<td>Active</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Bob Wilson</td>
								<td>Biology</td>
								<td>Pending</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</FacultyLayout>
	);
};

export default FacultyDashboard;
