import React from "react";

export default function AddMemberForm(props) {
	const { handleForm, handleChange, editOptions, handleChangeForEdit, formData, countries, rosterData } = props.data;
	return (
		<form className="rosterAddForm" onSubmit={(event) => handleForm(event, rosterData, formData)}>
			<label>
				Core*:
				<select name="core" onChange={handleChange} value={formData.core}>
					<option value={1}>1</option>
					<option value={2}>2</option>
				</select>
			</label>
			<label>
				Edit:
				<select name="edit" onChange={(event) => handleChangeForEdit(event, rosterData)} value={formData.edit}>
					{rosterData[`core${formData.core}`].length > 0 && editOptions()}
				</select>
			</label>
			<label>
				Name*: <input name="name" onChange={handleChange} value={formData.name} type="text" />
			</label>
			<label>
				Country*:
				<select name="country" onChange={handleChange} value={formData.country}>
					{Object.keys(countries).map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
			</label>
			<label>
				Avatar: <input name="avatar" onChange={handleChange} value={formData.avatar} type="text" />
			</label>
			<label>
				Youtube: <input name="youtube" onChange={handleChange} value={formData.youtube} type="text" />
			</label>
			<label>
				Twitch: <input name="twitch" onChange={handleChange} value={formData.twitch} type="text" />
			</label>
			<label>
				Rank: <input name="rank" onChange={handleChange} value={formData.rank} type="text" />
			</label>
			<label>
				Order: <input name="rankOrder" onChange={handleChange} value={formData.rankOrder} type="number" />
			</label>
			<button>Guardar</button>
		</form>
	);
}
