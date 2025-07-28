import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextDefinition";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check if user is already logged in (from localStorage)
	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			try {
				setUser(JSON.parse(savedUser));
			} catch (error) {
				console.error("Error parsing saved user:", error);
				localStorage.removeItem("user");
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (email, password) => {
		try {
			const response = await fetch("http://localhost:3000/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Login failed");
			}

			// Save user to state and localStorage
			setUser(data.user);
			localStorage.setItem("user", JSON.stringify(data.user));

			return { success: true, user: data.user };
		} catch (error) {
			return { success: false, error: error.message };
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	const value = {
		user,
		isLoading,
		login,
		logout,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
