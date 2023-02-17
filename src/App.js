import "./App.css";
import { useState, useEffect } from "react";
import { ToggleSlider } from "react-toggle-slider";

function App() {
	const base = 2;
	const relative_apeture_dict = {
		"1.0": Math.pow(base, 0),
		1.1: Math.pow(base, 1 / 3),
		1.2: Math.pow(base, 2 / 3),
		1.4: Math.pow(base, 1),
		1.6: Math.pow(base, 1 + 1 / 3),
		1.8: Math.pow(base, 1 + 2 / 3),
		"2.0": Math.pow(base, 2),
		2.2: Math.pow(base, 2 + 1 / 3),
		2.5: Math.pow(base, 2 + 2 / 3),
		2.8: Math.pow(base, 3),
		3.2: Math.pow(base, 3 + 1 / 3),
		3.5: Math.pow(base, 3 + 2 / 3),
		"4.0": Math.pow(base, 4),
		4.5: Math.pow(base, 4 + 1 / 3),
		"5.0": Math.pow(base, 4 + 2 / 3),
		5.6: Math.pow(base, 5),
		6.3: Math.pow(base, 5 + 1 / 3),
		7.1: Math.pow(base, 5 + 2 / 3),
		"8.0": Math.pow(base, 6),
		"9.0": Math.pow(base, 6 + 1 / 3),
		"10.0": Math.pow(base, 6 + 2 / 3),
		"11.0": Math.pow(base, 7),
		"13.0": Math.pow(base, 7 + 1 / 3),
		"14.0": Math.pow(base, 7 + 2 / 3),
		"16.0": Math.pow(base, 8),
		"18.0": Math.pow(base, 8 + 1 / 3),
		"20.0": Math.pow(base, 8 + 2 / 3),
		"22.0": Math.pow(base, 9),
	};

	const [exposure_1, setExposure_1] = useState(0);
	const [exposure_2, setExposure_2] = useState(0);

	const [shutterSpeed_1, setshutterSpeed_1] = useState(0);
	const [shutterSpeed_2, setshutterSpeed_2] = useState(0);

	const [apeture_1, setApeture_1] = useState(1.4);
	const [apeture_2, setApeture_2] = useState(1.4);

	const [ISO_1, setISO_1] = useState(0);
	const [ISO_2, setISO_2] = useState(0);

	const [accountExposures, setAccountExposures] = useState(false);
	const [numberOfExposures_1, setNumberOfExposures_1] = useState(1);
	const [numberOfExposures_2, setNumberOfExposures_2] = useState(1);

	useEffect(() => {
		let temp_exposure_1 =
			(shutterSpeed_1 / relative_apeture_dict[apeture_1]) * ISO_1 * numberOfExposures_1;
		let temp_exposure_2 =
			(shutterSpeed_2 / relative_apeture_dict[apeture_2]) * ISO_2 * numberOfExposures_2;

		setExposure_1(temp_exposure_1);
		setExposure_2(temp_exposure_2);

		return;
	}, [shutterSpeed_1, shutterSpeed_2, apeture_1, apeture_2, ISO_1, ISO_2, numberOfExposures_1, numberOfExposures_2]);

	return (
		<div className="App">
			<header>
				<h1>Astro Compare</h1>
			</header>
			<div className="body-container">
				<form id="exposures-container">
					<ToggleSlider
						barHeight={39}
						barWidth={72}
						barBackgroundColor="grey"
						barBackgroundColorActive="#0076BE"
						onToggle={(state) => setAccountExposures(state)}
					/>
					<div className="exposure-1">
						<h3>Exposure 1</h3>
						<label htmlFor="shutterSpeed_1">
							Shutter Speed
							<br />
							<input
								value={shutterSpeed_1}
								onChange={(e) =>
									setshutterSpeed_1(e.target.value)
								}
								type="text"
							/>
						</label>
						<label htmlFor="ISO_1">
							ISO
							<br />
							<input
								value={ISO_1}
								onChange={(e) => setISO_1(e.target.value)}
								type="text"
							/>
						</label>
						{accountExposures && (
							<label htmlFor="numberOfExposures_1">
								No. Lights
								<br />
								<input
									value={numberOfExposures_1}
									onChange={(e) =>
										setNumberOfExposures_1(e.target.value)
									}
									type="text"
								/>
							</label>
						)}
						<label htmlFor="apeture_1">
							Apeture
							<select
								onChange={(e) => setApeture_1(e.target.value)}
								name="apeture_1"
								id="apeture_1"
							>
								{Object.entries(relative_apeture_dict).map(
									([key]) => {
										return (
											<option value={key}>{key}</option>
										);
									}
								)}
							</select>
						</label>
					</div>
					<br />
					<div className="exposure-2">
						<h3>Exposure 2</h3>
						<label htmlFor="shutterSpeed_2">
							Shutter Speed
							<br />
							<input
								value={shutterSpeed_2}
								onChange={(e) =>
									setshutterSpeed_2(e.target.value)
								}
								type="text"
							/>
						</label>

						<label htmlFor="ISO_2">
							ISO
							<br />
							<input
								value={ISO_2}
								onChange={(e) => setISO_2(e.target.value)}
								type="text"
							/>
						</label>
						{accountExposures && (
							<label htmlFor="numberOfExposures_2">
								No. Lights
								<br />
								<input
									value={numberOfExposures_2}
									onChange={(e) =>
										setNumberOfExposures_2(e.target.value)
									}
									type="text"
								/>
							</label>
						)}
						<label htmlFor="apeture_2">
							Apeture
							<select
								onChange={(e) => setApeture_2(e.target.value)}
								name="apeture_2"
								id="apeture_2"
							>
								{Object.entries(relative_apeture_dict).map(
									([key]) => {
										return (
											<option value={key}>{key}</option>
										);
									}
								)}
							</select>
						</label>
					</div>
				</form>
				<br />
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
							stops brighter than exposure 2
						</>
					) : (
						<>
							Exposure 2 is {Math.log2(exposure_2 / exposure_1)}{" "}
							stops brighter than exposure 1
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
