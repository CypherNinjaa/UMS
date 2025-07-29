import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';

function Dashboard() {
  return (
    <>
      <h2>Faculty Dashboard</h2>
      <Row className="mb-4">
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>John Doe</td><td>Maths</td><td>Active</td></tr>
          <tr><td>2</td><td>Jane Smith</td><td>Physics</td><td>Completed</td></tr>
        </tbody>
      </Table>
    </>
  );
}

export default Dashboard;
