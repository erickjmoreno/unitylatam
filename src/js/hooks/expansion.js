import { useState } from "react";

function useExpansion(currentExpansion = "") {
	const [expansion, setExpansion] = useState(currentExpansion);

	function changeExpansion(name) {
		setExpansion(name);
	}
	return [expansion, changeExpansion];
}

export default useExpansion;
