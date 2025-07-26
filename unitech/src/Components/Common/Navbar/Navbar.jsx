// comment is added for team member's

import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap"; // importing react bootstrapp
import { Link } from "react-router-dom";
import { FaUniversity, FaBars } from "react-icons/fa";
import "./Navbar.css";

// creating mobile toogle

// This is using React's useState hook to add a piece of state called expanded.
// expanded: it will tell navigation menu is open/closed or expanded/collapsed
// setExpanded: ye state update karega bro!
// useState(false): bydefault expanded false rahega .
const NavigationBar = () => {
	const [expanded, setExpanded] = useState(false);

	const handleNavclick = () => {
		setExpanded(false);
		// isko jab bhi call karnege ye navbar collapse kar dega
		// when clicked on nav items it will closed, useful in phone view
	};
	return (
		<Navbar
			bg="primary"
			variant="dark"
			expand="lg"
			fixed="top"
			className="custom-navbar"
			expanded={expanded}
		>
			<Container>
				{/* as link is works like a href tag and 'to' decide where we want to redirect */}
				<Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
					<FaUniversity className="me-2" size={30} />
					<span className="fw-bold">Eduverse University</span>
				</Navbar.Brand>

				{/* now we have to create toogle button for mobile */}
				{/*aria-controls="basic-navbar-nav"
                    This is for accessibility (screen readers).
                    it is saying toggle button is linked with the ID basic-navbar-nav."
                 So when it's toggled, that element is shown or hidden.  */}

				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					onClick={() => setExpanded(!expanded)}
				>
					<FaBars />
				</Navbar.Toggle>

				{/* menu items yahan par add karna hai */}
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						{/* bhai log yahan par pages ka link add karna hai 
                        if you have done creating the pages */}

						<Nav.Link
							as={Link}
							to="/"
							onClick={handleNavclick}
							className="nav-item"
						>
							Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/Contact"
							onClick={handleNavclick}
							className="nav-item"
						>
							Contact Us
						</Nav.Link>
						{/* Add more nav items here */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavigationBar;
