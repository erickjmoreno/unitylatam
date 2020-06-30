import React from "react";

function YouTube(props) {
	const { data } = props;

	function handleClick(e, url) {
		e.stopPropagation();
		window.open(url, "_blank");
	}

	return (
		<div className="youTubeHolder">
			{data.map((channelData, i) => {
				return (
					<div className="youTubeContent" key={`youTube${i}`} onClick={(e) => handleClick(e, channelData.channel)}>
						<img src={channelData.imgUrl} alt="youtubeChannel" />
					</div>
				);
			})}
		</div>
	);
}

export default YouTube;
