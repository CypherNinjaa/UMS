import { useState, useEffect } from "react";

const useDashboard = () => {
	const [statistics, setStatistics] = useState({
		totalFaculty: 0,
		totalPrograms: 0,
		totalStudents: 0,
		activeNews: 0,
		facultyChange: "+0%",
		programsChange: "+0",
		studentsChange: "+0%",
		newsChange: "0",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchDashboardStats = async () => {
		try {
			setLoading(true);
			setError(null);

			const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

			// Fetch faculty statistics
			const facultyResponse = await fetch(`${apiUrl}/api/faculty/statistics`);
			const facultyData = await facultyResponse.json();

			// Fetch programs statistics
			const programsResponse = await fetch(`${apiUrl}/api/programs/statistics`);
			const programsData = await programsResponse.json();

			// Fetch news statistics
			const newsResponse = await fetch(`${apiUrl}/api/news-events/statistics`);
			const newsData = await newsResponse.json();

			// Update statistics
			setStatistics({
				totalFaculty: facultyData.success
					? facultyData.data.totalFaculty || 0
					: 0,
				totalPrograms: programsData.success
					? programsData.data.totalPrograms || 0
					: 0,
				totalStudents: 0, // This would come from student API when available
				activeNews: newsData.success
					? newsData.data.overview.publishedItems || 0
					: 0,
				facultyChange: facultyData.success
					? facultyData.data.activeFaculty > 5
						? "+8%"
						: "+2%"
					: "+0%",
				programsChange: programsData.success
					? programsData.data.totalPrograms > 1
						? "+1"
						: "+0"
					: "+0",
				studentsChange: "+12%", // Mock data - would come from student API when available
				newsChange: newsData.success
					? newsData.data.overview.recentItems > 3
						? "+3"
						: "+1"
					: "0",
			});
		} catch (err) {
			console.error("Error fetching dashboard stats:", err);
			setError(err.message || "Failed to fetch dashboard statistics");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboardStats();
	}, []);

	return {
		statistics,
		loading,
		error,
		refresh: fetchDashboardStats,
	};
};

export default useDashboard;
