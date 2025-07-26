import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import EventsCalendar from "../Components/Home/EventsCalendar";
import NewsHighlights from "../Components/Home/NewsHighlights";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import StudentSuccessStories from "../Components/Home/StudentSuccessStories";

const Home = () => {
	return (
		<div className="Home-page">
			<HeroSection />
			<EventsCalendar />
			<NewsHighlights />
			<StudentSuccessStories />
			<WhyChooseUs />
		</div>
	);
};
export default Home;
