import React, { useState } from "react";
function SubmitNewRaid(props) {
	const { formData, handleChange, handleSubmit, expansionList } = props.data;
	return (
		<form className="raidDataForms" name="submitNewRaid" onSubmit={handleSubmit}>
			<label>
				# Raid
				<br />
				<input type="number" name="raidNumber" value={formData.raidNumber} onChange={handleChange} />
			</label>
			<label>
				Slug nombre del Raid
				<br />
				<input type="text" name="raidNameNew" value={formData.raidNameNew.trim()} onChange={handleChange} />
			</label>
			<br />
			<button>Agregar</button>
		</form>
	);
}
export default SubmitNewRaid;
