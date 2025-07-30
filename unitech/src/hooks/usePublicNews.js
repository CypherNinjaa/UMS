import { useState, useEffect } from "react";

const usePublicNews = () => {
	const [newsItems, setNewsItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchPublicNews = async () => {
		try {
			setLoading(true);
			setError(null);

			// Fetch only published news and events
			const apiUrl = `${
				import.meta.env.VITE_API_URL || "http://localhost:3000"
			}/api/news-events?status=Published&limit=20&sortBy=publishDate&sortOrder=desc`;

			console.log("Fetching from:", apiUrl);
			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("API Response:", data);

			if (data.success) {
				console.log("Items received:", data.data?.length || 0);
				setNewsItems(data.data || []);
			} else {
				setError(data.message || "Failed to fetch news");
			}
		} catch (err) {
			console.error("Error fetching public news:", err);
			setError(err.message || "An error occurred while fetching news");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPublicNews();
	}, []);

	// Filter news by category
	const getNewsByCategory = (category) => {
		if (category === "All") return newsItems;
		return newsItems.filter((item) => item.category === category);
	};

	// Get unique categories from the fetched data
	const getCategories = () => {
		const categories = ["All"];
		const uniqueCategories = [
			...new Set(newsItems.map((item) => item.category)),
		];
		return categories.concat(uniqueCategories);
	};

	return {
		newsItems,
		loading,
		error,
		refetch: fetchPublicNews,
		getNewsByCategory,
		getCategories,
	};
};

export default usePublicNews;
