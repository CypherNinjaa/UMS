// API Configuration
const API_BASE_URL = "http://localhost:3000/api";

class ApiService {
	static async request(endpoint, options = {}) {
		const url = `${API_BASE_URL}${endpoint}`;

		const config = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || `HTTP error! status: ${response.status}`
				);
			}

			return data;
		} catch (error) {
			console.error("API Request failed:", error);
			throw error;
		}
	}

	static async get(endpoint, params = {}) {
		const searchParams = new URLSearchParams();
		Object.keys(params).forEach((key) => {
			if (
				params[key] !== undefined &&
				params[key] !== null &&
				params[key] !== ""
			) {
				searchParams.append(key, params[key]);
			}
		});

		const queryString = searchParams.toString();
		const url = queryString ? `${endpoint}?${queryString}` : endpoint;

		return this.request(url, { method: "GET" });
	}

	static async post(endpoint, data = {}) {
		return this.request(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	static async put(endpoint, data = {}) {
		return this.request(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	static async patch(endpoint, data = {}) {
		return this.request(endpoint, {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	}

	static async delete(endpoint, data = null) {
		const config = { method: "DELETE" };
		if (data) {
			config.body = JSON.stringify(data);
		}
		return this.request(endpoint, config);
	}
}

export default ApiService;
