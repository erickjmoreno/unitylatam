import React, { useEffect, useState } from "react";
import BossHistory from "./BossHistory";
import useExpansion from "../../hooks/expansion";

function Progress({ progressData, expansion }) {
	const { currentTier, raidBossesNames, unityData } = progressData;
	const { expansion: currentExpansion } = currentTier;

	const tierList = [...unityData[expansion].tiers] || [];

	if (tierList.length === 0) {
		return <h1 style={{ margin: "auto" }}>Proximamente</h1>;
	}
	const bossesTierData = tierList.reverse().map((tier, index) => {
		const data = unityData[expansion].raids[tier];
		return (
			<div className="tiers" key={`tierHistory${index}`}>
				<BossHistory data={{ tier: data, tierSlug: tier }} />
			</div>
		);
	});

	return <div className="progress">{bossesTierData}</div>;
}

export default Progress;
