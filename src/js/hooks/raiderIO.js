import { useState } from "react";

function raiderIO() {
	const [data, setData] = useState([]);

	function saveData(data) {
		setData(data);
	}
	return { data, saveData };
}

export default raiderIO;
