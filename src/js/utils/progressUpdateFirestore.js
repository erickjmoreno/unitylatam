async function updateToFirestore(payload) {
	try {
		await progressRef.update(payload);
		alert("Se ha actualizado correctamente");
	} catch {
		alert("Ha ocurrido un error");
	}
}

export function updateUnityData(data) {
	const { progressData, formData } = data;
	const newRaidList = progressData.unityData[formData.expansion].raids[formData.raidNameUD].raid.map((boss) => {
		if (boss.slug == formData.raidBossUD) {
			let newData = [...boss.data];
			newData[2] = formData.youtubeUD;
			newData[3] = formData.triesUD;
			newData[4] = formData.rankLUD;
			newData[5] = formData.rankWUD;
			return {
				...boss,
				data: [...newData],
			};
		}
		return boss;
	});

	const unityData = {
		...progressData.unityData,
		[formData.expansion]: {
			...progressData.unityData[formData.expansion],
			raids: {
				...progressData.unityData[formData.expansion].raids,
				[formData.raidNameUD]: {
					...progressData.unityData[formData.expansion].raids[formData.raidNameUD],
					raid: newRaidList,
				},
			},
		},
	};

	updateToFirestore({ unityData });
}

export function updateCurrentTier(data) {
	const { formData, raidList } = data;
	const currentBossList = raidList[formData.expansion].find((tier) => tier.slug === formData.currentTierSlug) || [];
	const bossCount = currentBossList.bossList?.length || 0;
	const tierNumber = raidList[formData.expansion].indexOf(currentBossList);
	const expansion = formData.expansion;
	const slug = formData.currentTierSlug;
	const currentTier = {
		bossCount,
		expansion,
		slug,
		tierNumber,
	};
	updateToFirestore({ currentTier });
}

export function submitNewRaid(data) {
	const { formData, progressData } = data;
	const specificExpansionBosses = progressData.raidBossesNames[formData.expansion];
	const doesRaidNumberAlreadyExists = specificExpansionBosses.some((_, index) => index === formData.raidNumber);
	let raidList = [...progressData.raidBossesNames[formData.expansion]];
	const bossList = raidList[formData.raidNumber]?.bossList || [];
	raidList[formData.raidNumber] = {
		slug: formData.raidNameNew,
		raidNumber: formData.raidNumber,
		bossList: [...bossList],
	};

	const raidBossesNames = {
		...progressData.raidBossesNames,
		[formData.expansion]: raidList,
	};
	const guildsRanking = {
		...progressData.guildsRanking,
		[formData.expansion]: [
			...progressData.guildsRanking[formData.expansion],
			{
				rankings: [],
				raidNumber: formData.raidNumber,
				slug: formData.raidNameNew,
			},
		],
	};
	let tiers = progressData.unityData[formData.expansion].tiers || [];
	tiers[formData.raidNumber] = formData.raidNameNew;
	const unityData = {
		...progressData.unityData,
		[formData.expansion]: {
			tiers,
			raids: {
				...progressData.unityData[formData.expansion].raids,
				[formData.raidNameNew]: {
					raid: [],
					tier: formData.raidNumber,
				},
			},
		},
	};

	updateToFirestore({ raidBossesNames, guildsRanking, unityData });
}

export function submitNewBoss(data) {
	const { progressData, formData } = data;
	const raidList = progressData.raidBossesNames[formData.expansion].map((raid) => {
		if (raid.slug === formData.raidName) {
			raid.bossList[formData.bossNumber] = formData.bossName;
		}
		return raid;
	});

	const raidBossesNames = {
		...progressData.raidBossesNames,
		[formData.expansion]: raidList,
	};

	const bossList = [...progressData.unityData[formData.expansion].raids[formData.raidName].raid];

	bossList[formData.bossNumber] = {
		data: ["", false, "", 0, 0, 0],
		slug: formData.bossName,
	};

	const unityData = {
		...progressData.unityData,
		[formData.expansion]: {
			...progressData.unityData[formData.expansion],
			raids: {
				...progressData.unityData[formData.expansion].raids,
				[formData.raidName]: {
					...progressData.unityData[formData.expansion].raids[formData.raidName],
					raid: bossList,
				},
			},
		},
	};
	updateToFirestore({ raidBossesNames, unityData });
}

export async function updateTOP5IOHandler(data) {
	const { progressData } = data;
	const guildsRanking = await fetchRaiderIOTOP5GuildsData({ progressData });
	updateToFirestore({ guildsRanking });
}

export async function updateUnityIOHandler(data) {
	const { progressData } = data;
	const unityData = await fetchRaiderIOUnityData({ progressData });
	updateToFirestore({ unityData });
}
