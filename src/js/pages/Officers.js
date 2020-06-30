import React, { useContext, useState, useEffect } from "react";
import OfficersApplyReview from "../components/OfficersApplyReview";
import { AuthContext } from "../AuthContext";
function Officers() {
	const { isLoggedIn, userData } = useContext(AuthContext);
	const [core, setCore] = useState(null);

	function handleCore(core) {
		setCore(core);
	}
	useEffect(() => {
		const id = userData.id;
		if (id === "AWWngjHLBVTu6UOEta8yGDkoEkF2") {
			handleCore("core2");
		} else {
			handleCore("core1");
		}
	}, [userData]);

	const applies = core && <OfficersApplyReview core={core} />;
	return (
		<div className="mainContent officers">
			{isLoggedIn ? applies : <h2 style={{ textAlign: "center" }}>Debe Conectarse para visualizar esta página</h2>}
		</div>
	);
}

export default Officers;
