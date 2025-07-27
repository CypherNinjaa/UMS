import React from "react";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";
import DashboardOverview from "../Components/Admin/Dashboard/DashboardOverview";

const AdminDashboard = () => {
	return (
		<AdminLayout>
			<DashboardOverview />
		</AdminLayout>
	);
};

export default AdminDashboard;
