import React, {
	createContext,
	useReducer,
	useCallback,
	useMemo,
	useRef,
} from "react";
import FacultyService from "../services/FacultyService";

// Initial state
const initialState = {
	faculty: [],
	statistics: {
		totalFaculty: 0,
		activeFaculty: 0,
		featuredFaculty: 0,
		pendingFaculty: 0,
		departmentDistribution: [],
	},
	departments: [],
	loading: false,
	error: null,
	pagination: {
		currentPage: 1,
		totalPages: 0,
		totalItems: 0,
		itemsPerPage: 10,
		hasNextPage: false,
		hasPreviousPage: false,
	},
	filters: {
		search: "",
		department: "All",
		status: "All",
		featured: "",
	},
	sorting: {
		sortBy: "name",
		sortOrder: "ASC",
	},
};

// Action types
const ACTIONS = {
	SET_LOADING: "SET_LOADING",
	SET_ERROR: "SET_ERROR",
	SET_FACULTY: "SET_FACULTY",
	SET_STATISTICS: "SET_STATISTICS",
	SET_DEPARTMENTS: "SET_DEPARTMENTS",
	SET_PAGINATION: "SET_PAGINATION",
	SET_FILTERS: "SET_FILTERS",
	SET_SORTING: "SET_SORTING",
	ADD_FACULTY: "ADD_FACULTY",
	UPDATE_FACULTY: "UPDATE_FACULTY",
	DELETE_FACULTY: "DELETE_FACULTY",
	BULK_DELETE_FACULTY: "BULK_DELETE_FACULTY",
	CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const facultyReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_LOADING:
			return { ...state, loading: action.payload };

		case ACTIONS.SET_ERROR:
			return { ...state, error: action.payload, loading: false };

		case ACTIONS.CLEAR_ERROR:
			return { ...state, error: null };

		case ACTIONS.SET_FACULTY:
			return { ...state, faculty: action.payload, loading: false, error: null };

		case ACTIONS.SET_STATISTICS:
			return { ...state, statistics: action.payload };

		case ACTIONS.SET_DEPARTMENTS:
			return { ...state, departments: action.payload };

		case ACTIONS.SET_PAGINATION:
			return { ...state, pagination: action.payload };

		case ACTIONS.SET_FILTERS:
			return { ...state, filters: { ...state.filters, ...action.payload } };

		case ACTIONS.SET_SORTING:
			return { ...state, sorting: action.payload };

		case ACTIONS.ADD_FACULTY:
			return {
				...state,
				faculty: [...state.faculty, action.payload],
				statistics: {
					...state.statistics,
					totalFaculty: state.statistics.totalFaculty + 1,
					activeFaculty:
						action.payload.status === "Active"
							? state.statistics.activeFaculty + 1
							: state.statistics.activeFaculty,
					featuredFaculty: action.payload.featured
						? state.statistics.featuredFaculty + 1
						: state.statistics.featuredFaculty,
				},
			};

		case ACTIONS.UPDATE_FACULTY:
			return {
				...state,
				faculty: state.faculty.map((member) =>
					member.id === action.payload.id ? action.payload : member
				),
			};

		case ACTIONS.DELETE_FACULTY:
			return {
				...state,
				faculty: state.faculty.filter((member) => member.id !== action.payload),
				statistics: {
					...state.statistics,
					totalFaculty: state.statistics.totalFaculty - 1,
				},
			};

		case ACTIONS.BULK_DELETE_FACULTY:
			return {
				...state,
				faculty: state.faculty.filter(
					(member) => !action.payload.includes(member.id)
				),
				statistics: {
					...state.statistics,
					totalFaculty: state.statistics.totalFaculty - action.payload.length,
				},
			};

		default:
			return state;
	}
};

// Create context
const FacultyContext = createContext();

// Provider component
export const FacultyProvider = ({ children }) => {
	const [state, dispatch] = useReducer(facultyReducer, initialState);

	// Prevent multiple simultaneous API calls
	const isLoadingRef = useRef(false);

	// Memoized action creators with useCallback
	const setLoading = useCallback((loading) => {
		dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
	}, []);

	const setError = useCallback((error) => {
		dispatch({ type: ACTIONS.SET_ERROR, payload: error });
	}, []);

	const clearError = useCallback(() => {
		dispatch({ type: ACTIONS.CLEAR_ERROR });
	}, []);

	// Fetch statistics
	const fetchStatistics = useCallback(async () => {
		try {
			const response = await FacultyService.getFacultyStatistics();
			dispatch({ type: ACTIONS.SET_STATISTICS, payload: response.data });
		} catch (error) {
			console.error("Error fetching statistics:", error);
		}
	}, []);

	// Fetch all faculty
	const fetchFaculty = useCallback(async (params = {}) => {
		// Prevent multiple simultaneous calls
		if (isLoadingRef.current) {
			return;
		}

		try {
			isLoadingRef.current = true;
			dispatch({ type: ACTIONS.SET_LOADING, payload: true });
			const response = await FacultyService.getAllFaculty(params);

			dispatch({ type: ACTIONS.SET_FACULTY, payload: response.data.faculty });
			dispatch({
				type: ACTIONS.SET_PAGINATION,
				payload: response.data.pagination,
			});
		} catch (error) {
			dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
		} finally {
			isLoadingRef.current = false;
		}
	}, []);

	// Fetch departments
	const fetchDepartments = useCallback(async () => {
		try {
			const response = await FacultyService.getDepartments();
			dispatch({
				type: ACTIONS.SET_DEPARTMENTS,
				payload: ["All", ...response.data],
			});
		} catch (error) {
			console.error("Error fetching departments:", error);
		}
	}, []);

	// Create faculty
	const createFaculty = useCallback(
		async (facultyData) => {
			try {
				const response = await FacultyService.createFaculty(facultyData);
				dispatch({ type: ACTIONS.ADD_FACULTY, payload: response.data });

				// Only refresh statistics, not the entire faculty list
				fetchStatistics();

				return response;
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Update faculty
	const updateFaculty = useCallback(
		async (id, facultyData) => {
			try {
				const response = await FacultyService.updateFaculty(id, facultyData);
				dispatch({ type: ACTIONS.UPDATE_FACULTY, payload: response.data });

				// Only refresh statistics, not the entire faculty list
				fetchStatistics();

				return response;
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Delete faculty
	const deleteFaculty = useCallback(
		async (id) => {
			try {
				await FacultyService.deleteFaculty(id);
				dispatch({ type: ACTIONS.DELETE_FACULTY, payload: id });

				// Only refresh statistics, not the entire faculty list
				fetchStatistics();
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Bulk delete faculty
	const bulkDeleteFaculty = useCallback(
		async (ids) => {
			try {
				await FacultyService.bulkDeleteFaculty(ids);
				dispatch({ type: ACTIONS.BULK_DELETE_FACULTY, payload: ids });

				// Only refresh statistics, not the entire faculty list
				fetchStatistics();
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Set sorting
	const setSorting = useCallback((sorting) => {
		dispatch({ type: ACTIONS.SET_SORTING, payload: sorting });
	}, []);

	// Toggle featured
	const toggleFeatured = useCallback(
		async (id) => {
			try {
				const response = await FacultyService.toggleFeaturedStatus(id);
				dispatch({ type: ACTIONS.UPDATE_FACULTY, payload: response.data });

				// Only refresh statistics, not the entire faculty list
				fetchStatistics();

				return response;
			} catch (error) {
				dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
				throw error;
			}
		},
		[fetchStatistics]
	);

	// Memoize the actions object
	const actions = useMemo(
		() => ({
			setLoading,
			setError,
			clearError,
			fetchFaculty,
			fetchStatistics,
			fetchDepartments,
			createFaculty,
			updateFaculty,
			deleteFaculty,
			bulkDeleteFaculty,
			setSorting,
			toggleFeatured,
		}),
		[
			setLoading,
			setError,
			clearError,
			fetchFaculty,
			fetchStatistics,
			fetchDepartments,
			createFaculty,
			updateFaculty,
			deleteFaculty,
			bulkDeleteFaculty,
			setSorting,
			toggleFeatured,
		]
	);

	const value = useMemo(
		() => ({
			...state,
			actions,
		}),
		[state, actions]
	);

	return (
		<FacultyContext.Provider value={value}>{children}</FacultyContext.Provider>
	);
};

export { FacultyContext };
export default FacultyContext;
