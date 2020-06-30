import React, { useState, useEffect } from "react";
import { rosterRef, webVersionRef } from "../firebase/references";
import getCharacterData from "../utils/getCharacterData";

//export const rosterRef = firestore.collection("Unity").doc("roster");
function AddCharacterToMember(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState({});
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

	useEffect(() => {
		webVersionRef.onSnapshot((doc) => setApiData(doc.data()));
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		if (!formData.memberName || !formData.characterRealm || !formData.characterName) return;
		getCharacterData({ apiData, formData, rosterData, core, rosterRef, changeIsLoading, resetFormData, webVersionRef });
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
					<h3>Agregar personaje a miembro</h3>
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
