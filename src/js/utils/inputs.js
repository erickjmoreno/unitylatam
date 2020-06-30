import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function createInput({ name, value, onChange, type, required }) {
	return <input name={name} value={value} type={type} onChange={onChange} required={required} />;
}

function createDateInput({ name, value, onChange, type, required }) {
	function changeHandler(date) {
		onChange({ target: { name, value: date } });
	}
	return <DatePicker name={name} selected={value} type={type} onChange={changeHandler} required={required} />;
}

function createCheckbox({ name, value, onChange, type, required }) {
	return <input name={name} checked={value} type={type} onChange={onChange} required={required} />;
}

function createTextArea({ name, value, onChange, required }) {
	return <textarea name={name} value={value} onChange={onChange} required={required} />;
}

function createRadioButton({ name, value, onChange, options }) {
	const radioButtons = options.map((option) => (
		<label key={`${name}${option}`} className="radioLabel">
			{option}
			<input
				className="radioInput"
				type="radio"
				value={option}
				name={name}
				checked={value === option}
				onChange={onChange}
			/>
		</label>
	));
	return radioButtons;
}

function inputSelector(options) {
	switch (options.type) {
		case "text":
		case "number":
			return createInput(options);
		case "date":
			return createDateInput(options);
		case "textarea":
			return createTextArea(options);
		case "checkbox":
			return createCheckbox(options);
		case "radio":
			return createRadioButton(options);
		default:
			return null;
	}
}

function createInputHandler(options) {
	return (
		<label key={options.name} className={`${options.style} ${options.style}${options.type}`}>
			{options.label}
			{inputSelector(options)}
		</label>
	);
}

export default createInputHandler;
