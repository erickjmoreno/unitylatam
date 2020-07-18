import React from "react";

export default function RosterDeleteMemberForm(props) {
	const {
		handleChange,
		formData,
		setPersonToRemove,
		editOptions,
		deleteFromRoster,
		personToRemove,
		resetPersonToRemove,
		rosterData,
		rosterRef,
		setIsReadyToSave,
		characterToRemove,
		setCharacterToRemove,
		editOptionsCharacters,
		deleteCharacterFromRoster,
	} = props.data;

	const deleteCharacterForm = (
		<>
			<br />
			<label>
				Eliminar Personaje
				<select name="edit" onChange={(e) => setCharacterToRemove(e.target.value)} value={characterToRemove}>
					{rosterData[`core${formData.core}`].length > 0 && personToRemove && editOptionsCharacters()}
				</select>
				<button
					onClick={() =>
						deleteCharacterFromRoster({
							rosterRef,
							rosterData,
							personToRemove,
							characterToRemove,
							core: formData.core,
							setIsReadyToSave,
							resetPersonToRemove,
							setCharacterToRemove,
						})
					}
				>
					Borrar
				</button>
			</label>
		</>
	);
	return (
		<div className="rosterDeleteForm">
			<label>
				Core:
				<select
					style={{ width: "5em", marginBottom: "0.5em" }}
					name="core"
					onChange={handleChange}
					value={formData.core}
				>
					<option value={1}>1</option>
					<option value={2}>2</option>
				</select>
			</label>
			<br />
			<label>
				Eliminar Miembro
				<select name="edit" onChange={(e) => setPersonToRemove(e.target.value)} value={personToRemove}>
					{rosterData[`core${formData.core}`].length > 0 && editOptions()}
				</select>
				<button
					onClick={() =>
						deleteFromRoster({
							personToRemove,
							resetPersonToRemove,
							rosterData,
							rosterRef,
							setIsReadyToSave,
							core: formData.core,
						})
					}
				>
					Borrar
				</button>
			</label>
			{personToRemove && deleteCharacterForm}
		</div>
	);
}
