import React, { useState } from "react";
import { rejectResponse, onWaitResponse } from "../elements/applyResponseTemplates";
import { sendToMail } from "../firebase/references";

function ApplyResponse(props) {
	const [currentAnswer, setDefaultAnswer] = useState("");
	const { document } = props;

	function handleOnChange(e) {
		const { value } = e.target;
		setDefaultAnswer(value);
	}

	function sendMail() {
		if (!confirm("¿Enviar respuesta?")) return;
		document.update({ answer: [...props.prevAnswers, currentAnswer] });
		sendToMail({ mail: props.mail, answer: currentAnswer });
		setDefaultAnswer("");
		props.isResponding(false);
	}

	return (
		<div className="applyResponse">
			<textarea value={currentAnswer} onChange={handleOnChange} />
			<button onClick={() => setDefaultAnswer(rejectResponse)}>Template de Rechazar</button>
			<button onClick={() => setDefaultAnswer(onWaitResponse)}>Template de En Espera</button>
			<button onClick={() => props.isResponding(false)}>Cancelar</button>
			<button onClick={sendMail}>Enviar</button>
		</div>
	);
}

export default ApplyResponse;
