export default function sortByName(a, b) {
	const aRankOrder = a.rankOrder || 0;
	const bRankOrder = b.rankOrder || 0;

	if (aRankOrder < bRankOrder) return 1;
	if (aRankOrder > bRankOrder) return -1;
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;

	return 0;
}
