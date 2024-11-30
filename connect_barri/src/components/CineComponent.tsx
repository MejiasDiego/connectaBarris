import React from "react";

const CineComponent: React.FC = () => {
	const events = JSON.parse(localStorage.getItem("events"));
	console.log("ALALALALA_2");
	console.log(events);
	return events.map((ev, idx) => <h1> {ev.name} </h1>)
};

export default CineComponent;

