import React from "react";

function ioDateFormat(x) {
	var inx = x.indexOf("T");
	var x2 = x.substring(0, inx);
	var x3 = x2.split("-");
	var x4 = x3[2] + "/" + x3[1] + "/" + x3[0].replace("20", "");
	return x4;
}

function BossBox(props) {
	const { rank, name, slug, date, tierSlug, generalAddress } = props.data;
	function handleClick(e, url) {
		e.stopPropagation();
		if (!url) return;
		window.open(url, "_blank");
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
					<img src={`${generalAddress}${tierSlug}/bossicons/${slug}.jpg`} className="bossBoxImg" draggable="false" />
				</div>
				<div className="killDate">{date && ioDateFormat(date)}</div>
			</div>
		</div>
	);
}

export default BossBox;
