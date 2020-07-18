import React from "react";

function AddUnityDataForm(props) {
	const { handleSubmit, handleChange, raidList, formData } = props.data;
	const raidSelect = raidList[formData.expansion].map((raid) => (
		<option key={raid.slug} value={raid.slug}>
			{raid.slug}
		</option>
	));
	const { bossList } = raidList[formData.expansion].find((raid) => raid.slug === formData.raidNameUD) || {
		bossList: [],
	};
	const bossSelect = bossList.map((boss) => (
		<option key={boss} value={boss}>
			{boss}
		</option>
	));

	return (
		<form onSubmit={handleSubmit} className="raidDataForms" name="addUnityDataForm">
			<label>
				Raid
				<br />
				<select onChange={handleChange} value={formData.raidNameUD} name="raidNameUD">
					<option value="elegir">elegir</option>
					{raidSelect}
				</select>
			</label>
			<label>
				Boss
				<br />
				<select onChange={handleChange} value={formData.raidBossUD} name="raidBossUD">
					<option value="elegir">elegir</option>
					{bossSelect}
				</select>
			</label>
			<label>
				Youtube Link
				<br />
				<input type="text" onChange={handleChange} value={formData.youtubeUD} name="youtubeUD" />
			</label>
			<label>
				Tries
				<br />
				<input type="number" onChange={handleChange} value={formData.triesUD} name="triesUD" />
			</label>
			<label>
				World
				<br />
				<input type="number" onChange={handleChange} value={formData.rankLUD} name="rankLUD" />
			</label>
			<label>
				Latino
				<br />
				<input type="number" onChange={handleChange} value={formData.rankWUD} name="rankWUD" />
			</label>
			<button>Actualizar</button>
		</form>
	);
}

export default AddUnityDataForm;
