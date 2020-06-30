export default function addClassListToPerson(coreArray) {
	const coreByClass = coreArray.map((person) => {
		const classList = person.characters?.map((character) => character.class);
		return { ...person, classList: classList || [] };
	});
	return coreByClass;
}
