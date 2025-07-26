import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
} from "react-bootstrap";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaUniversity,
    FaPaperPlane,
} from "react-icons/fa";


const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        department: "",
        message: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Department contact information
    const departments = [
        {
            id: 1,
            name: "Admissions Office",
            phone: "+91(8294447219)",
            email: "admissions@eduverse.edu",
            hours: "Mon-Fri: 8:00 AM - 6:00 PM",
            location: "Administration Building, Room 101",
        },
        {
            id: 2,
            name: "Academic Affairs",
            phone: "+91(7050010897)",
            email: "academics@eduverse.edu",
            hours: "Mon-Fri: 9:00 AM - 5:00 PM",
            location: "Academic Building, Room 205",
        },
        {
            id: 3,
            name: "Student Services",
            phone: "+91(8252213697)",
            email: "students@eduverse.edu",
            hours: "Mon-Fri: 8:00 AM - 7:00 PM",
            location: "Student Center, Room 150",
        },
        {
            id: 4,
            name: "Financial Aid",
            phone: "+91(9199697225)",
            email: "finaid@eduverse.edu",
            hours: "Mon-Fri: 9:00 AM - 4:00 PM",
            location: "Financial Services Building, Room 120",
        },
        {
            id: 5,
            name: "International Office",
            phone: "+91(8294447219)",
            email: "international@eduverse.edu",
            hours: "Mon-Fri: 9:00 AM - 5:00 PM",
            location: "International Center, Room 301",
        },
        {
            id: 6,
            name: "IT Support",
            phone: "+91 (9199697225)",
            email: "itsupport@eduverse.edu",
            hours: "24/7 Support Available",
            location: "Technology Center, Room 110",
        },
        
    ];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setShowAlert(true);
            setIsSubmitting(false);
            setFormData({
                name: "",
                email: "",
                subject: "",
                department: "",
                message: "",
            });

            // Hide alert after 5 seconds
            setTimeout(() => setShowAlert(false), 5000);
        }, 1000);
    };

    return (
        <div className="contact-page">
            {/* Page Header */}
            

            <section className="page-header bg-primary text-white py-5 mt-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h1 className="display-4 fw-bold">
                                <FaEnvelope className="me-3" />
                                Contact Us
                            </h1>
                            <p className="lead">
                                Get in touch with us - we're here to help with all your
                                questions
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Main Contact Section */}
            <section className="py-5">
                <Container>
                    <Row>
                        {/* Contact Form */}
                        <Col lg={8} className="mb-4">
                            <Card className="contact-form-card border-0 shadow">
                                <Card.Header className="bg-primary text-white">
                                    <h4 className="mb-0">
                                        <FaPaperPlane className="me-2" />
                                        Send us a Message
                                    </h4>
                                </Card.Header>
                                <Card.Body>
                                    {showAlert && (
                                        <Alert variant="success" className="mb-4">
                                            <strong>Message Sent Successfully!</strong> We'll get back
                                            to you within 24 hours.
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Full Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your full name"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email Address *</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your email address"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Subject *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter message subject"
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Department</Form.Label>
                                                    <Form.Select
                                                        name="department"
                                                        value={formData.department}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">
                                                            Select Department (Optional)
                                                        </option>
                                                        <option value="BCA">BCA</option>
                                                        <option value="MCA">MCA</option>
                                                        <option value="B.Tech">B.Tech</option>
                                                        <option value="M.Tech">M.Tech</option>
                                                        <option value="international">
                                                            International Office
                                                        </option>
                                                        <option value="it-support">IT Support</option>
                                                        <option value="other">Other</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Message *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Enter your message here..."
                                                required
                                            />
                                        </Form.Group>

                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="w-100"
                                        >
                                            {isSubmitting ? (
                                                <>Sending Message...</>
                                            ) : (
                                                <>
                                                    <FaPaperPlane className="me-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Contact Information */}
                        <Col lg={4}>
                            <Card className="contact-info-card border-0 shadow mb-4">
                                <Card.Header className="bg-success text-white">
                                    <h5 className="mb-0">
                                        <FaUniversity className="me-2" />
                                        University Information
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="contact-item mb-3">
                                        <FaMapMarkerAlt className="contact-icon text-success" />
                                        <div>
                                            <strong>Address</strong>
                                            <p className="mb-0">
                                                EduVerse University
                                                <br />
                                                Near Gandhi Maidan,
                                                <br />
                                                Patna, Bihar 800001
                                                <br />
                                                India


                                            </p>
                                        </div>
                                    </div>

                                    <div className="contact-item mb-3">
                                        <FaPhone className="contact-icon text-success" />
                                        <div>
                                            <strong>Main Phone</strong>
                                            <p className="mb-0">+91-8294447219</p>
                                            <p className="mb-0">+91(9199697225)</p>
                                        </div>
                                    </div>

                                    <div className="contact-item mb-3">
                                        <FaEnvelope className="contact-icon text-success" />
                                        <div>
                                            <strong>General Email</strong>
                                            <p className="mb-0">hariom.21242@gmail.com</p>
                                            <p className="mb-0">vikashklly@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <FaClock className="contact-icon text-success" />
                                        <div>
                                            <strong>Open Time</strong>
                                            <p className="mb-0">
                                                Monday - Friday: 8:00 AM - 6:00 PM
                                                <br />
                                                Saturday: 9:00 AM - 2:00 PM
                                                <br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Emergency Contact */}
                            <Card className="emergency-contact-card border-0 shadow">
                                <Card.Header className="bg-danger text-white">
                                    <h6 className="mb-0">Emergency Contact</h6>
                                </Card.Header>
                                <Card.Body>
                                    <p className="mb-2">
                                        <strong>Campus Security:</strong>
                                        <br />
                                        +91(7050010897) Available 24/7


                                    </p>
                                    <p className="mb-0">
                                        <strong>Medical Emergency:</strong>
                                        <br />
                                        Call 112 or Campus Health: +91(8252213697)
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Department Contacts */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="text-center mb-5">
                        <Col>
                            <h2 className="section-title">Department Contacts</h2>
                            <p className="section-subtitle">

                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {departments.map((dept) => (
                            <Col lg={4} md={6} className="mb-4" key={dept.id}>
                                <Card className="department-card h-100 border-0 shadow-sm">
                                    <Card.Body>
                                        <h5 className="department-name text-primary">
                                            {dept.name}
                                        </h5>

                                        <div className="department-contact-item">
                                            <FaPhone className="department-icon" />
                                            <span>{dept.phone}</span>
                                        </div>

                                        <div className="department-contact-item">
                                            <FaEnvelope className="department-icon" />
                                            <span>{dept.email}</span>
                                        </div>

                                        <div className="department-contact-item">
                                            <FaClock className="department-icon" />
                                            <span>{dept.hours}</span>
                                        </div>

                                        <div className="department-contact-item">
                                            <FaMapMarkerAlt className="department-icon" />
                                            <span>{dept.location}</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Map Section */}
            <section className="py-5">
                <Container>
                    <Row>
                        <Col>
                            <Card className="map-card border-0 shadow">
                                <Card.Header className="bg-info text-white">
                                    <h4 className="mb-0">
                                        <FaMapMarkerAlt className="me-2" />
                                        Campus Location
                                    </h4>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <div className="map-container">
                                        <iframe
                                            src="https://maps.app.goo.gl/moHnYhMGkKbxo6K5A"
                                            width="100%"
                                            height="400"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="EduVerse University Location"
                                        ></iframe>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Contact;
