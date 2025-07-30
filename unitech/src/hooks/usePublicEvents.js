import { useState, useEffect } from "react";

const usePublicEvents = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchPublicEvents = async () => {
		try {
			setLoading(true);
			setError(null);

			// Fetch only published events from the database
			const apiUrl = `${
				import.meta.env.VITE_API_URL || "http://localhost:3000"
			}/api/news-events?type=Event&status=Published&limit=10&sortBy=eventDate&sortOrder=asc`;

			console.log("Fetching events from:", apiUrl);
			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Events API Response:", data);

			if (data.success) {
				// Filter events to only show upcoming events (eventDate >= today)
				const today = new Date().toISOString().split("T")[0];
				const upcomingEvents = (data.data || []).filter(
					(event) => event.eventDate && event.eventDate >= today
				);
				console.log("Upcoming events found:", upcomingEvents.length);
				setEvents(upcomingEvents);
			} else {
				setError(data.message || "Failed to fetch events");
			}
		} catch (err) {
			console.error("Error fetching public events:", err);
			setError(err.message || "An error occurred while fetching events");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPublicEvents();
	}, []);

	return {
		events,
		loading,
		error,
		refetch: fetchPublicEvents,
	};
};

export default usePublicEvents;
