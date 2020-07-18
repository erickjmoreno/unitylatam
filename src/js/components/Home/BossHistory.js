import React from "react";
import BossBox from "./BossBox";

function BossHistory(props) {
	const { tier, tierSlug } = props.data;
	const tierSorted = tier.raid;

	const generalAddress = "https://cdnassets.raider.io/images/";

	const killedBosses = tierSorted.map(({ slug, data }, i) => {
		const date = data[0];
		const rank = {
			link: data[2],
			tries: data[3],
			world: data[4],
			latino: data[5],
		};

		const name = slug.replace(new RegExp("-", "g"), " ");
		return <BossBox key={`${slug}`} data={{ rank, name, slug, date, tierSlug, generalAddress }} />;
	});

	return killedBosses;
}

export default BossHistory;
