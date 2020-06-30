import React from "react";

export const template = {
	core: 1,
	name: "",
	country: "",
	avatar: "",
	twitch: "",
	youtube: "",
	rank: "",
	rankOrder: 0,
	classList: [],
	characters: [],
	edit: "",
};

export function removeUnusedData(data) {
	const newData = { ...data };
	delete newData.edit;
	delete newData.core;
	return newData;
}
