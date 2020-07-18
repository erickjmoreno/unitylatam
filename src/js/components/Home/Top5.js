import React from "react";

function Top5(props) {
	const { currentTier } = props.progressData;
	const { bossCount, expansion, slug, tierNumber } = props.progressData.currentTier;
	const expansionData = props.progressData.guildsRanking[expansion] || [];

	const guildsRanking = expansionData.find((tiers) => tiers.slug === slug);
	if (guildsRanking.rankings.length === 0)
		return (
			<h3 className="top5Waiting">
				En espera del primer kill de <span style={{ color: "orange" }}>{slug.replace(new RegExp("-", "g"), " ")}</span>{" "}
				Mythic de la región
			</h3>
		);
	function guildBox(guild) {
		const { encountersDefeated, name, rank, realm, regionRank, region, id } = guild;
		return (
			<div className="rankBox" key={id}>
				<a href={`https://raider.io/guilds/${region}/${realm}/${name}`} className="rankLink" target="_blank">
					<div className={`r${rank}`}> {rank} </div>
					<div className="gName">{name}</div>
					<div className="gServer">{realm}</div>
					<div className="gRegion">
						{region.toUpperCase()} {regionRank}
					</div>
					<div className="gProgress">
						{encountersDefeated}/{bossCount}
					</div>
				</a>
			</div>
		);
	}
	return (
		<div>
			<h3 style={{ textAlign: "center" }}>Top 5 Latinoamerica</h3>
			<div className="top5">{guildsRanking.rankings.map((guild, i) => guildBox(guild))}</div>
		</div>
	);
}

export default Top5;
