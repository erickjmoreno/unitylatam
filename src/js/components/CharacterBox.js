import React from "react";
import { classList, classIcons, classColors } from "../elements/classList";

function CharacterBox(props) {
	const { data } = props;
	function handleClick(e, url) {
		e.stopPropagation();
		window.open(url, "_blank");
	}
	const url = data.url || "https://www.google.com";
	return (
		<div className="characterHolder" onClick={(e) => handleClick(e, url)}>
			<strong style={{ color: classColors[data.class], gridColumn: "span 2" }}>{data.name}</strong>
			<img src={data.avatar} alt="icon" draggable={false}></img>
			<div className="characterData">
				<span>
					<strong>Lvl </strong> {data.level}
				</span>
				<span>
					<strong>Ilvl </strong> {data.ilevel || "490"}
				</span>
			</div>
			<div style={{ gridColumn: "span 2" }}>
				{data.mscore ? (
					<span>
						<strong>IO score </strong> {data.mscore}
					</span>
				) : null}
				<br />
				{data.mythicweekly && (
					<span>
						<strong>Weekly </strong>
						{data.mythicweekly} {data.mythicweeklylvl}
					</span>
				)}
			</div>
		</div>
	);
}
export default CharacterBox;
