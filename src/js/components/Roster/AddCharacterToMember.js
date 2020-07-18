import React, { useState, useEffect } from "react";
import { rosterRef } from "../../firebase/references";
import getCharacterData from "../../utils/getCharacterData";
import { updateCharacterInDB } from "../../utils/updateCharacterDB";

function AddCharacterToMember(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		characterName: "",
		characterRealm: "",
		memberName: "",
	});
	const { rosterData, editOptions, core } = props.data;

	function changeIsLoading(status) {
		setIsLoading(status);
	}

	function resetFormData() {
		setFormData({ ...formData, characterName: "" });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		changeIsLoading(true);
		if (!formData.memberName || !formData.characterRealm || !formData.characterName) return;
		const characterData = await getCharacterData({
			characterName: formData.characterName,
			characterRealm: formData.characterRealm,
		});
		resetFormData();
		if (characterData) updateCharacterInDB({ rosterData, core, rosterRef, formData }, characterData);
		changeIsLoading(false);
	}

	function handleChange(e) {
		const { value, name } = e.target;
		setFormData({
			...formData,
			[name]: value.trim(),
		});
	}

	return (
		<>
			{isLoading ? (
				<h3>Cargando...</h3>
			) : (
				<form className="rosterAddCharacterForm" onSubmit={handleSubmit}>
					<h3>Agregar personaje</h3>
					{rosterData.edit}
					<select name="edit" onChange={handleChange} name="memberName" value={formData.memberName}>
						{editOptions()}
					</select>
					<label>
						Personaje
						<input onChange={handleChange} value={formData.characterName} name="characterName"></input>
					</label>
					<label>
						Reino
						<input onChange={handleChange} value={formData.characterRealm} name="characterRealm"></input>
					</label>
					<button>Agregar</button>
				</form>
			)}
		</>
	);
}
export default AddCharacterToMember;
