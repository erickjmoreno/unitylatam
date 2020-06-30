import React, { useState, useEffect } from "react";
import { applysRef } from "../firebase/references";
import Applys from "../components/Applys";

function OfficersApplyReview(props) {
	const [core, setCore] = useState(props.core);
	const [applyList, setApplyList] = useState([]);

	useEffect(() => {
		const applyRef = applysRef.collection(core).onSnapshot((docs) => {
			let temporalList = [];
			docs.forEach((doc) => {
				temporalList = [...temporalList, { ...doc.data(), id: doc.id }];
			});
			setApplyList(temporalList);
		});
		return applyRef;
	}, []);

	return (
		<div className="officerPage">
			<h3 style={{ textAlign: "center" }}>Aplicaciones {core == "core1" ? "Core 1" : "Core 2"}</h3>
			{applyList.length > 0 ? (
				applyList.map((applyData, index) => (
					<Applys key={`${index}apply`} data={applyData} index={index} applysRef={applysRef.collection(core)} />
				))
			) : (
				<h4>No hay aplicaciones pendientes para revisar</h4>
			)}
		</div>
	);
}

export default OfficersApplyReview;
