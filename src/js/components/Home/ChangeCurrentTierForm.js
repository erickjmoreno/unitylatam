import React from "react";
function ChangeCurrentTierForm(props) {
	const { formData, handleChange, handleSubmit, raidList, expansionList } = props.data;

	const currentBossList = raidList[formData.expansion].find((tier) => tier.slug === formData.currentTierSlug) || [];
	return (
		<form className="raidDataForms" name="updateCurrentTier" onSubmit={handleSubmit}>
			<label>
				bosses
				<br />
				<span className="inputLike"> {currentBossList.bossList?.length || 0} </span>
			</label>
			<label>
				Expansion
				<br />
				<span className="inputLike"> {formData.expansion} </span>
			</label>
			<br />
			<label>
				Raid
				<br />
				<select name="currentTierSlug" value={formData.currentTierSlug} onChange={handleChange}>
					<option value="">elegir</option>
					{raidList[formData.expansion].map((tier) => (
						<option key={`current${tier.slug}`} value={tier.slug}>
							{tier.slug}
						</option>
					))}
				</select>
			</label>
			<br />
			<button>Actualizar</button>
		</form>
	);
}
export default ChangeCurrentTierForm;
