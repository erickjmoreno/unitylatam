import React, { useState } from "react";
import useExpansion from "../../hooks/expansion";

const expansions = [
	{
		img:
			"https://gamepedia.cursecdn.com/wowpedia/thumb/3/37/Battle_for_Azeroth_logo.png/320px-Battle_for_Azeroth_logo.png",
		expansion: "battleForAzeroth",
	},
	{
		img: "https://gamepedia.cursecdn.com/wowpedia/thumb/a/a6/Shadowlands_logo.png/320px-Shadowlands_logo.png",
		expansion: "shadowlands",
	},
	{
		img: "https://gamepedia.cursecdn.com/wowpedia/thumb/2/2e/Legionlogo.png/320px-Legionlogo.png",
		expansion: "legion",
	},
];

function HomeSwitchByExpansion(props) {
	const { data } = props;
	const { expansion: activeExpansion, setExpansion } = data;

	function switchExpansion(e) {
		const { name } = e.target;
		setExpansion(name);
	}

	const images = expansions.map(({ img, expansion }) => (
		<img
			draggable="false"
			key={expansion}
			className={expansion === activeExpansion ? "activeExpansion" : ""}
			name={expansion}
			src={img}
			onClick={switchExpansion}
		/>
	));

	return <div className="expansionSwitch">{images}</div>;
}

export default HomeSwitchByExpansion;
