import React from "react";

function AboutUS() {
	const AboutUSText = [
		`La mejor guild de LATAM en su historia, 
        se conforma por un grupo de amigos y compañeros de todos los países con un mismo objetivo, 
        generar un ambiente competitivo con los mejores jugadores de latinoamerica
        mientras se divierten. Aquí solo están los mejores.
        `,
		`Siempre estamos buscando jugadores que quieran tomar el reto y formar parte de Unity, 
        si te consideras apto para el reto, considera aplicar en la página,
        recuerda que es indispensable leer las reglas y todas las preguntas si quieres ser considerado.`,
	];

	return (
		<div className="mainContent aboutUS">
			<h2>¿Quiénes somos?</h2>
			{AboutUSText.map((text, index) => (
				<p key={`aboutUS${index}`}>{text}</p>
			))}
			<img src="https://cdn.discordapp.com/attachments/318240715815649280/727354462490067004/OSrp4rW.png" alt="img" />
		</div>
	);
}

export default AboutUS;
