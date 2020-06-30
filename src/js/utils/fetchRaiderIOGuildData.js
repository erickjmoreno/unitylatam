async function fetchRaiderIOTOP5GuildsData({ progressData }) {
	const { currentTier, guildsRanking: guildsRankingOld } = progressData;
	const topUrl = `https://raider.io/api/v1/raiding/raid-rankings?raid=${currentTier.slug}&difficulty=mythic&region=us-spanish`;
	const topGuildsData = await fetch(topUrl);
	const topGuildsDataJSON = await topGuildsData.json();
	if (topGuildsData.status !== 200) {
		console.log(topGuildsData.status);
		return null;
	}
	const top5Guilds = topGuildsDataJSON.raidRankings.filter((_, i) => i < 5);

	const newTop5 = guildsRankingOld[currentTier.expansion].map((raid) => {
		if (raid.slug === currentTier.slug) {
			const rankings = top5Guilds.map((guild) => {
				const { rank, regionRank } = guild;
				const { id, name } = guild.guild;
				const region = guild.guild.region.slug;
				const realm = guild.guild.realm.slug;
				const encountersDefeated = guild.encountersDefeated.length;
				return {
					id,
					name,
					rank,
					realm,
					region,
					regionRank,
					encountersDefeated,
					updated: Date.now(),
				};
			});
			return {
				...raid,
				rankings,
			};
		}
		return raid;
	});

	const guildsRanking = {
		...guildsRankingOld,
		[currentTier.expansion]: newTop5,
	};
	return guildsRanking;
}
async function fetchRaiderIOUnityData({ progressData }) {
	const { currentTier, unityData: unityDataOld } = progressData;
	const unityID = 9484;
	const url = `https://raider.io/api/v1/raiding/raid-rankings?raid=${currentTier.slug}&difficulty=mythic&region=us-spanish&guilds=${unityID}`;
	const unityIOData = await fetch(url);
	if (unityIOData.status !== 200) {
		console.log(unityIOData.status);
		return null;
	}
	const unityIODataJSON = await unityIOData.json();

	const newRaidData = unityDataOld[currentTier.expansion].raids[currentTier.slug].raid.map((boss) => {
		const encountersData = unityIODataJSON.raidRankings[0].encountersDefeated.find(
			(encounter) => encounter.slug == boss.slug
		);
		boss.data[0] = encountersData.firstDefeated || "";
		boss.data[1] = !!encountersData.firstDefeated || false;
		return boss;
	});

	const unityData = {
		...unityDataOld,
		[currentTier.expansion]: {
			...unityDataOld[currentTier.expansion],
			raids: {
				...unityDataOld[currentTier.expansion].raids,
				[currentTier.slug]: {
					...unityDataOld[currentTier.expansion].raids[currentTier.slug],
					raid: newRaidData,
				},
			},
		},
	};
	return unityData;
}

export { fetchRaiderIOTOP5GuildsData, fetchRaiderIOUnityData };
