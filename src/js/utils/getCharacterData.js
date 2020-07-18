import { webVersionRef } from "../firebase/references";

async function checkAccessToken() {
	const access_token = localStorage.getItem("access_token");
	const expiration_date = localStorage.getItem("access_token_expiration_string");

	const now = new Date();
	const expiration = new Date(JSON.parse(expiration_date)) || now;
	if (now < expiration && !!access_token) return access_token;

	const { client_id, client_secret } = (await webVersionRef.get()).data();

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

async function fetchDataFromBlizzAPI(characterRealm, characterName) {
	const access_token = await checkAccessToken();
	const blizzUrl = `https://us.api.blizzard.com/profile/wow/character/${characterRealm.toLowerCase()}/${characterName.toLowerCase()}`;
	// const blizzEquipmentDataUrl = `${blizzUrl}/equipment?namespace=profile-us&locale=en_US&access_token=${access_token}`;
	const blizCharacterDataUrl = `${blizzUrl}?namespace=profile-us&locale=en_US&access_token=${access_token}`;
	const blizzData = await fetch(blizCharacterDataUrl);
	return blizzData;
}

async function fetchDataFromIOApi(characterRealm, characterName) {
	const ioUrl = `https://raider.io/api/v1/characters/profile?region=us&realm=${characterRealm.toLowerCase()}&name=${characterName}&fields=gear%2Cmythic_plus_weekly_highest_level_runs%2Cmythic_plus_scores%2Cmythic_plus_best_runs%2Cmythic_plus_ranks`;
	const ioData = await fetch(ioUrl);
	return ioData;
}

function checkEndPointResponseIs200({ status }, characterName) {
	console.log(status, characterName);
	return status == 200;
}

async function getIconFromUrl(url) {
	const access_token = await checkAccessToken();
	const access_token_string = `&access_token=${access_token}`;
	const characterIconData = await fetch(url + access_token_string);
	const characterIconDataJSON = await characterIconData.json();
	return characterIconDataJSON.avatar_url;
}

export default async function getCharacterData(args) {
	const { characterRealm, characterName } = args;

	const blizzData = await fetchDataFromBlizzAPI(characterRealm, characterName);
	const ioData = await fetchDataFromIOApi(characterRealm, characterName);

	if (!checkEndPointResponseIs200(blizzData, characterName) || !checkEndPointResponseIs200(ioData, characterName)) {
		return;
	}

	const blizzDataJSON = await blizzData.json();
	const ioDataJSON = await ioData.json();
	const icon = await getIconFromUrl(blizzDataJSON.media.href);

	const feed = {
		lastUpdate: Date.now(),
		lastModified: blizzDataJSON.last_login_timestamp,
		class: blizzDataJSON.character_class.id,
		name: blizzDataJSON.name,
		realm: blizzDataJSON.realm.name,
		avatar: icon,
		level: blizzDataJSON.level,
		ilevel: blizzDataJSON.equipped_item_level,
		mscore: ioDataJSON.mythic_plus_scores.all || 0,
		mythicweekly: ioDataJSON.mythic_plus_weekly_highest_level_runs[0]?.mythic_level || "",
		mythicweeklylvl: ioDataJSON.mythic_plus_weekly_highest_level_runs[0]?.short_name || "",
		url: ioDataJSON.profile_url,
	};

	return feed;
}
