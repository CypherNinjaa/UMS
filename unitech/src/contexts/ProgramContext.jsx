import React, { useReducer, useCallback, useRef } from "react";
import { ProgramContext } from "./ProgramContext.js";

// API Base URL
const API_BASE_URL = "http://localhost:3000/api/programs";

// Action Types
const ACTIONS = {
	SET_LOADING: "SET_LOADING",
	SET_PROGRAMS: "SET_PROGRAMS",
	SET_DEPARTMENTS: "SET_DEPARTMENTS",
	SET_STATISTICS: "SET_STATISTICS",
	SET_ERROR: "SET_ERROR",
	CLEAR_ERROR: "CLEAR_ERROR",
	SET_FILTERS: "SET_FILTERS",
	SET_SORTING: "SET_SORTING",
	SET_PAGINATION: "SET_PAGINATION",
	ADD_PROGRAM: "ADD_PROGRAM",
	UPDATE_PROGRAM: "UPDATE_PROGRAM",
	DELETE_PROGRAM: "DELETE_PROGRAM",
	DELETE_PROGRAMS: "DELETE_PROGRAMS",
	TOGGLE_FEATURED: "TOGGLE_FEATURED",
};

// Initial State
const initialState = {
	programs: [],
	departments: ["All"],
	statistics: {
		totalPrograms: 0,
		activePrograms: 0,
		featuredPrograms: 0,
		planningPrograms: 0,
		totalEnrollment: 0,
		averageRating: 0,
	},
	loading: false,
	error: null,
	filters: {
		search: "",
		department: "All",
		type: "All",
		status: "All",
		featured: "All",
	},
	sorting: {
		sortBy: "name",
		sortOrder: "ASC",
	},
	pagination: {
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		itemsPerPage: 10,
		hasNextPage: false,
		hasPrevPage: false,
	},
};

// Reducer
const programReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_LOADING:
			return { ...state, loading: action.payload };

		case ACTIONS.SET_PROGRAMS:
			return {
				...state,
				programs: action.payload,
				loading: false,
				error: null,
			};

		case ACTIONS.SET_DEPARTMENTS:
			return { ...state, departments: action.payload };

		case ACTIONS.SET_STATISTICS:
			return { ...state, statistics: action.payload };

		case ACTIONS.SET_ERROR:
			return { ...state, error: action.payload, loading: false };

		case ACTIONS.CLEAR_ERROR:
			return { ...state, error: null };

		case ACTIONS.SET_FILTERS:
			return { ...state, filters: { ...state.filters, ...action.payload } };

		case ACTIONS.SET_SORTING:
			return { ...state, sorting: action.payload };

		case ACTIONS.SET_PAGINATION:
			return { ...state, pagination: action.payload };

		case ACTIONS.ADD_PROGRAM:
			return {
				...state,
				programs: [...state.programs, action.payload],
				statistics: {
					...state.statistics,
					totalPrograms: state.statistics.totalPrograms + 1,
				},
			};

		case ACTIONS.UPDATE_PROGRAM:
			return {
				...state,
				programs: state.programs.map((program) =>
					program.id === action.payload.id ? action.payload : program
				),
			};

		case ACTIONS.DELETE_PROGRAM:
			return {
				...state,
				programs: state.programs.filter(
					(program) => program.id !== action.payload
				),
				statistics: {
					...state.statistics,
					totalPrograms: state.statistics.totalPrograms - 1,
				},
			};

		case ACTIONS.DELETE_PROGRAMS:
			return {
				...state,
				programs: state.programs.filter(
					(program) => !action.payload.includes(program.id)
				),
				statistics: {
					...state.statistics,
					totalPrograms: state.statistics.totalPrograms - action.payload.length,
				},
			};

		case ACTIONS.TOGGLE_FEATURED:
			return {
				...state,
				programs: state.programs.map((program) =>
					program.id === action.payload.id
						? { ...program, featured: action.payload.featured }
						: program
				),
			};

		default:
			return state;
	}
};

// Provider Component
export const ProgramProvider = ({ children }) => {
	const [state, dispatch] = useReducer(programReducer, initialState);
	const isLoadingRef = useRef(false);

	// API Helper Function
	const apiCall = async (url, options = {}) => {
		try {
			const response = await fetch(url, {
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
				...options,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "API request failed");
			}

			return data;
		} catch (error) {
			console.error("API Call Error:", error);
			throw error;
		}
	};

	// Fetch Programs
	const fetchPrograms = useCallback(async (params = {}) => {
		if (isLoadingRef.current) return;

		try {
			isLoadingRef.current = true;
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });

			const queryParams = new URLSearchParams({
				page: params.page || 1,
				limit: params.limit || 10,
				search: params.search || "",
				department: params.department || "All",
				type: params.type || "All",
				status: params.status || "All",
				featured: params.featured || "All",
				sortBy: params.sortBy || "name",
				sortOrder: params.sortOrder || "ASC",
			});

			const result = await apiCall(`${API_BASE_URL}?${queryParams}`);

			if (result.success) {
				dispatch({ type: ACTIONS.SET_PROGRAMS, payload: result.data });
				dispatch({ type: ACTIONS.SET_PAGINATION, payload: result.pagination });
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		} finally {
			isLoadingRef.current = false;
			dispatch({ type: ACTIONS.SET_LOADING, payload: false });
		}
	}, []);

	// Fetch Departments
	const fetchDepartments = useCallback(async () => {
		try {
			const result = await apiCall(`${API_BASE_URL}/departments`);
			if (result.success) {
				dispatch({ type: ACTIONS.SET_DEPARTMENTS, payload: result.data });
			}
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		}
	}, []);

	// Fetch Statistics
	const fetchStatistics = useCallback(async () => {
		try {
			const result = await apiCall(`${API_BASE_URL}/statistics`);
			if (result.success) {
				dispatch({ type: ACTIONS.SET_STATISTICS, payload: result.data });
			}
		} catch (error) {
			console.error("Error fetching statistics:", error);
			// Don't show error for statistics fetch to user
		}
	}, []);

	// Create Program
	const createProgram = useCallback(
		async (programData) => {
			try {
				dispatch({ type: ACTIONS.SET_LOADING, payload: true });

				const result = await apiCall(API_BASE_URL, {
					method: "POST",
					body: JSON.stringify(programData),
				});

				if (result.success) {
					dispatch({ type: ACTIONS.ADD_PROGRAM, payload: result.data });
					// Refresh statistics after adding
					fetchStatistics();
					return result.data;
				}
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			} finally {
				dispatch({ type: ACTIONS.SET_LOADING, payload: false });
			}
		},
		[fetchStatistics]
	);

	// Update Program
	const updateProgram = useCallback(
		async (programId, programData) => {
			try {
				dispatch({ type: ACTIONS.SET_LOADING, payload: true });

				const result = await apiCall(`${API_BASE_URL}/${programId}`, {
					method: "PUT",
					body: JSON.stringify(programData),
				});

				if (result.success) {
					dispatch({ type: ACTIONS.UPDATE_PROGRAM, payload: result.data });
					// Refresh statistics after updating
					fetchStatistics();
					return result.data;
				}
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			} finally {
				dispatch({ type: ACTIONS.SET_LOADING, payload: false });
			}
		},
		[fetchStatistics]
	);

	// Delete Program
	const deleteProgram = useCallback(
		async (programId) => {
			try {
				dispatch({ type: ACTIONS.SET_LOADING, payload: true });

				const result = await apiCall(`${API_BASE_URL}/${programId}`, {
					method: "DELETE",
				});

				if (result.success) {
					dispatch({ type: ACTIONS.DELETE_PROGRAM, payload: programId });
					// Refresh statistics after deletion
					fetchStatistics();
				}
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			} finally {
				dispatch({ type: ACTIONS.SET_LOADING, payload: false });
			}
		},
		[fetchStatistics]
	);

	// Bulk Delete Programs
	const bulkDeletePrograms = useCallback(
		async (programIds) => {
			try {
				dispatch({ type: ACTIONS.SET_LOADING, payload: true });

				const result = await apiCall(API_BASE_URL, {
					method: "DELETE",
					body: JSON.stringify({ ids: programIds }),
				});

				if (result.success) {
					dispatch({ type: ACTIONS.DELETE_PROGRAMS, payload: programIds });
					// Refresh statistics after bulk deletion
					fetchStatistics();
				}
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			} finally {
				dispatch({ type: ACTIONS.SET_LOADING, payload: false });
			}
		},
		[fetchStatistics]
	);

	// Toggle Featured Status
	const toggleFeatured = useCallback(
		async (programId) => {
			try {
				const result = await apiCall(`${API_BASE_URL}/${programId}/featured`, {
					method: "PATCH",
				});

				if (result.success) {
					dispatch({
						type: ACTIONS.TOGGLE_FEATURED,
						payload: { id: programId, featured: result.data.featured },
					});
					// Refresh statistics after featuring change
					fetchStatistics();
				}
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Update Enrollment
	const updateEnrollment = useCallback(
		async (programId, enrollment) => {
			try {
				const result = await apiCall(
					`${API_BASE_URL}/${programId}/enrollment`,
					{
						method: "PATCH",
						body: JSON.stringify({ enrollment }),
					}
				);

				if (result.success) {
					dispatch({ type: ACTIONS.UPDATE_PROGRAM, payload: result.data });
					// Refresh statistics after enrollment update
					fetchStatistics();
				}
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Set filters
	const setFilters = useCallback((filters) => {
		dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
	}, []);

	// Set sorting
	const setSorting = useCallback((sorting) => {
		dispatch({ type: ACTIONS.SET_SORTING, payload: sorting });
	}, []);

	// Clear error
	const clearError = useCallback(() => {
		dispatch({ type: ACTIONS.CLEAR_ERROR });
	}, []);

	// Context Value
	const contextValue = {
		// State
		programs: state.programs,
		departments: state.departments,
		statistics: state.statistics,
		loading: state.loading,
		error: state.error,
		filters: state.filters,
		sorting: state.sorting,
		pagination: state.pagination,

		// Actions
		actions: {
			fetchPrograms,
			fetchDepartments,
			fetchStatistics,
			createProgram,
			updateProgram,
			deleteProgram,
			bulkDeletePrograms,
			toggleFeatured,
			updateEnrollment,
			setFilters,
			setSorting,
			clearError,
		},
	};

	return (
		<ProgramContext.Provider value={contextValue}>
			{children}
		</ProgramContext.Provider>
	);
};
