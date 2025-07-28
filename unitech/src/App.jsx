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
import Login from "./Pages/Login";
import Footer from "../src/Components/Common/Footer";

// Admin pages
import AdminDashboard from "./Pages/AdminDashboard";
import FacultyManagement from "./Pages/FacultyManagement";
import ProgramManagement from "./Pages/ProgramManagement";
import StudentManagement from "./Pages/StudentManagement";
import AdminSettings from "./Pages/AdminSettings";
import NewsEventsManagement from "./Pages/NewsEventsManagement";
import GalleryManagement from "./Pages/GalleryManagement";

function App() {
	return (
		<>
			<Router>
				<div className="App">
					<Routes>
						{/* Public Routes */}
						<Route
							path="/"
							element={
								<>
									<Navbar />
									<main className="main-content">
										<Home />
									</main>
									<Footer />
								</>
							}
						/>
						<Route
							path="/programs"
							element={
								<>
									<Navbar />
									<main className="main-content">
										<Programs />
									</main>
									<Footer />
								</>
							}
						/>
						<Route
							path="/faculty"
							element={
								<>
									<Navbar />
									<main className="main-content">
										<Faculty />
									</main>
									<Footer />
								</>
							}
						/>
						<Route
							path="/about"
							element={
								<>
									<Navbar />
									<main className="main-content">
										<About />
									</main>
									<Footer />
								</>
							}
						/>
						<Route
							path="/contact"
							element={
								<>
									<Navbar />
									<main className="main-content">
										<Contact />
									</main>
									<Footer />
								</>
							}
						/>

						{/* Auth Routes */}
						<Route path="/login" element={<Login />} />

						{/* Admin Routes */}
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/admin/faculty" element={<FacultyManagement />} />
						<Route path="/admin/programs" element={<ProgramManagement />} />
						<Route path="/admin/students" element={<StudentManagement />} />
						<Route path="/admin/settings" element={<AdminSettings />} />
						<Route path="/admin/news" element={<NewsEventsManagement />} />
						<Route path="/admin/gallery" element={<GalleryManagement />} />

						{/* Catch-all route for unknown admin paths - redirects to admin dashboard */}
						<Route path="/admin/*" element={<AdminDashboard />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
