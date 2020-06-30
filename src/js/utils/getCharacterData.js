async function checkAccessToken(apiData) {
	const { client_id, client_secret } = apiData;

	const access_token = localStorage.getItem("access_token");
	const expiration_date = localStorage.getItem("access_token_expiration_string");

	const now = new Date();
	const expiration = new Date(JSON.parse(expiration_date)) || now;
	if (now < expiration && !!access_token) return access_token;

	const payload = {
		method: "POST",
		body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	const url = "https://us.battle.net/oauth/token";
	const response = await fetch(url, payload);
	const responseJSON = await response.json();
	now.setSeconds(responseJSON.expires_in);

	console.log("Se actualizara Access Token");
	localStorage.setItem("access_token_expiration_string", JSON.stringify(now));
	localStorage.setItem("access_token", responseJSON.access_token);

	return responseJSON.access_token;
}

export default async function getCharacterData(args) {
	const { apiData, formData, rosterData, core, rosterRef, changeIsLoading, resetFormData } = args;
	changeIsLoading(true);
	const access_token = await checkAccessToken(apiData);
	const { characterRealm, characterName } = formData;
	const newAPIBlizzUrl = `https://us.api.blizzard.com/profile/wow/character/${characterRealm.toLowerCase()}/${characterName.toLowerCase()}`;
	const ioUrl = `https://raider.io/api/v1/characters/profile?region=us&realm=${characterRealm.toLowerCase()}&name=${characterName}&fields=gear%2Cmythic_plus_weekly_highest_level_runs%2Cmythic_plus_scores%2Cmythic_plus_best_runs%2Cmythic_plus_ranks`;
	const blizzEquipmentDataUrl = `${newAPIBlizzUrl}/equipment?namespace=profile-us&locale=en_US&access_token=${access_token}`;
	const blizCharacterDataUrl = `${newAPIBlizzUrl}?namespace=profile-us&locale=en_US&access_token=${access_token}`;

	const blizzData = await fetch(blizCharacterDataUrl);
	const ioData = await fetch(ioUrl);

	if (blizzData.status !== 200) {
		console.error(blizzData.status);
		alert(`Error Blizzard ${blizzData.status}`);
		changeIsLoading(false);

		return;
	}
	if (ioData.status !== 200) {
		alert(`Error Raider IO ${ioData.status}`);
		changeIsLoading(false);

		return;
	}
	const blizzDataJSON = await blizzData.json();
	const ioDataJSON = await ioData.json();
	const characterIconData = await fetch(`${blizzDataJSON.media.href}&access_token=${access_token}`);
	const characterIconDataJSON = await characterIconData.json();
	const characterIcon = characterIconDataJSON.avatar_url;

	const feed = {
		lastUpdate: Date.now(),
		lastModified: blizzDataJSON.last_login_timestamp,
		class: blizzDataJSON.character_class.id,
		name: blizzDataJSON.name,
		realm: blizzDataJSON.realm.name,
		avatar: characterIcon,
		level: blizzDataJSON.level,
		ilevel: blizzDataJSON.equipped_item_level,
		mscore: ioDataJSON.mythic_plus_scores.all || 0,
		mythicweekly: ioDataJSON.mythic_plus_weekly_highest_level_runs[0]?.mythic_level || "",
		mythicweeklylvl: ioDataJSON.mythic_plus_weekly_highest_level_runs[0]?.short_name || "",
		url: ioDataJSON.profile_url,
	};

	const strippedArray = rosterData[`core${core}`].filter((member) => member.name != formData.memberName);
	const specificDataForMember = rosterData[`core${core}`].filter((member) => member.name == formData.memberName);
	const characters = specificDataForMember[0]?.characters || [];
	const updatedCharacterList = [...characters, feed];

	const appendedData = {
		...rosterData,
		[`core${core}`]: [...strippedArray, { ...specificDataForMember[0], characters: [...updatedCharacterList] }],
	};

	await rosterRef.update(appendedData);
	resetFormData();
	changeIsLoading(false);
}
