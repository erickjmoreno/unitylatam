export async function updateCharacterInDB(args, feed) {
	const { rosterData, core, rosterRef, formData } = args;
	const strippedArray = rosterData[`core${core}`].filter((member) => member.name != formData.memberName);
	const specificDataForMember = rosterData[`core${core}`].filter((member) => member.name == formData.memberName);
	const characters = specificDataForMember[0]?.characters || [];
	const updatedCharacterList = [...characters, feed];

	const appendedData = {
		...rosterData,
		[`core${core}`]: [...strippedArray, { ...specificDataForMember[0], characters: [...updatedCharacterList] }],
	};

	await rosterRef.update(appendedData);
}
