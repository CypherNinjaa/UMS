import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// importing our custom componnets
import Navbar from "./Components/Common/Navbar/Navbar";

// pages components will imported here-
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
function App() {
	return (
		<>
			<Router>
				<div className="App">
					<Navbar />
					<main className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/Contact" element={<Contact />} />
						</Routes>
					</main>
				</div>
			</Router>
		</>
	);
}

export default App;
