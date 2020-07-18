import React, { useState } from "react";

function ioDateFormat(x) {
	var inx = x.indexOf("T");
	var x2 = x.substring(0, inx);
	var x3 = x2.split("-");
	var x4 = x3[2] + "/" + x3[1] + "/" + x3[0].replace("20", "");
	return x4;
}

function BossBox(props) {
	const { rank, name, slug, date, tierSlug, generalAddress } = props.data;
	const [imgSrc, setImgSrc] = useState(`${generalAddress}${tierSlug}/bossicons/${slug}.jpg`);
	function handleClick(e, url) {
		e.stopPropagation();
		if (!url) return;
		window.open(url, "_blank");
	}
	function onErrorHandler() {
		const url =
			"https://gamepedia.cursecdn.com/wowpedia/9/97/Inv_misc_questionmark.png?version=f94fb4213b3b1ccf23bc53458b7090ea";
		setImgSrc(url);
	}
	return (
		<div className="bossBox">
			<div className="tooltipTextHolder">
				<span className="tooltipTextContent">{name}</span>
				<br />
				{!!rank.world && (
					<span>
						World: {rank.world} <br />
					</span>
				)}
				{!!rank.latino && (
					<span>
						Latino: {rank.latino}
						<br />
					</span>
				)}
				{!!rank.tries && <span> Tries: {rank.tries} </span>}
			</div>
			<div onClick={(e) => handleClick(e, rank.link)} className="bossPictureHolder">
				<div className="bossFoto">
					<img src={imgSrc} className="bossBoxImg" draggable="false" onError={onErrorHandler} />
				</div>
				<div className="killDate">{date && ioDateFormat(date)}</div>
			</div>
		</div>
	);
}

export default BossBox;
