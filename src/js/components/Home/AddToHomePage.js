import React, { useState } from "react";
import { homePageRef } from "../../firebase/references";
import Headerh3 from "../../elements/Headerh3";

function AddToHomePage(props) {
	const { data: homePage } = props;
	const [formData, setFormData] = useState({
		youtubeChannel: "",
		youtubeImg: "",
		youtubeTag: "",
		carouselImg: "",
		carouselTag: "",
	});

	function handleChange(e) {
		const { value, name } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		switch (e.target.name) {
			case "youtubeForm":
				updateYoutube();
				break;
			case "carouselForm":
				updateCarousel();
				break;
			default:
				break;
		}
	}

	async function updateYoutube() {
		const youtube = [
			...homePage.youtube,
			{ channel: formData.youtubeChannel, imgUrl: formData.youtubeImg, tag: formData.youtubeTag },
		];

		await homePageRef.update({ youtube });
		alert("Se agrego con exito");
	}
	async function updateCarousel() {
		const carousel = [...homePage.carousel, { imgUrl: formData.carouselImg, tag: formData.carouselTag }];

		await homePageRef.update({ carousel });
		alert("Se agrego con exito");
	}

	return (
		<div className="progressForm">
			<div>
				<Headerh3>Agregar canal de youtube</Headerh3>
				<form name="youtubeForm" className="raidDataForms" onSubmit={handleSubmit}>
					<label>
						Canal de Youtube
						<br />
						<input name="youtubeChannel" value={formData.youtubeChannel} onChange={handleChange} />
					</label>
					<label>
						Imagen
						<br />
						<input name="youtubeImg" value={formData.youtubeImg} onChange={handleChange} />
					</label>
					<label>
						Tag
						<br />
						<input name="youtubeTag" value={formData.youtubeTag} onChange={handleChange} />
					</label>
					<button>Agregar</button>
				</form>
			</div>
			<div>
				<Headerh3>Agregar imagen al carousel</Headerh3>
				<form name="carouselForm" className="raidDataForms" onSubmit={handleSubmit}>
					<label>
						Url Imagen
						<br />
						<input name="carouselImg" value={formData.carouselImg} onChange={handleChange} />
					</label>
					<label>
						Tag
						<br />
						<input name="carouselTag" value={formData.carouselTag} onChange={handleChange} />
					</label>
					<button>Agregar</button>
				</form>
			</div>
		</div>
	);
}

export default AddToHomePage;
