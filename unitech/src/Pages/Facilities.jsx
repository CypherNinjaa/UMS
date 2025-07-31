import React from "react";
// Import images for each facility (add your images to src/assets/ with these names)
import libraryImg from "../assets/libraryImg.png";
import laboratoriesImg from "../assets/laboratriesImg.png";
import sportsImg from "../assets/sports.png";
import hostelImg from "../assets/hostel.png";
import cafeteriaImg from "../assets/cafeteria.png";
import wifiImg from "../assets/wifi.png";
import medicalImg from "../assets/medical.png";
import auditoriumImg from "../assets/auditorium.png";
import "./Facilities.css";

const facilitiesList = [
	{
		name: "Library",
		description:
			"A vast collection of books, journals, and digital resources for students and faculty.",

		image: libraryImg,
	},
	{
		name: "Laboratories",
		description:
			"State-of-the-art labs for practical learning in science, engineering, and technology.",

		image: laboratoriesImg,
	},
	{
		name: "Sports Complex",
		description:
			"Facilities for indoor and outdoor sports including gymnasium, courts, and fields.",

		image: sportsImg,
	},
	{
		name: "Hostel",
		description:
			"Comfortable and secure accommodation for students from different regions.",

		image: hostelImg,
	},
	{
		name: "Cafeteria",
		description:
			"Healthy and delicious food options available throughout the day.",

		image: cafeteriaImg,
	},
	{
		name: "Wi-Fi Campus",
		description: "High-speed internet connectivity across the campus.",

		image: wifiImg,
	},
	{
		name: "Medical Center",
		description: "On-campus healthcare and emergency medical services.",

		image: medicalImg,
	},
	{
		name: "Auditorium",
		description:
			"Modern auditorium for seminars, workshops, and cultural events.",

		image: auditoriumImg,
	},
];

const Facilities = () => {
	return (
		<div className="facilities-container">
			<h2>University Facilities</h2>
			<div className="facilities-list">
				{facilitiesList.map((facility, idx) => (
					<div className="facility-card" key={idx}>
						<img
							src={facility.image}
							alt={facility.name + " image"}
							className="facility-image"
							style={{
								width: "80px",
								height: "80px",
								objectFit: "cover",
								marginBottom: "0.5rem",
							}}
						/>

						<h3>{facility.name}</h3>
						<p>{facility.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Facilities;
