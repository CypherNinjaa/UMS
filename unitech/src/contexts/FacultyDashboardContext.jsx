import React, { createContext, useReducer, useCallback } from "react";

// Action types
const ACTIONS = {
	SET_LOADING: "SET_LOADING",
	SET_ERROR: "SET_ERROR",
	CLEAR_ERROR: "CLEAR_ERROR",
	SET_DASHBOARD_STATS: "SET_DASHBOARD_STATS",
	SET_CALENDAR_EVENTS: "SET_CALENDAR_EVENTS",
	ADD_CALENDAR_EVENT: "ADD_CALENDAR_EVENT",
	UPDATE_CALENDAR_EVENT: "UPDATE_CALENDAR_EVENT",
	DELETE_CALENDAR_EVENT: "DELETE_CALENDAR_EVENT",
	SET_STUDENTS: "SET_STUDENTS",
	SET_CLASS_SCHEDULE: "SET_CLASS_SCHEDULE",
	ADD_CLASS_SCHEDULE: "ADD_CLASS_SCHEDULE",
	UPDATE_CLASS_SCHEDULE: "UPDATE_CLASS_SCHEDULE",
	DELETE_CLASS_SCHEDULE: "DELETE_CLASS_SCHEDULE",
	SET_NOTICES: "SET_NOTICES",
	ADD_NOTICE: "ADD_NOTICE",
	UPDATE_NOTICE: "UPDATE_NOTICE",
	DELETE_NOTICE: "DELETE_NOTICE",
	SET_ATTENDANCE: "SET_ATTENDANCE",
	UPDATE_ATTENDANCE: "UPDATE_ATTENDANCE",
	SET_FACULTY_PROFILE: "SET_FACULTY_PROFILE",
};

// Initial state
const initialState = {
	loading: false,
	error: null,
	dashboardStats: {
		totalStudents: 0,
		totalClasses: 0,
		todayAttendance: 0,
		pendingTasks: 0,
	},
	calendarEvents: [],
	students: [],
	classSchedule: [],
	notices: [],
	attendance: {},
	facultyProfile: {
		name: "",
		email: "",
		department: "",
		subjects: [],
		qualification: "",
		experience: "",
		contact: "",
		officeHours: "",
		profileImage: "",
	},
};

// Reducer
const facultyDashboardReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_LOADING:
			return { ...state, loading: action.payload };

		case ACTIONS.SET_ERROR:
			return { ...state, error: action.payload, loading: false };

		case ACTIONS.CLEAR_ERROR:
			return { ...state, error: null };

		case ACTIONS.SET_DASHBOARD_STATS:
			return { ...state, dashboardStats: action.payload };

		case ACTIONS.SET_CALENDAR_EVENTS:
			return { ...state, calendarEvents: action.payload };

		case ACTIONS.ADD_CALENDAR_EVENT:
			return {
				...state,
				calendarEvents: [...state.calendarEvents, action.payload],
			};

		case ACTIONS.UPDATE_CALENDAR_EVENT:
			return {
				...state,
				calendarEvents: state.calendarEvents.map((event) =>
					event.id === action.payload.id ? action.payload : event
				),
			};

		case ACTIONS.DELETE_CALENDAR_EVENT:
			return {
				...state,
				calendarEvents: state.calendarEvents.filter(
					(event) => event.id !== action.payload
				),
			};

		case ACTIONS.SET_STUDENTS:
			return { ...state, students: action.payload };

		case ACTIONS.SET_CLASS_SCHEDULE:
			return { ...state, classSchedule: action.payload };

		case ACTIONS.ADD_CLASS_SCHEDULE:
			return {
				...state,
				classSchedule: [...state.classSchedule, action.payload],
			};

		case ACTIONS.UPDATE_CLASS_SCHEDULE:
			return {
				...state,
				classSchedule: state.classSchedule.map((schedule) =>
					schedule.id === action.payload.id ? action.payload : schedule
				),
			};

		case ACTIONS.DELETE_CLASS_SCHEDULE:
			return {
				...state,
				classSchedule: state.classSchedule.filter(
					(schedule) => schedule.id !== action.payload
				),
			};

		case ACTIONS.SET_NOTICES:
			return { ...state, notices: action.payload };

		case ACTIONS.ADD_NOTICE:
			return {
				...state,
				notices: [...state.notices, action.payload],
			};

		case ACTIONS.UPDATE_NOTICE:
			return {
				...state,
				notices: state.notices.map((notice) =>
					notice.id === action.payload.id ? action.payload : notice
				),
			};

		case ACTIONS.DELETE_NOTICE:
			return {
				...state,
				notices: state.notices.filter((notice) => notice.id !== action.payload),
			};

		case ACTIONS.SET_ATTENDANCE:
			return { ...state, attendance: action.payload };

		case ACTIONS.UPDATE_ATTENDANCE:
			return {
				...state,
				attendance: {
					...state.attendance,
					[action.payload.date]: {
						...state.attendance[action.payload.date],
						[action.payload.studentId]: action.payload.status,
					},
				},
			};

		case ACTIONS.SET_FACULTY_PROFILE:
			return { ...state, facultyProfile: action.payload };

		default:
			return state;
	}
};

// Create context
const FacultyDashboardContext = createContext();

// Provider component
export const FacultyDashboardProvider = ({ children }) => {
	const [state, dispatch] = useReducer(facultyDashboardReducer, initialState);

	// Action creators
	const setLoading = useCallback((loading) => {
		dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
	}, []);

	const setError = useCallback((error) => {
		dispatch({ type: ACTIONS.SET_ERROR, payload: error });
	}, []);

	const clearError = useCallback(() => {
		dispatch({ type: ACTIONS.CLEAR_ERROR });
	}, []);

	const setDashboardStats = useCallback((stats) => {
		dispatch({ type: ACTIONS.SET_DASHBOARD_STATS, payload: stats });
	}, []);

	const setCalendarEvents = useCallback((events) => {
		dispatch({ type: ACTIONS.SET_CALENDAR_EVENTS, payload: events });
	}, []);

	const addCalendarEvent = useCallback((event) => {
		const newEvent = { ...event, id: Date.now() };
		dispatch({ type: ACTIONS.ADD_CALENDAR_EVENT, payload: newEvent });
		return newEvent;
	}, []);

	const updateCalendarEvent = useCallback((event) => {
		dispatch({ type: ACTIONS.UPDATE_CALENDAR_EVENT, payload: event });
	}, []);

	const deleteCalendarEvent = useCallback((eventId) => {
		dispatch({ type: ACTIONS.DELETE_CALENDAR_EVENT, payload: eventId });
	}, []);

	const setStudents = useCallback((students) => {
		dispatch({ type: ACTIONS.SET_STUDENTS, payload: students });
	}, []);

	const setClassSchedule = useCallback((schedule) => {
		dispatch({ type: ACTIONS.SET_CLASS_SCHEDULE, payload: schedule });
	}, []);

	const addClassSchedule = useCallback((schedule) => {
		const newSchedule = { ...schedule, id: Date.now() };
		dispatch({ type: ACTIONS.ADD_CLASS_SCHEDULE, payload: newSchedule });
		return newSchedule;
	}, []);

	const updateClassSchedule = useCallback((schedule) => {
		dispatch({ type: ACTIONS.UPDATE_CLASS_SCHEDULE, payload: schedule });
	}, []);

	const deleteClassSchedule = useCallback((scheduleId) => {
		dispatch({ type: ACTIONS.DELETE_CLASS_SCHEDULE, payload: scheduleId });
	}, []);

	const setNotices = useCallback((notices) => {
		dispatch({ type: ACTIONS.SET_NOTICES, payload: notices });
	}, []);

	const addNotice = useCallback((notice) => {
		const newNotice = {
			...notice,
			id: Date.now(),
			createdAt: new Date().toISOString().split("T")[0],
		};
		dispatch({ type: ACTIONS.ADD_NOTICE, payload: newNotice });
		return newNotice;
	}, []);

	const updateNotice = useCallback((notice) => {
		dispatch({ type: ACTIONS.UPDATE_NOTICE, payload: notice });
	}, []);

	const deleteNotice = useCallback((noticeId) => {
		dispatch({ type: ACTIONS.DELETE_NOTICE, payload: noticeId });
	}, []);

	const markAttendance = useCallback((date, studentId, status) => {
		dispatch({
			type: ACTIONS.UPDATE_ATTENDANCE,
			payload: { date, studentId, status },
		});
	}, []);

	const setFacultyProfile = useCallback((profile) => {
		dispatch({ type: ACTIONS.SET_FACULTY_PROFILE, payload: profile });
	}, []);

	// Load initial data
	const loadInitialData = useCallback(() => {
		// Sample dashboard stats
		setDashboardStats({
			totalStudents: 120,
			totalClasses: 6,
			todayAttendance: 85,
			pendingTasks: 3,
		});

		// Sample calendar events
		setCalendarEvents([
			{
				id: 1,
				title: "Advanced Mathematics",
				date: "2025-07-30",
				time: "09:00",
				type: "class",
				description: "Linear Algebra Chapter 3",
			},
			{
				id: 2,
				title: "Faculty Meeting",
				date: "2025-07-31",
				time: "14:00",
				type: "meeting",
				description: "Monthly department meeting",
			},
		]);

		// Sample students
		setStudents([
			{
				id: 1,
				name: "John Doe",
				rollNumber: "CSE001",
				class: "CSE-3A",
				email: "john@example.com",
				attendance: 92,
			},
			{
				id: 2,
				name: "Jane Smith",
				rollNumber: "CSE002",
				class: "CSE-3A",
				email: "jane@example.com",
				attendance: 88,
			},
			{
				id: 3,
				name: "Mike Johnson",
				rollNumber: "CSE003",
				class: "CSE-3B",
				email: "mike@example.com",
				attendance: 95,
			},
			{
				id: 4,
				name: "Sarah Wilson",
				rollNumber: "CSE004",
				class: "CSE-3B",
				email: "sarah@example.com",
				attendance: 90,
			},
		]);

		// Sample class schedule
		setClassSchedule([
			{
				id: 1,
				subject: "Advanced Mathematics",
				class: "CSE-3A",
				time: "09:00-10:00",
				room: "Room 101",
				dayOfWeek: "Monday",
			},
			{
				id: 2,
				subject: "Data Structures",
				class: "CSE-3B",
				time: "11:00-12:00",
				room: "Room 102",
				dayOfWeek: "Tuesday",
			},
			{
				id: 3,
				subject: "Algorithm Design",
				class: "CSE-3A",
				time: "14:00-15:00",
				room: "Room 103",
				dayOfWeek: "Wednesday",
			},
		]);

		// Sample notices
		setNotices([
			{
				id: 1,
				title: "Assignment Submission Reminder",
				content: "Please submit your assignments by Friday.",
				priority: "high",
				createdAt: "2025-07-29",
				targetStudents: "CSE-3A",
			},
			{
				id: 2,
				title: "Mid-term Exam Schedule",
				content: "Mid-term exams will be conducted next week.",
				priority: "medium",
				createdAt: "2025-07-28",
				targetStudents: "all",
			},
		]);
	}, [
		setDashboardStats,
		setCalendarEvents,
		setStudents,
		setClassSchedule,
		setNotices,
	]);

	const value = {
		...state,
		actions: {
			setLoading,
			setError,
			clearError,
			setDashboardStats,
			setCalendarEvents,
			addCalendarEvent,
			updateCalendarEvent,
			deleteCalendarEvent,
			setStudents,
			setClassSchedule,
			addClassSchedule,
			updateClassSchedule,
			deleteClassSchedule,
			setNotices,
			addNotice,
			updateNotice,
			deleteNotice,
			markAttendance,
			setFacultyProfile,
			loadInitialData,
		},
	};

	return (
		<FacultyDashboardContext.Provider value={value}>
			{children}
		</FacultyDashboardContext.Provider>
	);
};

export default FacultyDashboardContext;
