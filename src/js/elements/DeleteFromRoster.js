import React from "react";

function deleteFromRoster(args) {
	const { personToRemove, rosterData, rosterRef, setIsReadyToSave, core, resetPersonToRemove } = args;
	if (!personToRemove) return;
	if (!confirm(`Desea eliminar a ${personToRemove}`)) return;
	setIsReadyToSave(true);
	const strippedData = rosterData[`core${core}`].filter((data) => data.name != personToRemove);
	const newRosterData = {
		...rosterData,
		[`core${core}`]: [...strippedData],
	};
	rosterRef.update(newRosterData).then(() => {
		resetPersonToRemove("");
		setIsReadyToSave(false);
	});
}

function deleteCharacterFromRoster(args) {
	const {
		personToRemove,
		characterToRemove,
		rosterData,
		rosterRef,
		setIsReadyToSave,
		core,
		resetPersonToRemove,
		setCharacterToRemove,
	} = args;
	if (!characterToRemove) return;
	if (!confirm(`Desea eliminar a ${characterToRemove}`)) return;
	setIsReadyToSave(true);

	const strippedData = rosterData[`core${core}`].filter((data) => data.name != personToRemove);
	const personData = rosterData[`core${core}`].filter((data) => data.name == personToRemove)[0];
	const charactersData = personData.characters.filter((character) => character.name != characterToRemove);

	const personDataWithCharaters = {
		...personData,
		characters: [...charactersData],
	};

	const newRosterData = {
		...rosterData,
		[`core${core}`]: [...strippedData, personDataWithCharaters],
	};

	rosterRef.update(newRosterData).then(() => {
		resetPersonToRemove("");
		setCharacterToRemove("");
		setIsReadyToSave(false);
	});
}
export { deleteFromRoster, deleteCharacterFromRoster };
