import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// importing our custom componnets
import Navbar from "./Components/Common/Navbar/Navbar";
import AuthProvider from "./contexts/AuthContext";
import { FacultyProvider } from "./contexts/FacultyContext";
import { ProgramProvider } from "./contexts/ProgramContext.jsx";
import ProtectedRoute from "./Components/Common/ProtectedRoute";

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

import NewsEventsManagement from "./Pages/NewsEventsManagement";

// Faculty and Student dashboards
import FacultyDashboard from "./Pages/FacultyDashboard";
import StudentDashboard from "./Pages/StudentDashboard";

function App() {
	return (
		<AuthProvider>
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
								<ProgramProvider>
									<Navbar />
									<main className="main-content">
										<Programs />
									</main>
									<Footer />
								</ProgramProvider>
							}
						/>
						<Route
							path="/faculty"
							element={
								<FacultyProvider>
									<Navbar />
									<main className="main-content">
										<Faculty />
									</main>
									<Footer />
								</FacultyProvider>
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
						<Route
							path="/admin"
							element={
								<ProtectedRoute allowedRoles={["admin"]}>
									<AdminDashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/faculty"
							element={
								<ProtectedRoute allowedRoles={["admin"]}>
									<FacultyProvider>
										<FacultyManagement />
									</FacultyProvider>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/programs"
							element={
								<ProtectedRoute allowedRoles={["admin"]}>
									<ProgramProvider>
										<ProgramManagement />
									</ProgramProvider>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/students"
							element={
								<ProtectedRoute allowedRoles={["admin"]}>
									<StudentManagement />
								</ProtectedRoute>
							}
						/>
						
						<Route
							path="/admin/news"
							element={
								<ProtectedRoute allowedRoles={["admin"]}>
									<NewsEventsManagement />
								</ProtectedRoute>
							}
						/>

						{/* Faculty Routes */}
						<Route
							path="/facultydashboard"
							element={
								<ProtectedRoute allowedRoles={["faculty"]}>
									<FacultyDashboard />
								</ProtectedRoute>
							}
						/>

						{/* Student Routes */}
						<Route
							path="/student"
							element={
								<ProtectedRoute allowedRoles={["student"]}>
									<StudentDashboard />
								</ProtectedRoute>
							}
						/>

						{/* Catch-all route for unknown admin paths - redirects to admin dashboard */}
						<Route
							path="/admin/*"
							element={
								<ProtectedRoute allowedRoles={["admin"]}>
									<AdminDashboard />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
