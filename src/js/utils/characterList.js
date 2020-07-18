const charactersByPerson = (acc, data, i) => {
	return { ...acc, [data.name]: data.characters.map((character) => character.name) };
};
export default function getCharacterListsAndNames(roster) {
	const { core1, core2 } = roster;
	console.log(roster);
	const core1Roster = core1.reduce(charactersByPerson, {});
	const core2Roster = core2.reduce(charactersByPerson, {});
	return { core1: core1Roster, core2: core2Roster };
}
