import React from "react";

function RosterCoreSwitcher(props) {
	const activeSettings = { background: "orange", color: "white" };
	const isCore1Active = props.activeCore == 1 ? activeSettings : {};
	const isCore2Active = props.activeCore == 2 ? activeSettings : {};
	return (
		<div>
			<button style={isCore1Active} onClick={() => props.changeCore(1)}>
				Core 1
			</button>
			<button style={isCore2Active} onClick={() => props.changeCore(2)}>
				Core 2
			</button>
		</div>
	);
}

export default RosterCoreSwitcher;
