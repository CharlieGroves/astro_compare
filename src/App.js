import "./App.css";
// import "./stars.css";
import { useState, useEffect } from "react";

function App() {
	const relative_apeture_dict = {
		1.0: 2^0,
		1.1: 2^(1/3),
		1.2: 2^(2/3),
		1.4: 2^1,
		1.6: 2^(1 + 1/3),
		1.8: 2^(1 + 2/3),
		2: 2^2,
		2.2: 2^(2 + 1/3),
		2.5: 2^(2 + 2/3),
		2.8: 2^3,
		3.2: 2^(3 + 1/3),
		3.5: 2^(3 + 2/3),
		4: 2^4,
		4.5: 2^(4 + 1/3),
		5: 2^(4 + 2/3),
		5.6: 2^5,
		6.3: 2^(5 + 1/3),
		7.1: 2^(5 + 2/3),
		8: 2^6,
		9: 2^(6 + 1/3),
		10: 2^(6 + 2/3),
		11: 2^7,
		13: 2^(7 + 1/3),
		14: 2^(7 + 2/3),
		16: 2^8,
		18: 2^(8 + 1/3),
		20: 2^(8 + 2/3),
		22: 2^9,
	};

	const [exposure_1, setExposure_1] = useState(0);
	const [exposure_2, setExposure_2] = useState(0);

	const [shutterSpeed_1, setshutterSpeed_1] = useState(0);
	const [shutterSpeed_2, setshutterSpeed_2] = useState(0);

	const [apeture_1, setApeture_1] = useState(1.4);
	const [apeture_2, setApeture_2] = useState(1.4);

	const [ISO_1, setISO_1] = useState(0);
	const [ISO_2, setISO_2] = useState(0);

	useEffect(() => {
		let temp_exposure_1 =
			(shutterSpeed_1 / relative_apeture_dict[apeture_1]) * ISO_1;
		let temp_exposure_2 =
			(shutterSpeed_2 / relative_apeture_dict[apeture_2]) * ISO_2;

		setExposure_1(temp_exposure_1);
		setExposure_2(temp_exposure_2);

		return;
	}, [shutterSpeed_1, shutterSpeed_2, apeture_1, apeture_2, ISO_1, ISO_2]);

	return (
		<div className="App">
			<header>
				<h1>Astro Compare</h1>
			</header>
			<form id="exposures-container">
				<div className="exposure-1">
					<label htmlFor="shutterSpeed_1">
						Shutter Speed
						<input
							value={shutterSpeed_1}
							onChange={(e) => setshutterSpeed_1(e.target.value)}
							type="text"
						/>
					</label>
					<label htmlFor="apeture_1">
						Apeture
						<select
							onChange={(e) => setApeture_1(e.target.value)}
							name="apeture_1"
							id="apeture_1"
						>
							<option value="1.4">1.4</option>
							<option value="1.8">1.8</option>
							<option value="2.8">2.8</option>
							<option value="4">4</option>
							<option value="5.6">5.6</option>
							<option value="8">8</option>
							<option value="11">11</option>
							<option value="16">16</option>
							<option value="22">22</option>
						</select>
					</label>
					<label htmlFor="ISO_1">
						ISO
						<input
							value={ISO_1}
							onChange={(e) => setISO_1(e.target.value)}
							type="text"
						/>
					</label>
				</div>
				<br />
				<div className="exposure-2">
					<label htmlFor="shutterSpeed_2">
						Shutter Speed
						<input
							value={shutterSpeed_2}
							onChange={(e) => setshutterSpeed_2(e.target.value)}
							type="text"
						/>
					</label>
					<label htmlFor="apeture_2">
						Apeture
						<select
							onChange={(e) => setApeture_2(e.target.value)}
							name="apeture_2"
							id="apeture_2"
						>
							<option value="1.4">1.4</option>
							<option value="1.8">1.8</option>
							<option value="2.8">2.8</option>
							<option value="4">4</option>
							<option value="5.6">5.6</option>
							<option value="8">8</option>
							<option value="11">11</option>
							<option value="16">16</option>
							<option value="22">22</option>
						</select>
					</label>
					<label htmlFor="ISO_2">
						ISO
						<input
							value={ISO_2}
							onChange={(e) => setISO_2(e.target.value)}
							type="text"
						/>
					</label>
				</div>
			</form>
			<div id="exp-1">Exposure 1: {exposure_1} second iso per f-stop</div>
			<div id="exp-2">Exposure 2: {exposure_2} second iso per f-stop</div>
			<div id="compare">
				{exposure_1 === exposure_2 ? (
					<>Exposure 1 and exposure 2 are equal</>
				) : exposure_1 >= exposure_2 ? (
					<>
						Exposure 1 is {Math.log2(exposure_1 / exposure_2)} stops
						brighter than exposure 2
					</>
				) : (
					<>
						Exposure 2 is {Math.log2(exposure_2 / exposure_1)} stops
						brighter than exposure 1
					</>
				)}
			</div>
		</div>
	);
}

export default App;
