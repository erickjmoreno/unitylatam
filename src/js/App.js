import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import AboutUS from "./pages/AboutUS";
import Officers from "./pages/Officers";
import Roster from "./pages/Roster";
import AdminPage from "./pages/AdminPage";

function App() {
	return (
		<div>
			<Header />
			<div className="content">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/Apply">
						<Apply />
					</Route>
					<Route path="/AboutUS">
						<AboutUS />
					</Route>
					<Route path="/Officers">
						<Officers />
					</Route>
					<Route path="/Roster">
						<Roster />
					</Route>
					{/* <Route path="/Admin">
						<AdminPage />
					</Route> */}
				</Switch>
				<Footer />
			</div>
		</div>
	);
}

export default App;
