"use strict";
import sortByNameWithRankOrder from "./sortByName";

test("Expects Mock to be ordered by rankOrder", () => {
	const mockOrdered = [{ rankOrder: 3 }, { rankOrder: 2 }, { rankOrder: 1 }, { rankOrder: 0 }];
	const mock1 = [{ rankOrder: 0 }, { rankOrder: 1 }, { rankOrder: 2 }, { rankOrder: 3 }];
	const mock2 = [{ rankOrder: 3 }, { rankOrder: 2 }, { rankOrder: 1 }, { rankOrder: 0 }];
	const mock3 = [{ rankOrder: 1 }, { rankOrder: 2 }, { rankOrder: 3 }, { rankOrder: 0 }];

	expect(mock1.sort(sortByNameWithRankOrder)).toEqual(mockOrdered);
	expect(mock2.sort(sortByNameWithRankOrder)).toEqual(mockOrdered);
	expect(mock3.sort(sortByNameWithRankOrder)).toEqual(mockOrdered);
});
