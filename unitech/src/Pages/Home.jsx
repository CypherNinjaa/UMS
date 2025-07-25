import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import EventsCalendar from "../Components/Home/EventsCalendar";

const Home = () => {
	return (
		<div className="Home-page">
			<HeroSection />
			<EventsCalendar />
		</div>
	);
};
export default Home;
