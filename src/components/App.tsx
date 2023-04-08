import "../css/App.css";
import "../css/Buttons.css";
import { useState, useEffect } from "react";
import { ToggleSlider } from "react-toggle-slider";
import Exposure from "./Exposure";
import useRealtiveApetureDict from "../hooks/useRealtiveApetureDict";

function App() {
	const relativeApetureDict = useRealtiveApetureDict();

	const [exposure_1, setExposure_1] = useState(0);
	const [exposure_2, setExposure_2] = useState(0);

	const [shutterSpeed_1, setShutterSpeed_1] = useState(0);
	const [shutterSpeed_2, setShutterSpeed_2] = useState(0);

	const [apeture_1, setApeture_1] = useState(1.4);
	const [apeture_2, setApeture_2] = useState(1.4);

	const [ISO_1, setISO_1] = useState(0);
	const [ISO_2, setISO_2] = useState(0);

	const [accountExposures, setAccountExposures] = useState(false);
	const [numberOfExposures_1, setNumberOfExposures_1] = useState(1);
	const [numberOfExposures_2, setNumberOfExposures_2] = useState(1);

	useEffect((): void => {
		const temp_exposure_1 =
			(shutterSpeed_1 / relativeApetureDict[apeture_1]) *
			ISO_1 *
			numberOfExposures_1;
		const temp_exposure_2 =
			(shutterSpeed_2 / relativeApetureDict[apeture_2]) *
			ISO_2 *
			numberOfExposures_2;

		setExposure_1(temp_exposure_1);
		setExposure_2(temp_exposure_2);
	}, [
		shutterSpeed_1,
		shutterSpeed_2,
		apeture_1,
		apeture_2,
		ISO_1,
		ISO_2,
		numberOfExposures_1,
		numberOfExposures_2,
		relativeApetureDict,
	]);

	const matchExposures = () => {
		setNumberOfExposures_2(
			(exposure_1 / shutterSpeed_2 / ISO_2) *
				relativeApetureDict[apeture_2]
		);
		console.log("matched");
	};

	return (
		<div className="App">
			<div className="body-container">
				<form id="exposures-container">
					<div className="toggle-container">
						<ToggleSlider
							draggable={false}
							barHeight={39}
							barWidth={72}
							barBackgroundColor="grey"
							barBackgroundColorActive="#0076BE"
							onToggle={(state) => setAccountExposures(state)}
						/>
						<div className="toggle-label">Multiple Exposures</div>
					</div>
					<Exposure
						relativeApetureDict={relativeApetureDict}
						numberOfExposures={numberOfExposures_1}
						accountExposures={accountExposures}
						shutterSpeed={shutterSpeed_1}
						ISO={ISO_1}
						setNumberOfExposures={setNumberOfExposures_1}
						setShutterSpeed={setShutterSpeed_1}
						setApeture={setApeture_1}
						setISO={setISO_1}
					/>
					<br />
					<Exposure
						relativeApetureDict={relativeApetureDict}
						numberOfExposures={numberOfExposures_2}
						accountExposures={accountExposures}
						shutterSpeed={shutterSpeed_2}
						ISO={ISO_2}
						setNumberOfExposures={setNumberOfExposures_2}
						setShutterSpeed={setShutterSpeed_2}
						setApeture={setApeture_2}
						setISO={setISO_2}
					/>
				</form>
				<br />
				<br />
				{accountExposures && (
					<button
						onClick={matchExposures}
						className="match-exposures-button"
					>
						Match Exposures
					</button>
				)}
				<br />
				<br />
				<div id="exp-1">
					Exposure 1: {exposure_1} second iso per f-stop
				</div>
				<div id="exp-2">
					Exposure 2: {exposure_2} second iso per f-stop
				</div>
				<div id="compare">
					{exposure_1 === exposure_2 ? (
						<>Exposure 1 and exposure 2 are equal</>
					) : exposure_1 >= exposure_2 ? (
						<>
							Exposure 1 is {Math.log2(exposure_1 / exposure_2)}{" "}
							{exposure_1 === exposure_2 * 2 ? (
								<>stop</>
							) : (
								<>stops</>
							)}{" "}
							brighter than exposure 2
						</>
					) : (
						<>
							Exposure 2 is {Math.log2(exposure_2 / exposure_1)}{" "}
							{exposure_2 === exposure_1 * 2 ? (
								<>stop</>
							) : (
								<>stops</>
							)}{" "}
							brighter than exposure 1
						</>
					)}
				</div>
			</div>
			<br />
			<br />
		</div>
	);
}

export default App;
