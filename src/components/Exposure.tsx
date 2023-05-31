import React from "react";

interface Props {
    relativeApetureDict: Record<string, number>;
	numberOfExposures: number;
	accountExposures: boolean;
	shutterSpeed: string;
	ISO: number;
	setNumberOfExposures: React.Dispatch<React.SetStateAction<number>>;
	setShutterSpeed: React.Dispatch<React.SetStateAction<string>>;
    setApeture: React.Dispatch<React.SetStateAction<number>>;
	setISO: React.Dispatch<React.SetStateAction<number>>;
}

export default function Exposure(props: Props) {
	const {
        relativeApetureDict,
		numberOfExposures,
		accountExposures,
		shutterSpeed,
		ISO,
		setNumberOfExposures,
		setShutterSpeed,
        setApeture,
		setISO,
	} = props;
	return (
		<div className="exposure-1">
			<h3>Exposure 1</h3>
			<label htmlFor="shutterSpeed_1">
				Shutter Speed
				<br />
				<input
					value={shutterSpeed}
					onChange={(e) => setShutterSpeed(e.target.value)}
					type="text"
				/>
			</label>
			<label htmlFor="ISO_1">
				ISO
				<br />
				<input
					value={ISO}
					onChange={(e) => setISO(Number(e.target.value))}
					type="text"
				/>
			</label>
			{accountExposures && (
				<label htmlFor="numberOfExposures_1">
					No. Lights
					<br />
					<input
						value={numberOfExposures}
						onChange={(e) =>
							setNumberOfExposures(Number(e.target.value))
						}
						type="text"
					/>
				</label>
			)}
			<label htmlFor="apeture_1">
				Apeture
				<select
					onChange={(e) => setApeture(Number(e.target.value))}
					name="apeture_1"
					id="apeture_1"
				>
					{Object.entries(relativeApetureDict).map(([key]) => (
						<option key={key} value={key}>{key}</option>
					))}
				</select>
			</label>
		</div>
	);
}
