export default function useRealtiveApetureDict(): Record<string, number> {
	const base = 2;
	const relativeApetureDict: Record<string, number> = {
		"1.0": base ** 0,
		1.1: base ** (1 / 3),
		1.2: base ** (2 / 3),
		1.4: base ** 1,
		1.6: base ** (1 + 1 / 3),
		1.8: base ** (1 + 2 / 3),
		"2.0": base ** 2,
		2.2: base ** (2 + 1 / 3),
		2.5: base ** (2 + 2 / 3),
		2.8: base ** 3,
		3.2: base ** (3 + 1 / 3),
		3.5: base ** (3 + 2 / 3),
		"4.0": base ** 4,
		4.5: base ** (4 + 1 / 3),
		"5.0": base ** (4 + 2 / 3),
		5.6: base ** 5,
		6.3: base ** (5 + 1 / 3),
		7.1: base ** (5 + 2 / 3),
		"8.0": base ** 6,
		"9.0": base ** (6 + 1 / 3),
		"10.0": base ** (6 + 2 / 3),
		"11.0": base ** 7,
		"13.0": base ** (7 + 1 / 3),
		"14.0": base ** (7 + 2 / 3),
		"16.0": base ** 8,
		"18.0": base ** (8 + 1 / 3),
		"20.0": base ** (8 + 2 / 3),
		"22.0": base ** 9,
	};

	return relativeApetureDict;
}
