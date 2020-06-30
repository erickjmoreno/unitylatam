import React, { useState } from "react";
function AddRaidBosses(props) {
	const { handleChange, handleSubmit, formData, raidList } = props.data;
	return (
		<form className="raidDataForms" name="addRaidBossesForm" onSubmit={handleSubmit}>
			<label>
				Raid <br />
				<select onChange={handleChange} value={formData.raidName} name="raidName">
					<option value="">elegir</option>
					{raidList[formData.expansion].map((raid) => (
						<option key={raid.slug} value={raid.slug}>
							{raid.slug}
						</option>
					))}
				</select>
			</label>
			<label>
				# Boss <br />
				<input type="number" name="bossNumber" onChange={handleChange} value={formData.bossNumber} />
			</label>
			<label>
				Slug Nombre del Boss <br />
				<input type="text" name="bossName" onChange={handleChange} value={formData.bossName} />
			</label>
			<br />
			<button>Agregar</button>
		</form>
	);
}
export default AddRaidBosses;
