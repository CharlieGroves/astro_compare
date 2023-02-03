import "./App.css";
import { useState, useEffect } from "react";

function App() {

	const relative_apeture_dict = {
		1.4: 1,
		1.8: 2,
		2.8: 4,
		4: 8,
		5.6: 16,
		8: 32,
		11: 64,
		16: 126,
		22: 256
	}

	const [exposure_1, setExposure_1] = useState(0);
	const [exposure_2, setExposure_2] = useState(0);

	const [shutterSpeed_1, setshutterSpeed_1] = useState(0);
	const [shutterSpeed_2, setshutterSpeed_2] = useState(0);

	const [apeture_1, setApeture_1] = useState(1.4);
	const [apeture_2, setApeture_2] = useState(1.4);

	const [ISO_1, setISO_1] = useState(0);
	const [ISO_2, setISO_2] = useState(0);

		useEffect(() => {
		let temp_exposure_1 = (shutterSpeed_1 / relative_apeture_dict[apeture_1]) * ISO_1;
		let temp_exposure_2 = (shutterSpeed_2 / relative_apeture_dict[apeture_2]) * ISO_2;

		setExposure_1(temp_exposure_1);
		setExposure_2(temp_exposure_2);

		return;
	}, [shutterSpeed_1, shutterSpeed_2, apeture_1, apeture_2, ISO_1, ISO_2]);

	return (
		<div className="App">
			<form>
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
						<select onChange={(e) => setApeture_1(e.target.value)} name="apeture_1" id="apeture_1">
							<option onClick={() => setApeture_1(1.4)} value="1.4">1.4</option>
							<option onClick={() => setApeture_1(1.8)} value="1.8">1.8</option>
							<option onClick={() => setApeture_1(2.8)} value="2.8">2.8</option>
							<option onClick={() => setApeture_1(4)} value="4">4</option>
							<option onClick={() => setApeture_1(5.6)} value="5.6">5.6</option>
							<option onClick={() => setApeture_1(8)} value="8">8</option>
							<option onClick={() => setApeture_1(11)} value="11">11</option>
							<option onClick={() => setApeture_1(16)} value="16">16</option>
							<option onClick={() => setApeture_1(22)} value="22">22</option>
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
						<select onChange={(e) => setApeture_2(e.target.value)} name="apeture_2" id="apeture_2">
							<option onClick={() => setApeture_2(1.4)} value="1.4">1.4</option>
							<option onClick={() => setApeture_2(1.8)} value="1.8">1.8</option>
							<option onClick={() => setApeture_2(2.8)} value="2.8">2.8</option>
							<option onClick={() => setApeture_2(4)} value="4">4</option>
							<option onClick={() => setApeture_2(5.6)} value="5.6">5.6</option>
							<option onClick={() => setApeture_2(8)} value="8">8</option>
							<option onClick={() => setApeture_2(11)} value="11">11</option>
							<option onClick={() => setApeture_2(16)} value="16">16</option>
							<option onClick={() => setApeture_2(22)} value="22">22</option>
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
			<div>Exposure 1: {exposure_1} second iso per f-stop</div>
			<div>Exposure 2: {exposure_2} second iso per f-stop</div>
			{ exposure_1 >= exposure_2 ? <>Exposure 1 is {exposure_1/exposure_2} stops brighter than exposure 2</> : <>Exposure 2 is {exposure_2/exposure_1} stops brighter than exposure 1</>}
		</div>
	);
}

export default App;
