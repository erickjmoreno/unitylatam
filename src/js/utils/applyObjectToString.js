import React from "react";
import isUrl from "is-url";

function customFormat(x) {
	const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
	var YYYY, MMM, DD, D, hh, h, mm, m;
	YYYY = x.getFullYear();
	MMM = meses[x.getMonth()];
	DD = (D = x.getDate()) < 10 ? "0" + D : D;
	return DD + " " + MMM + ", " + YYYY;
}

function applyObjectToString({ officerString, answer, style }, index, applyIndex) {
	let acceptedAnswer = answer;
	if (answer.hasOwnProperty("seconds")) {
		acceptedAnswer = customFormat(new Date(answer.seconds * 1000));
	}

	function checkifUrl(acceptedAnswer) {
		return isUrl(acceptedAnswer);
	}

	function displayAppropiateAnswerDOM(acceptedAnswer) {
		if (checkifUrl(acceptedAnswer)) {
			return (
				<a href={`${acceptedAnswer}`} target="_blank">
					Enlace
				</a>
			);
		}
		return <span>{acceptedAnswer}</span>;
	}
	return (
		<div key={`${index}Apply${applyIndex}`} className={style}>
			<strong>{`${officerString}`}</strong>
			<br />
			{displayAppropiateAnswerDOM(acceptedAnswer)}
			<br />
		</div>
	);
}

export default applyObjectToString;
