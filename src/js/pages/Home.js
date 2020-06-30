import React, { useEffect, useState, useContext } from "react";
import Progress from "../components/Progress";
import YouTube from "../components/YouTube";
import Top5 from "../components/Top5";
import Carousel from "../components/Carousel";
import UpdateButton from "../utils/updateDBNewStructure";
import AddHomeInfo from "../components/AddHomeInfo";
import AddToHomePage from "../components/AddToHomePage";
import { AuthContext } from "../AuthContext";
import { rankRef, progressRef, newsRef, homePageRef } from "../firebase/references";
import HomeSwitchByExpansion from "../components/HomeSwitchByExpansion";

function Home() {
	const { isLoggedIn } = useContext(AuthContext);
	const [isLoaded, setIsLoaded] = useState(false);
	const [progressData, setProgressData] = useState(null);
	const [homePageData, setHomePageData] = useState(null);
	const [isAdminPanelActive, setIsAdminPanelActive] = useState(false);
	const [expansion, setExpansion] = useState(null);

	useEffect(() => {
		const unsusbscribeMethod = progressRef.onSnapshot((doc) => {
			const data = doc.data();
			setProgressData(data);
			setExpansion(data.currentTier.expansion);
		});
		return unsusbscribeMethod;
	}, []);

	useEffect(() => {
		const homePageRefUnsub = homePageRef.onSnapshot((doc) => {
			setHomePageData(doc.data());
		});
		return homePageRefUnsub;
	}, []);

	useEffect(() => {
		if (progressData && homePageData) setIsLoaded(true);
	}, [progressData, homePageData]);

	function toggleAdmin() {
		setIsAdminPanelActive(!isAdminPanelActive);
	}

	return (
		<>
			{isLoggedIn && isLoaded && (
				<div className="mainContentAdmin" style={{ textAlign: "center" }}>
					<button onClick={toggleAdmin} style={{ marginTop: 0 }}>
						{isAdminPanelActive ? "Cerrar" : "Agregar contenido"}
					</button>
					{isAdminPanelActive && (
						<>
							<AddHomeInfo progressData={progressData} progressRef={progressRef} setProgressData={setProgressData} />
							<AddToHomePage data={homePageData} />
						</>
					)}
				</div>
			)}
			{isLoaded && (
				<div className="mainContent">
					<HomeSwitchByExpansion data={{ expansion, setExpansion }} />
					<div className="home">
						<>
							<Progress progressData={progressData} expansion={expansion} />
							<YouTube data={homePageData.youtube} />
							<Top5 progressData={progressData} />
							<Carousel data={homePageData.carousel} />
						</>
					</div>
				</div>
			)}
		</>
	);
}
export default Home;
