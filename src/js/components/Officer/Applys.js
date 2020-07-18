import React, { useState } from "react";
import applyObjectToString from "../../utils/applyObjectToString";
import ApplyResponse from "./ApplyResponse";

function Apply(props) {
	const [isResponding, setIsResponding] = useState(false);

	const { questions, date, id, answer } = props.data;
	const dateSent = new Date(date.seconds * 1000);
	const mail = questions.filter((question) => question.officerString === "Mail")[0].answer;

	function changeIsResponding(isResponding) {
		setIsResponding(isResponding);
	}

	function deleteApply(id) {
		if (!confirm("¿Esta seguro?")) return;
		props.applysRef
			.doc(id)
			.delete()
			.then(() => {
				alert("Se ha eliminado correctamente");
			});
	}

	return (
		<div className="applyItem">
			<div key={date.seconds} className="applyDate">
				<strong>Fecha de aplicación: </strong>
				{dateSent.toLocaleDateString()}
			</div>
			<div className="applyQuestions">
				{questions.map((el, index) => applyObjectToString(el, index + 1, props.index))}
			</div>

			<div className="applyPrevAnswers">{answer && answer.map((a, index) => <p key={`${index}${id}`}>{a}</p>)}</div>

			{!isResponding ? (
				<div className="applyButtonHolder">
					<button onClick={() => setIsResponding(true)}>Responder</button>
					<button onClick={() => deleteApply(id)}>Eliminar</button>
				</div>
			) : (
				<ApplyResponse
					mail={mail}
					prevAnswers={answer || []}
					isResponding={changeIsResponding}
					document={props.applysRef.doc(id)}
				/>
			)}
		</div>
	);
}

export default Apply;
