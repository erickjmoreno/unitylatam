import React from "react";
function LogOut(props) {
	return (
		<div className="logOut">
			<span>{props?.email}</span>
			<br />
			<button
				onClick={() => {
					props?.logOut();
				}}
			>
				Desconectar
			</button>
		</div>
	);
}
export default LogOut;
