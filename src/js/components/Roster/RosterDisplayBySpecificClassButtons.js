import React from "react";
import { classIconsList } from "../../elements/classList";

function RosterDisplayBySpecificClassButtons(props) {
	return (
		<div className="classBar">
			{classIconsList.map((icon, index) => (
				<img
					key={icon}
					src={icon}
					onClick={() => props.switch(index)}
					className={`${props.classActive == index ? "currentClass" : ""}`}
				/>
			))}
		</div>
	);
}
export default RosterDisplayBySpecificClassButtons;
