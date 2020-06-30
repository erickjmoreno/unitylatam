import React, { useState, useEffect } from "react";
import { newsRef } from "../firebase/references";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";

function NewsSlider(props) {
	const { data } = props;

	function newsComponents({ newData, index }) {
		const { imgUrl } = newData;
		return (
			<Slide key={index} index={index}>
				<Image src={imgUrl} alt="sliderIMG" />
			</Slide>
		);
	}
	return (
		<div className="slider">
			<CarouselProvider
				className="slider"
				naturalSlideWidth={1}
				naturalSlideHeight={0.5}
				totalSlides={data.length}
				infinite={true}
				interval={10000}
				isPlaying={true}
				isIntrinsicHeight={false}
				dragEnabled={false}
				touchEnabled={false}
			>
				<Slider>{data.map((newData, index) => newsComponents({ newData, index }))}</Slider>
			</CarouselProvider>
		</div>
	);
}

export default NewsSlider;
