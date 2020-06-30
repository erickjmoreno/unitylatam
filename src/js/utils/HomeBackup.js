import React, { useEffect, useState } from "react";
import Progress from "../components/Progress";
import YouTube from "../components/YouTube";
import Top5 from "../components/top5";
import NewsSlider from "../components/Slider";
import { rankRef, progressRef } from "../firebase/references";

function Home() {
	const [progressData, setProgressData] = useState([]);
	const [unityData, setUnityData] = useState([]);

	useEffect(() => {
		const unsusbscribeMethod = rankRef.onSnapshot((docs) => {
			let referenceData = [];
			docs.forEach((doc) => {
				const data = doc.data();
				const id = doc.id;
				referenceData = [...referenceData, { data, id }];
			});
			const progressDataFiltered = referenceData.filter(({ id }) => id !== "unity");

			const guildData = referenceData.filter(({ id }) => id === "unity");
			const mappedData = Object.entries(guildData[0]?.data).map((arr) => {
				return { [arr[1].tier]: arr[1] };
			});
			setUnityData(mappedData);
			setProgressData(progressDataFiltered);
		});

		return unsusbscribeMethod;
	}, []);

	console.log(progressData);
	function addRosterToNewDirection() {
		function addToNewDirection() {
			const raidBossesNames = {
				shadowlands: {},
				battleForAzeroth: {},
			};
			let raidBossesNamesList = [];
			const feedData = progressData.reverse().map(({ data, id }) => {
				let top5Length = 5;
				const { raidRankings, tierNumber } = data;
				let top5RaidRankings = [];
				const tiers = {
					spanish: "uldir",
					zbfd: "battle-of-dazaralor",
					zCOS: "crucible-of-storms",
					zNWC: "nyalotha-the-waking-city",
					zAEP: "the-eternal-palace",
				};

				if (raidRankings.length < top5Length) top5Length = raidRankings.length;
				for (let i = 0; i < top5Length; i++) {
					const { encountersDefeated, guild, rank, regionRank } = raidRankings[i];
					if (i == 0) {
						const bossNames = encountersDefeated.map((encounter) => encounter.slug);
						raidBossesNames.battleForAzeroth = { ...raidBossesNames.battleForAzeroth, [tiers[id]]: bossNames };
						raidBossesNamesList = [...raidBossesNamesList, bossNames];
					}
					const rankingData = {
						encountersDefeated: encountersDefeated.length,
						name: guild.name,
						realm: guild.realm.name,
						id: guild.id,
						region: guild.region.slug,
						rank,
						regionRank,
					};
					top5RaidRankings = [...top5RaidRankings, rankingData];
				}
				return {
					slug: tiers[id],
					raidNumber: tierNumber - 1,
					rankings: top5RaidRankings,
				};
			});
			const tiers2 = {
				Uldir: "uldir",
				BFD: "battle-of-dazaralor",
				CoS: "crucible-of-storms",
				NWC: "nyalotha-the-waking-city",
				AEP: "the-eternal-palace",
			};
			const tiers3 = ["AEP", "Uldir", "CoS", "BFD", "NWC"];
			const tiers4 = [3, 0, 2, 1, 4];
			const tierslength = [];
			const newUnityData = unityData.map((tier, i) => {
				const tierData = tier[tiers3[i]];
				const bossesDefeatedKeys = Object.keys(tierData)
					.filter((key) => key != "tier")
					.map((key) => {
						return tierData[key];
					});
				let bossNamesOrder = {};
				bossesDefeatedKeys.forEach((boss, index) => {
					bossNamesOrder = {
						...bossNamesOrder,
						[raidBossesNamesList[i][index]]: [true, ...boss],
					};
				});

				return {
					slug: tiers2[tierData.tier],
					tierNumber: tiers4[i],
					bossesDefeatedData: bossNamesOrder,
				};
			});
			newUnityData.sort((a, b) => a.tierNumber - b.tierNumber);
			const mergedData = {
				raidBossesNames,
				currentTier: {
					expansion: "battleForAzeroth",
					slug: "nyalotha-the-waking-city",
					tierNumber: 4,
					bossCount: 12,
				},
				unityData: {
					battleForAzeroth: newUnityData,
					shadowlands: [],
				},
				guildsRanking: {
					battleForAzeroth: feedData,
					shadowlands: [],
				},
			};
			console.log(mergedData);
			console.log(raidBossesNamesList);
			progressRef.update(mergedData);
		}

		return <button onClick={addToNewDirection}>Add</button>;
	}

	return (
		<div className="mainContent">
			{addRosterToNewDirection()}
			<div className="home">
				<Progress progressData={progressData} unityData={unityData} />
				<YouTube />
				<Top5 progressData={progressData} className="top5" />
				<div className="slider">
					<NewsSlider />
				</div>
			</div>
		</div>
	);
}
export default Home;
// import React, { useEffect, useState } from "react";
// import Progress from "../components/Progress";
// import YouTube from "../components/YouTube";
// import Top5 from "../components/top5";
// import NewsSlider from "../components/Slider";
// import { rankRef, progressRef } from "../firebase/references";

// function Home() {
// 	const [progressData, setProgressData] = useState([]);
// 	const [unityData, setUnityData] = useState([]);

// 	useEffect(() => {
// 		const unsusbscribeMethod = rankRef.onSnapshot((docs) => {
// 			let referenceData = [];
// 			docs.forEach((doc) => {
// 				const data = doc.data();
// 				const id = doc.id;
// 				referenceData = [...referenceData, { data, id }];
// 			});
// 			const progressDataFiltered = referenceData.filter(({ id }) => id !== "unity");

// 			const guildData = referenceData.filter(({ id }) => id === "unity");
// 			const mappedData = Object.entries(guildData[0]?.data).map((arr) => {
// 				return { [arr[1].tier]: arr[1] };
// 			});
// 			setUnityData(mappedData);
// 			setProgressData(progressDataFiltered);
// 		});

// 		return unsusbscribeMethod;
// 	}, []);

// 	function addRosterToNewDirection() {
// 		function addToNewDirection() {
// 			const raidBossesNames = {
// 				shadowlands: {},
// 				battleForAzeroth: {},
// 			};
// 			let raidBossesNamesList = [];
// 			let fechaKills = {
// 				battleForAzeroth: {},
// 			};
// 			const feedData = progressData.reverse().map(({ data, id }) => {
// 				let top5Length = 5;
// 				const { raidRankings, tierNumber } = data;
// 				let top5RaidRankings = [];
// 				const tiers = {
// 					spanish: "uldir",
// 					zbfd: "battle-of-dazaralor",
// 					zCOS: "crucible-of-storms",
// 					zNWC: "nyalotha-the-waking-city",
// 					zAEP: "the-eternal-palace",
// 				};

// 				if (raidRankings.length < top5Length) top5Length = raidRankings.length;
// 				for (let i = 0; i < top5Length; i++) {
// 					const { encountersDefeated, guild, rank, regionRank } = raidRankings[i];
// 					if (i == 0) {
// 						const bossNames = encountersDefeated.map((encounter) => encounter.slug);
// 						const kills = encountersDefeated.map((encounter) => encounter.firstDefeated);
// 						raidBossesNames.battleForAzeroth = { ...raidBossesNames.battleForAzeroth, [tiers[id]]: bossNames };
// 						bossNames.forEach((boss, index) => {
// 							fechaKills.battleForAzeroth = {
// 								...fechaKills.battleForAzeroth,
// 								[tiers[id]]: {
// 									...fechaKills.battleForAzeroth[tiers[id]],
// 									[boss]: kills[index],
// 								},
// 							};
// 						});
// 						raidBossesNamesList = [...raidBossesNamesList, bossNames];
// 					}
// 					const rankingData = {
// 						encountersDefeated: encountersDefeated.length,
// 						name: guild.name,
// 						realm: guild.realm.name,
// 						id: guild.id,
// 						region: guild.region.slug,
// 						rank,
// 						regionRank,
// 					};
// 					top5RaidRankings = [...top5RaidRankings, rankingData];
// 				}
// 				return {
// 					slug: tiers[id],
// 					raidNumber: tierNumber - 1,
// 					rankings: top5RaidRankings,
// 				};
// 			});
// 			const tiers2 = {
// 				Uldir: "uldir",
// 				BFD: "battle-of-dazaralor",
// 				CoS: "crucible-of-storms",
// 				NWC: "nyalotha-the-waking-city",
// 				AEP: "the-eternal-palace",
// 			};
// 			let newListOrdered = [
// 				raidBossesNamesList[4],
// 				raidBossesNamesList[0],
// 				raidBossesNamesList[2],
// 				raidBossesNamesList[3],
// 				raidBossesNamesList[1],
// 			];
// 			console.log(raidBossesNamesList);

// 			const tiers3 = ["AEP", "Uldir", "CoS", "BFD", "NWC"];
// 			const tiers4 = [3, 0, 2, 1, 4];
// 			const newUnityData = unityData.map((tier, i) => {
// 				const tierData = tier[tiers3[i]];
// 				const bossesDefeatedKeys = Object.keys(tierData)
// 					.filter((key) => key != "tier")
// 					.map((key) => {
// 						return tierData[key];
// 					});
// 				let bossNamesOrder = {};

// 				bossesDefeatedKeys.forEach((boss, index) => {
// 					bossNamesOrder = {
// 						...bossNamesOrder,
// 						[newListOrdered[tiers4[i]][index]]: [true, ...boss],
// 					};
// 				});

// 				return {
// 					slug: tiers2[tierData.tier],
// 					tierNumber: tiers4[i],
// 					bossesDefeatedData: bossNamesOrder,
// 				};
// 			});
// 			newUnityData.sort((a, b) => a.tierNumber - b.tierNumber);
// 			const mergedData = {
// 				raidBossesNames,
// 				currentTier: {
// 					expansion: "battleForAzeroth",
// 					slug: "nyalotha-the-waking-city",
// 					tierNumber: 4,
// 					bossCount: 12,
// 				},
// 				unityData: {
// 					battleForAzeroth: newUnityData,
// 					shadowlands: [],
// 				},
// 				guildsRanking: {
// 					battleForAzeroth: feedData,
// 					shadowlands: [],
// 				},
// 			};
// 			// console.log(mergedData);
// 			// console.log(raidBossesNamesList);
// 			const fechasForAzeroth = fechaKills.battleForAzeroth;
// 			const checkifWorks = mergedData.unityData.battleForAzeroth.map((tier, index) => {
// 				let newBossesDefeated = {};
// 				const kills = fechasForAzeroth[tier.slug];

// 				Object.keys(tier.bossesDefeatedData).forEach((key) => {
// 					newBossesDefeated = {
// 						...newBossesDefeated,
// 						[key]: [kills[key], ...tier.bossesDefeatedData[key]],
// 					};
// 				});
// 				return newBossesDefeated;
// 			});
// 			mergedData.unityData.battleForAzeroth = checkifWorks;
// 			console.log(mergedData);
// 			progressRef.update(mergedData);
// 		}

// 		return <button onClick={addToNewDirection}>Add</button>;
// 	}

// 	return (
// 		<div className="mainContent">
// 			{addRosterToNewDirection()}
// 			<div className="home">
// 				{/* <Progress progressData={progressData} unityData={unityData} /> */}
// 				<YouTube />
// 				{/* <Top5 progressData={progressData} className="top5" /> */}
// 				<div className="slider">
// 					<NewsSlider />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
// export default Home;
