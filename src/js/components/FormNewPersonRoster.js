import React, { useState } from "react";
import { countries } from "../elements/countryList";
import { deleteCharacterFromRoster, deleteFromRoster } from "../elements/DeleteFromRoster";
import AddMemberForm from "./AddMemberForm";
import RosterDeleteMemberForm from "../elements/RosterDeleteMemberForm";
import AddCharacterToMember from "./AddCharacterToMember";
import { removeUnusedData, template } from "../utils/rosterFormUtils";
import sortByName from "../utils/sortByName";

function FormNewPersonRoster(props) {
	const [isFormOn, setFormIsOn] = useState(false);
	const [isReadyToSave, setIsReadyToSave] = useState(false);
	const [formData, setFormData] = useState(template);
	const [isRemoving, setIsRemoving] = useState(false);
	const [personToRemove, setPersonToRemove] = useState("");
	const [characterToRemove, setCharacterToRemove] = useState("");
	const { setRosterData, rosterRef, rosterData } = props.data;

	function toggleForm(isFormOn) {
		setFormIsOn(!isFormOn);
		isRemoving && setIsRemoving(false);
	}

	function toggleRemove(isRemoving) {
		setIsRemoving(!isRemoving);
		isFormOn && setFormIsOn(false);
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value.trim(),
		});
	}

	function resetPersonToRemove() {
		setPersonToRemove("");
	}

	function resetFormData() {
		setFormData({ ...template, core: formData.core });
	}

	function handleChangeForEdit(e, rosterData) {
		const { name, value } = e.target;
		if (value === "") {
			resetFormData();
			return;
		}
		const person = rosterData[`core${formData.core}`].filter((person) => person.name == value)[0];
		Object.keys(person).forEach((key) => {
			if (person[key] === null) person[key] = "";
		});
		setFormData({
			...template,
			...formData,
			...person,
			edit: person.name,
		});
	}

	function handleForm(e, rosterData, formData) {
		e.preventDefault();
		setIsReadyToSave(true);
		const alreadyExists = rosterData[`core${formData.core}`].some((data) => data.name === formData.name);
		const isEdit = !!formData.edit;
		if (alreadyExists && !isEdit) {
			setFormData(template);
			setIsReadyToSave(false);
			return;
		}
		let newRosterData = {};
		if (isEdit) {
			const strippedData = rosterData[`core${formData.core}`].filter((data) => data.name !== formData.edit);
			const formDataToUpload = removeUnusedData(formData);
			newRosterData = {
				...rosterData,
				[`core${formData.core}`]: [...strippedData, formDataToUpload],
			};
		}
		if (!isEdit) {
			const formDataToUpload = removeUnusedData(formData);
			newRosterData = {
				...rosterData,
				[`core${formData.core}`]: [...rosterData[`core${formData.core}`], formDataToUpload],
			};
		}

		rosterRef.update(newRosterData).then(() => {
			setFormData(template);
			setIsReadyToSave(false);
		});
	}

	function editOptions() {
		const noEditOption = (
			<option key={"NoEdit"} value={""}>
				{"Ninguno"}
			</option>
		);
		const rosterOptionsForEdit = [
			noEditOption,
			...[...rosterData[`core${formData.core}`]].sort(sortByName).map((person) => (
				<option key={person.name} value={person.name}>
					{person.name}
				</option>
			)),
		];
		return rosterOptionsForEdit;
	}

	function editOptionsCharacters() {
		const noEditOption = (
			<option key={"NoEdit"} value={""}>
				{"Ninguno"}
			</option>
		);
		const personData = rosterData[`core${formData.core}`].filter((person) => person.name === personToRemove)[0];
		const personDataCharacters = personData.characters || [];
		const charactersForPerson = personDataCharacters.map((character) => (
			<option key={character.name} value={character.name}>
				{character.name}
			</option>
		));
		const rosterOptionsForEdit = [noEditOption, ...charactersForPerson];
		return rosterOptionsForEdit;
	}

	const propsForRosterDeleteMemberForm = {
		formData,
		rosterRef,
		rosterData,
		personToRemove,
		characterToRemove,
		editOptions,
		handleChange,
		setIsReadyToSave,
		deleteFromRoster,
		setPersonToRemove,
		resetPersonToRemove,
		setCharacterToRemove,
		editOptionsCharacters,
		deleteCharacterFromRoster,
	};

	const propsForFormToAdd = {
		formData,
		countries,
		rosterData,
		editOptions,
		handleForm,
		handleChange,
		handleChangeForEdit,
	};

	return (
		<div className="addMemberForm">
			<button onClick={() => toggleForm(isFormOn)}>{!isFormOn ? "Agregar" : "Cerrar"}</button>
			<button onClick={() => toggleRemove(isRemoving)}>{!isRemoving ? "Borrar" : "Cerrar"}</button>
			{!isReadyToSave && isRemoving && <RosterDeleteMemberForm data={propsForRosterDeleteMemberForm} />}
			{isReadyToSave ? (
				<h3>Guardando...</h3>
			) : (
				isFormOn && (
					<>
						<AddMemberForm data={propsForFormToAdd} />
						<AddCharacterToMember data={{ rosterRef, rosterData, editOptions, core: formData.core }} />
					</>
				)
			)}
		</div>
	);
}

export default FormNewPersonRoster;
