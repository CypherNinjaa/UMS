import { useState, useEffect, useRef, useCallback } from "react";
import StudentService from "../services/StudentService";

const useStudents = (initialParams = {}) => {
	const initialLoadDone = useRef(false);
	const initialParamsRef = useRef(initialParams);

	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		itemsPerPage: 10,
		hasNextPage: false,
		hasPreviousPage: false,
	});
	const [filters, setFilters] = useState({
		search: "",
		program: "",
		year: "",
		status: "",
		page: 1,
		limit: 10,
		sortBy: "firstName",
		sortOrder: "asc",
		...initialParamsRef.current,
	});

	const fetchStudents = useCallback(async (params) => {
		try {
			setLoading(true);
			setError(null);

			const queryParams = params;
			const response = await StudentService.getStudents(queryParams);

			if (response.success) {
				setStudents(response.data.students);
				setPagination(response.data.pagination);
			} else {
				throw new Error(response.message || "Failed to fetch students");
			}
		} catch (err) {
			console.error("Error fetching students:", err);
			setError(err.message || "Failed to fetch students");
			setStudents([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const updateFilters = useCallback(
		(newFilters) => {
			const updatedFilters = { ...filters, ...newFilters, page: 1 };
			setFilters(updatedFilters);
			fetchStudents(updatedFilters);
		},
		[filters, fetchStudents]
	);

	const changePage = useCallback(
		(page) => {
			const updatedFilters = { ...filters, page };
			setFilters(updatedFilters);
			fetchStudents(updatedFilters);
		},
		[filters, fetchStudents]
	);

	const changeSort = useCallback(
		(sortBy, sortOrder = "asc") => {
			const updatedFilters = { ...filters, sortBy, sortOrder, page: 1 };
			setFilters(updatedFilters);
			fetchStudents(updatedFilters);
		},
		[filters, fetchStudents]
	);

	const createStudent = useCallback(
		async (studentData) => {
			try {
				setLoading(true);
				const formattedData = StudentService.formatStudentData(studentData);
				const response = await StudentService.createStudent(formattedData);

				if (response.success) {
					fetchStudents(filters); // Refresh the list
					return response;
				} else {
					throw new Error(response.message || "Failed to create student");
				}
			} catch (err) {
				console.error("Error creating student:", err);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[filters, fetchStudents]
	);

	const updateStudent = useCallback(
		async (id, studentData) => {
			try {
				setLoading(true);
				const formattedData = StudentService.formatStudentData(studentData);
				const response = await StudentService.updateStudent(id, formattedData);

				if (response.success) {
					fetchStudents(filters); // Refresh the list
					return response;
				} else {
					throw new Error(response.message || "Failed to update student");
				}
			} catch (err) {
				console.error("Error updating student:", err);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[filters, fetchStudents]
	);

	const deleteStudent = useCallback(
		async (id) => {
			try {
				setLoading(true);
				const response = await StudentService.deleteStudent(id);

				if (response.success) {
					fetchStudents(filters); // Refresh the list
					return response;
				} else {
					throw new Error(response.message || "Failed to delete student");
				}
			} catch (err) {
				console.error("Error deleting student:", err);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[filters, fetchStudents]
	);

	const bulkDeleteStudents = useCallback(
		async (ids) => {
			try {
				setLoading(true);
				const response = await StudentService.bulkDeleteStudents(ids);

				if (response.success) {
					fetchStudents(filters); // Refresh the list
					return response;
				} else {
					throw new Error(response.message || "Failed to delete students");
				}
			} catch (err) {
				console.error("Error bulk deleting students:", err);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[filters, fetchStudents]
	);

	const updateStudentStatus = useCallback(
		async (id, status) => {
			try {
				const response = await StudentService.updateStudentStatus(id, status);

				if (response.success) {
					fetchStudents(filters); // Refresh the list
					return response;
				} else {
					throw new Error(
						response.message || "Failed to update student status"
					);
				}
			} catch (err) {
				console.error("Error updating student status:", err);
				throw err;
			}
		},
		[filters, fetchStudents]
	);

	const toggleFeatured = useCallback(
		async (id) => {
			try {
				const response = await StudentService.toggleFeatured(id);

				if (response.success) {
					fetchStudents(filters); // Refresh the list
					return response;
				} else {
					throw new Error(
						response.message || "Failed to toggle featured status"
					);
				}
			} catch (err) {
				console.error("Error toggling featured status:", err);
				throw err;
			}
		},
		[filters, fetchStudents]
	);

	// Load initial data only once
	useEffect(() => {
		if (!initialLoadDone.current) {
			const initialLoad = async () => {
				const initialFilters = {
					search: "",
					program: "",
					year: "",
					status: "",
					page: 1,
					limit: 10,
					sortBy: "firstName",
					sortOrder: "asc",
					...initialParamsRef.current,
				};

				await fetchStudents(initialFilters);
			};

			initialLoad();
			initialLoadDone.current = true;
		}
	}, [fetchStudents]); // Include fetchStudents dependency

	const refresh = useCallback(() => {
		fetchStudents(filters);
	}, [fetchStudents, filters]);

	return {
		students,
		loading,
		error,
		pagination,
		filters,
		updateFilters,
		changePage,
		changeSort,
		createStudent,
		updateStudent,
		deleteStudent,
		bulkDeleteStudents,
		updateStudentStatus,
		toggleFeatured,
		refresh,
	};
};

export default useStudents;
