import React, { useState } from "react";
import SubmitNewRaid from "./AddTierForm";
import AddRaidBosses from "./AddRaidBosses";
import ChangeCurrentTierForm from "./ChangeCurrentTierForm";
import AddUnityDataForm from "./AddUnityDataForm";
import Headerh3 from "../../elements/Headerh3";

import {
	updateUnityData,
	updateCurrentTier,
	submitNewBoss,
	submitNewRaid,
	updateTOP5IOHandler,
	updateUnityIOHandler,
} from "../../utils/progressUpdateFirestore";

function HomeAddInfo(props) {
	const { progressData, progressRef, setProgressData } = props;

	const [formData, setFormData] = useState({
		expansion: progressData.currentTier.expansion,
		raidName: progressData.currentTier.slug,
		currentTierSlug: progressData.currentTier.slug,
		raidNumber: 0,
		raidNameNew: "",
		bossName: "",
		bossNumber: 0,
		raidNameUD: "",
		raidBossUD: "",
		youtubeUD: "",
		triesUD: 0,
		rankWUD: 0,
		rankLUD: 0,
	});

	const raidList = progressData.raidBossesNames;
	const expansionList = Object.keys(raidList);

	function handleChange(e) {
		const { value, name } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const payload = { progressData, formData, raidList };
		switch (e.target.name) {
			case "submitNewRaid":
				submitNewRaid(payload);
				break;
			case "addRaidBossesForm":
				submitNewBoss(payload);
				break;
			case "updateCurrentTier":
				updateCurrentTier(payload);
				break;
			case "addUnityDataForm":
				updateUnityData(payload);
				break;
			default:
				break;
		}
	}

	const expansionListComponent = expansionList.map((expansion) => (
		<option key={expansion} value={expansion}>
			{expansion}
		</option>
	));

	return (
		<div className="progressForm" style={{ marginBottom: 0 }}>
			<label className="raidDataForms">
				Expansión
				<br />
				<select onChange={handleChange} name="expansion" value={formData.expansion}>
					{expansionListComponent}
				</select>
			</label>
			<div>
				<Headerh3> Cambiar raid activa </Headerh3>
				<ChangeCurrentTierForm data={{ formData, handleChange, handleSubmit, raidList, expansionList }} />
			</div>
			<div>
				<Headerh3>Agregar una raid</Headerh3>
				<SubmitNewRaid data={{ formData, handleChange, handleSubmit, expansionList }} />
			</div>
			<div>
				<Headerh3>Agregar un boss</Headerh3>
				<AddRaidBosses data={{ formData, handleChange, handleSubmit, raidList, expansionList }} />
			</div>
			<div>
				<Headerh3>Informacion de unity</Headerh3>
				<AddUnityDataForm data={{ formData, handleChange, handleSubmit, raidList, expansionList }} />
			</div>
			<div>
				<Headerh3>Actualizar raiderIO</Headerh3>
				<button onClick={() => updateTOP5IOHandler({ progressData })}>Actualizar Top5</button>
				<button onClick={() => updateUnityIOHandler({ progressData })}>
					Sincronizar {progressData.currentTier.slug}
				</button>
			</div>
		</div>
	);
}
export default HomeAddInfo;
