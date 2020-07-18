import React, { useState } from "react";
import CharacterBox from "./CharacterBox";
import "remixicon/fonts/remixicon.css";
import { countries } from "../../elements/countryList";
import { classIconsList } from "../../elements/classList";

function RosterBox(props) {
	const [isActive, setIsActive] = useState(false);
	const { data } = props;

	function toggleIsActive() {
		setIsActive(!isActive);
	}

	const country = data.country ? data.country.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "Mexico";

	const countryKey = countries[country];

	function handleClick(e, url) {
		e.stopPropagation();
		window.open(url, "_blank");
	}

	const activeBox = (
		<div className="rosterBox" onClick={toggleIsActive} draggable={false}>
			<div className="rosterBoxTop">
				<div className="avatarHolder">
					<img
						src={
							data.avatar ||
							"https://gamepedia.cursecdn.com/wowpedia/9/97/Inv_misc_questionmark.png?version=f94fb4213b3b1ccf23bc53458b7090ea"
						}
						alt="Avatar"
						draggable={false}
					/>
					{data.country ? (
						<img className="countryFlag" src={`https://www.countryflags.io/${countryKey}/flat/32.png`} alt="country" />
					) : null}
				</div>
				<div className="rosterNameHolder">
					<span className="rosterName">{data.name}</span>
					<br />
					<span className="rosterRank">{data.rank || "Member"}</span>
				</div>
				<div className="rosterMedia">
					{data.twitch && (
						<div onClick={(e) => handleClick(e, data.twitch)}>
							<i className="ri-twitch-line"></i>
						</div>
					)}
					{data.youtube && (
						<div onClick={(e) => handleClick(e, data.youtube)}>
							<i className="ri-youtube-line"></i>
						</div>
					)}
				</div>
			</div>
			{isActive &&
				data.characters &&
				data.characters.map((character, index) => <CharacterBox key={`${data.name}${index}`} data={character} />)}
		</div>
	);
	return <div>{activeBox}</div>;
}

export default RosterBox;
