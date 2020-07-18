import React, { useState, useEffect, useMemo } from "react";
import { rosterRef } from "../../firebase/references";
import getCharacterData from "../../utils/getCharacterData";
import { updateCharacterInDB } from "../../utils/updateCharacterDB";
import getCharacterListAndNames from "../../utils/characterList";

function UpdateAllCharactersButtons(props) {
	const [isLoading, setIsLoading] = useState(false);
	const { rosterData, core } = props.data;
	const [currentCharacter, setCurrentCharacter] = useState("");
	const [currentPerson, setCurrentPerson] = useState("");
	const [count, setCount] = useState(0);
	const [amount, setAmount] = useState(0);

	function changeIsLoading(status) {
		setIsLoading(status);
	}

	const updateCharacterData = async (char) => {
		const { realm, name } = char;
		setCurrentCharacter(`${name}`);
		const updatedData = await getCharacterData({ characterRealm: realm, characterName: name });
		return updatedData;
	};

	const updatePersonData = async (person) => {
		let characters = [];
		for (let character of person.characters) {
			const updatedCharacter = await updateCharacterData(character);
			characters = [...characters, updatedCharacter];
		}
		return { ...person, characters };
	};

	const updatedRosterData = async (data) => {
		const totalAmountOfPeople = data.length;
		setAmount(totalAmountOfPeople);
		let counter = 0;
		let core = [];
		for (let person of data) {
			const updatedPersonData = await updatePersonData(person);
			counter++;
			setCount(counter);
			setCurrentPerson(person.name);
			core = [...core, updatedPersonData];
		}
		return core;
	};

	async function updateCoreCharacters(rosterData, core) {
		setIsLoading(true);
		const coreData = await updatedRosterData(rosterData[core]);
		const feed = { ...rosterData, [core]: coreData };
		setCurrentCharacter(`Actualizando Información a la base de datos`);
		setCount(0);
		rosterRef.update(feed);
		setIsLoading(false);
	}

	return (
		<>
			{isLoading ? (
				<h3>
					{Math.floor((count / amount) * 100)}%
					<br />
					{currentPerson} - {currentCharacter}
				</h3>
			) : (
				<>
					<h3> Actualizar </h3>
					<button onClick={() => updateCoreCharacters(rosterData, "core1")}>Core 1</button>
					<button onClick={() => updateCoreCharacters(rosterData, "core2")}>Core 2</button>
				</>
			)}
		</>
	);
}
export default UpdateAllCharactersButtons;
