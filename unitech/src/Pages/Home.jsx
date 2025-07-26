import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import EventsCalendar from "../Components/Home/EventsCalendar";
import NewsHighlights from "../Components/Home/NewsHighlights";

const Home = () => {
	return (
		<div className="Home-page">
			<HeroSection />
			<EventsCalendar />
			<NewsHighlights />
		</div>
	);
};
export default Home;
