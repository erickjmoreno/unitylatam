import React from "react";
import hunterImg from "../../images/hunterGuide.png";
import castleNathriaGuide from "../../images/castleNathriaGuide.png";

const imgStyle = { display: "block", height: "140px", margin: "auto", borderRadius: "10px" };
function Guides() {
	return (
		<div className="mainContent guidesUS">
			<h2 style={{ textAlign: "center" }}>Guias</h2>
			<div style={{ display: "flex", justifyContent: "center", gap: "0 1em" }}>
				<div>
					<a
						style={{ fontSize: "1.2em" }}
						href={"https://rayisbacktv.blogspot.com/2020/11/guia-hunter-mm-shadowlands-90.html"}
						target="blank"
					>
						<img src={hunterImg} style={imgStyle} />
						<p style={{ textAlign: "center", margin: "1em" }}>Guía de Cazador. Autor Ray Unity-Ragnaros</p>
					</a>
				</div>{" "}
				<div>
					<a
						style={{ fontSize: "1.2em" }}
						href={"https://docs.google.com/document/d/1SbfOlsAnYWtIWeAAXdCyJN_57f7pD7-QayGJYoHTL54/edit"}
						target="blank"
					>
						<img src={castleNathriaGuide} style={imgStyle} />
						<p style={{ textAlign: "center", margin: "1em" }}>Guía de Castle Nathria. Autor Abu Unity-Ragnaros</p>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Guides;
