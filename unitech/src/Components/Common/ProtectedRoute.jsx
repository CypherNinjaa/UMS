import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
	const { isAuthenticated, user, isLoading } = useAuth();

	// Show loading spinner while checking auth status
	if (isLoading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	// If not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	// If user role is not allowed, redirect to appropriate dashboard
	if (
		allowedRoles.length > 0 &&
		!allowedRoles.includes(user?.role?.toLowerCase())
	) {
		// Redirect to user's appropriate dashboard based on their role
		switch (user?.role?.toLowerCase()) {
			case "admin":
				return <Navigate to="/admin" replace />;
			case "faculty":
				return <Navigate to="/facultydashboard" replace />;
			case "student":
				return <Navigate to="/student" replace />;
			default:
				return <Navigate to="/login" replace />;
		}
	}

	return children;
};

export default ProtectedRoute;
