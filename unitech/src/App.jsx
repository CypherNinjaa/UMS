import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// importing our custom componnets
import Navbar from "./Components/Common/Navbar/Navbar";

// pages components will imported here-
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Faculty from "./Pages/Faculty";
import Programs from "./Pages/Programs";
import About from "./Pages/About";
import Footer from "../src/Components/Common/Footer";
function App() {
	return (
		<>
			<Router>
				<div className="App">
					<Navbar />
					<main className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/programs" element={<Programs />} />
							<Route path="/faculty" element={<Faculty />} />
							<Route path="/about" element={<About />} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</>
	);
}

export default App;
