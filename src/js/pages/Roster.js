import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import RosterBox from "../components/Roster/RosterBox";
import { rosterRef } from "../firebase/references";
import RosterCoreSwitcher from "../components/Roster/RosterCoreSwitcher";
import RosterDisplayBySpecificClassButtons from "../components/Roster/RosterDisplayBySpecificClassButtons";
import FormNewPersonRoster from "../components/Roster/FormNewPersonRoster";
import sortByName from "../utils/sortByName";
import addClassListToPerson from "../utils/addClassListToPerson";

function Roster() {
	const [core, setCore] = useState(0);
	const [rosterData, setRosterData] = useState({ core1: [], core2: [] });
	const [rosterDataFiltered, setRosterDataFiltered] = useState({ core1: [], core2: [] });
	const [displaySpecific, setDisplaySpecific] = useState(0);
	const { isLoggedIn } = useContext(AuthContext);

	function changeCore(core) {
		setCore(core);
		setDisplaySpecific(0);
	}

	function changeSpecific(classNumber) {
		setDisplaySpecific(classNumber);
	}

	useEffect(() => {
		const rosterRefUnmount = rosterRef.onSnapshot((doc) => {
			const docData = doc.data();
			const data = {
				...rosterData,
				...docData,
			};
			const core1Array = addClassListToPerson(data.core1);
			const core2Array = addClassListToPerson(data.core2);
			setRosterData({ core1: core1Array, core2: core2Array });
			setRosterDataFiltered({ core1: core1Array, core2: core2Array });
		});
		return rosterRefUnmount;
	}, []);

	useEffect(() => {
		if (!core) return;
		if (!displaySpecific) {
			setRosterDataFiltered(rosterData);
			return;
		}
		const dataFiltered = rosterData[`core${core}`].filter((person) => person.classList.includes(displaySpecific));
		const rosterDataFiltered = { ...rosterData, [`core${core}`]: dataFiltered };
		setRosterDataFiltered(rosterDataFiltered);
	}, [displaySpecific]);

	return (
		<>
			{isLoggedIn && (
				<div className="mainContent officerRosterSection">
					<FormNewPersonRoster data={{ setRosterData, rosterRef, rosterData }} />
				</div>
			)}
			<div className="mainContent rosterPage">
				<h2>{!core > 0 && "Seleccione un Core"}</h2>
				<RosterCoreSwitcher changeCore={changeCore} activeCore={core} />
				{core > 0 && <RosterDisplayBySpecificClassButtons switch={changeSpecific} classActive={displaySpecific} />}
				<div className="rosterHolder noselect">
					{core > 0 &&
						[...rosterDataFiltered[`core${core}`]]
							.sort(sortByName)
							.map((member, index) => <RosterBox key={`${member.name}${index}`} data={member} />)}
				</div>
			</div>
		</>
	);
}

export default Roster;
