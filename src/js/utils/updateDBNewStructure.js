import React from "react";

function UpdateButton(props) {
	const { data, progRef } = props;
	const { currentTier, guildsRanking, unityData, raidBossesNames } = data;

	const raidBss = { ...raidBossesNames };
	const tierOrder = raidBossesNames.battleForAzeroth.tierOrder;
	delete raidBss.battleForAzeroth.tierOrder;

	const newRaidBossesNames = Object.entries(raidBss.battleForAzeroth)
		.map(([key, val], index) => {
			return {
				raidNumber: tierOrder.indexOf(key),
				slug: key,
				bossList: val,
			};
		})
		.sort((a, b) => a.raidNumber - b.raidNumber);

	function compareDate(a, b) {
		const dateA = new Date(a[1][0]);
		const dateB = new Date(b[1][0]);
		if (dateA > dateB) return 1;
		return -1;
	}

	const newUnityBFAData = unityData.battleForAzeroth.map((raid) => {
		const bosses = Object.entries(raid)
			.sort(compareDate)
			.map(([key, val], index) => {
				return {
					slug: key,
					data: val,
				};
			});

		return bosses;
	});
	console.log(newUnityBFAData);
	let test = {};
	newUnityBFAData.forEach((raid, index) => {
		test[tierOrder[index]] = {
			raid,
			tier: index,
		};
	});

	let variables = [];
	let list = [];
	for (let i = 0; i < list.length; i++) {
		const element = array[i];
	}

	const newData = {
		currentTier,
		guildsRanking,
		unityData: {
			shadowlands: [],
			battleForAzeroth: {
				raids: test,
				tiers: [...tierOrder],
			},
		},
		raidBossesNames: {
			shadowlands: [],
			battleForAzeroth: [...newRaidBossesNames],
		},
	};

	// function updateDB() {
	// 	progRef.update(newData);
	// }
	console.log(newData);
	return <div>{/* <button onClick={updateDB}>Update</button> */}</div>;
}

export default UpdateButton;
