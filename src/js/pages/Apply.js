import React, { useState } from "react";
import ApplyForm from "../components/Applies/ApplyForm";
import rules from "../elements/guildRules";

function Apply() {
	const [coreNumber, setCoreNumber] = useState(0);
	const [alreadySent, setAlreadySent] = useState(false);

	function changeAlreadySent() {
		setAlreadySent(true);
	}

	function handleCoreSelection(core) {
		setCoreNumber(core);
	}
	function CoreSelectorButtons() {
		return (
			<div className="coreSelectorButtons">
				<button onClick={() => handleCoreSelection(1)}>Core 1</button>
				<button onClick={() => handleCoreSelection(2)}>Core 2</button>
			</div>
		);
	}

	function GuildRules({ rules }) {
		return (
			<div className="guildRules">
				<h3>Reglas</h3>
				{rules.map((rule, index) => (
					<p key={index}>{rule}</p>
				))}
			</div>
		);
	}

	function changeCore() {
		setCoreNumber(0);
	}

	function ApplyLogic() {
		return (
			<>
				{coreNumber > 0 && <GuildRules rules={rules[`core${coreNumber}`]} />}
				{!coreNumber ? (
					<CoreSelectorButtons />
				) : (
					<ApplyForm changeAlreadySent={changeAlreadySent} core={coreNumber} changeCore={changeCore} />
				)}
			</>
		);
	}
	return (
		<div className="mainContent applyPage">
			<h2>Aplicar para Unity {coreNumber ? `Core ${coreNumber}` : null}</h2>
			{alreadySent ? <h3>Su applicación fue enviada satisfactoriamente</h3> : <ApplyLogic />}
		</div>
	);
}

export default Apply;
