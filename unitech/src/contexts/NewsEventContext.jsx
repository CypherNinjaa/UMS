import React, { useState, useEffect, useCallback } from "react";
import NewsEventContext from "./NewsEventContextDefinition";

export const NewsEventProvider = ({ children }) => {
	const [newsEvents, setNewsEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState({
		search: "",
		type: "All",
		category: "All",
		status: "All",
		featured: "All",
		sortBy: "publishDate",
		sortOrder: "DESC",
	});
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		itemsPerPage: 10,
		hasNextPage: false,
		hasPrevPage: false,
	});
	const [statistics, setStatistics] = useState({
		totalItems: 0,
		publishedItems: 0,
		upcomingEvents: 0,
		totalViews: 0,
		totalRegistrations: 0,
		recentItems: 0,
	});

	const API_BASE_URL = "http://localhost:3000/api/news-events";

	// Fetch news and events with current filters and pagination
	const fetchNewsEvents = useCallback(
		async (page = 1) => {
			try {
				setLoading(true);
				setError(null);

				const queryParams = new URLSearchParams({
					page: page.toString(),
					limit: pagination.itemsPerPage.toString(),
					...filters,
				});

				const response = await fetch(`${API_BASE_URL}?${queryParams}`);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();

				if (data.success) {
					setNewsEvents(data.data);
					setPagination(data.pagination);
				} else {
					throw new Error(data.message || "Failed to fetch news and events");
				}
			} catch (err) {
				console.error("Error fetching news events:", err);
				setError(err.message);
				setNewsEvents([]);
			} finally {
				setLoading(false);
			}
		},
		[filters, pagination.itemsPerPage]
	);

	// Fetch dashboard statistics
	const fetchStatistics = useCallback(async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/statistics`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (data.success) {
				setStatistics(data.data.overview);
			}
		} catch (err) {
			console.error("Error fetching statistics:", err);
		}
	}, []);

	// Create new news event
	const createNewsEvent = async (newsEventData) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(API_BASE_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newsEventData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to create news/event");
			}

			if (data.success) {
				await fetchNewsEvents(pagination.currentPage);
				await fetchStatistics();
				return { success: true, data: data.data };
			} else {
				throw new Error(data.message || "Failed to create news/event");
			}
		} catch (err) {
			console.error("Error creating news event:", err);
			setError(err.message);
			return { success: false, error: err.message };
		} finally {
			setLoading(false);
		}
	};

	// Update news event
	const updateNewsEvent = async (id, newsEventData) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_BASE_URL}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newsEventData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to update news/event");
			}

			if (data.success) {
				await fetchNewsEvents(pagination.currentPage);
				await fetchStatistics();
				return { success: true, data: data.data };
			} else {
				throw new Error(data.message || "Failed to update news/event");
			}
		} catch (err) {
			console.error("Error updating news event:", err);
			setError(err.message);
			return { success: false, error: err.message };
		} finally {
			setLoading(false);
		}
	};

	// Delete news event
	const deleteNewsEvent = async (id) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_BASE_URL}/${id}`, {
				method: "DELETE",
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to delete news/event");
			}

			if (data.success) {
				await fetchNewsEvents(pagination.currentPage);
				await fetchStatistics();
				return { success: true };
			} else {
				throw new Error(data.message || "Failed to delete news/event");
			}
		} catch (err) {
			console.error("Error deleting news event:", err);
			setError(err.message);
			return { success: false, error: err.message };
		} finally {
			setLoading(false);
		}
	};

	// Get single news event by ID
	const getNewsEventById = async (id) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_BASE_URL}/${id}`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (data.success) {
				return { success: true, data: data.data };
			} else {
				throw new Error(data.message || "Failed to fetch news/event");
			}
		} catch (err) {
			console.error("Error fetching news event:", err);
			setError(err.message);
			return { success: false, error: err.message };
		} finally {
			setLoading(false);
		}
	};

	// Update news event status
	const updateNewsEventStatus = async (id, status) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_BASE_URL}/${id}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to update status");
			}

			if (data.success) {
				await fetchNewsEvents(pagination.currentPage);
				await fetchStatistics();
				return { success: true, data: data.data };
			} else {
				throw new Error(data.message || "Failed to update status");
			}
		} catch (err) {
			console.error("Error updating status:", err);
			setError(err.message);
			return { success: false, error: err.message };
		} finally {
			setLoading(false);
		}
	};

	// Toggle featured status
	const toggleFeatured = async (id) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_BASE_URL}/${id}/featured`, {
				method: "PATCH",
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to toggle featured status");
			}

			if (data.success) {
				await fetchNewsEvents(pagination.currentPage);
				await fetchStatistics();
				return { success: true, data: data.data };
			} else {
				throw new Error(data.message || "Failed to toggle featured status");
			}
		} catch (err) {
			console.error("Error toggling featured status:", err);
			setError(err.message);
			return { success: false, error: err.message };
		} finally {
			setLoading(false);
		}
	};

	// Update filters
	const updateFilters = (newFilters) => {
		setFilters((prev) => ({
			...prev,
			...newFilters,
		}));
	};

	// Clear filters
	const clearFilters = () => {
		setFilters({
			search: "",
			type: "All",
			category: "All",
			status: "All",
			featured: "All",
			sortBy: "publishDate",
			sortOrder: "DESC",
		});
	};

	// Change page
	const changePage = (page) => {
		if (page >= 1 && page <= pagination.totalPages) {
			fetchNewsEvents(page);
		}
	};

	// Initial data load
	useEffect(() => {
		fetchNewsEvents(1);
		fetchStatistics();
	}, [fetchNewsEvents, fetchStatistics]);

	const value = {
		newsEvents,
		loading,
		error,
		filters,
		pagination,
		statistics,
		fetchNewsEvents,
		createNewsEvent,
		updateNewsEvent,
		deleteNewsEvent,
		getNewsEventById,
		updateNewsEventStatus,
		toggleFeatured,
		updateFilters,
		clearFilters,
		changePage,
		fetchStatistics,
	};

	return (
		<NewsEventContext.Provider value={value}>
			{children}
		</NewsEventContext.Provider>
	);
};
