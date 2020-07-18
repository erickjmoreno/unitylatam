import React, { useState, useEffect } from "react";
import questions from "../../elements/questions";
import inputs from "../../utils/inputs";
import { applysRef } from "../../firebase/references";

function ApplyForm(props) {
	const [formValues, setFormValues] = useState({});
	const [formQuestions, setFormQuestions] = useState([]);

	function formHandler(e) {
		e.preventDefault();
		let fullfilled = true;
		formQuestions.forEach((question) => {
			if (formValues[`${question.name}`].length < 2) fullfilled = false;
		});
		if (!fullfilled) {
			alert("Llene todos los campos");
			return;
		}
		const formQA = formQuestions.map((question) => {
			return {
				question: question.label,
				answer: formValues[`${question.name}`],
				style: question.style,
				officerString: question.officerString,
			};
		});

		applysRef
			.collection(`core${props.core}`)
			.doc()
			.set({
				questions: formQA,
				date: new Date(),
			})
			.then(() => {
				props.changeAlreadySent();
			});
	}

	function onChangeHandler(e) {
		const { name, value } = e.target;

		setFormValues({
			...formValues,
			[name]: value,
		});
	}

	useEffect(() => {
		let newFormValues = {};
		questions
			.sort((a, b) => a.section - b.section)
			.forEach((question) => {
				newFormValues = { ...newFormValues, [question.name]: "" };
			});
		setFormValues(newFormValues);
		setFormQuestions(questions);
	}, []);

	return (
		<form key="applyForm" className="applyForm" onSubmit={formHandler}>
			{formQuestions.map((question) => {
				const questionWithValue = {
					...question,
					value: formValues[`${question.name}`],
					onChange: onChangeHandler,
				};
				return inputs(questionWithValue);
			})}
			<div className="buttonsHolder">
				<button onClick={props.changeCore}>Cambiar de Core</button>
				<button>Enviar Applicación</button>
			</div>
		</form>
	);
}
export default ApplyForm;
