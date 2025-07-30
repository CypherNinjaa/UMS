import { useContext } from "react";
import NewsEventContext from "./NewsEventContextDefinition";

export const useNewsEvent = () => {
	const context = useContext(NewsEventContext);
	if (!context) {
		throw new Error("useNewsEvent must be used within a NewsEventProvider");
	}
	return context;
};
