import React from "react";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";
import { NewsEventProvider } from "../contexts/NewsEventContext";
import NewsEventsManagementContent from "../Components/Admin/NewsEventsManagementContent";

const NewsEventsManagement = () => {
	return (
		<AdminLayout>
			<NewsEventProvider>
				<NewsEventsManagementContent />
			</NewsEventProvider>
		</AdminLayout>
	);
};

export default NewsEventsManagement;
