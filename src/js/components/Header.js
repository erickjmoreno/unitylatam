import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import LogoShort from "../../images/logoshort.png";

function Header() {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<header className="header">
			<div className="topBarHeader">
				<Link to="/">
					<img alt="unityLogo" src={LogoShort} />
				</Link>
			</div>
			<div className="bottomBarHeader">
				<nav>
					<Link to="/AboutUS">
						<h2>Nosotros</h2>
					</Link>
					<Link to="/Apply">
						<h2>Aplicar</h2>
					</Link>
					<Link to="/Roster">
						<h2>Roster</h2>
					</Link>
					{isLoggedIn && (
						<>
							<Link to="/Officers">
								<h2>Officers</h2>
							</Link>
							{/* <Link to="/Admin">
								<h2>Admin</h2>
							</Link> */}
						</>
					)}
				</nav>
			</div>
		</header>
	);
}

export default Header;
