import React, { useEffect, useMemo, useRef } from "react";
import "../css/SpaceBackground.css";

function SpaceBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const satelliteColors = useMemo(
		() => ["#ffffff", "#f5f5f5", "#eeeeee"],
		[]
	);
	const trailColors = useMemo(() => ["#ffffff", "#f5f5f5", "#eeeeee"], []);

	useEffect(() => {
		const container = containerRef.current!;
		const width = container.offsetWidth;
		const height = container.offsetHeight;

		// Add stars
		for (let i = 0; i < 50; i++) {
			const star = document.createElement("div");
			star.classList.add("star");
			star.style.top = `${Math.random() * height}px`;
			star.style.left = `${Math.random() * width}px`;
			container.appendChild(star);
		}

		// Add star clusters
		for (let i = 0; i < 5; i++) {
			const cluster = document.createElement("div");
			cluster.classList.add("star-cluster");
			cluster.style.top = `${Math.random() * 100}%`;
			cluster.style.left = `${Math.random() * 100}%`;
			cluster.style.position = "absolute";
			cluster.style.width = `${Math.random() * 40 + 10}px`;
			cluster.style.height = `${Math.random() * 40 + 10}px`;
			cluster.style.zIndex = "10";
			container.appendChild(cluster);
			for (let j = 0; j < 5; j++) {
				const star = document.createElement("div");
				star.classList.add("star");
				star.style.top = `${Math.random() * 100}%`;
				star.style.left = `${Math.random() * 100}%`;
				star.style.color = "white";
				star.style.backgroundColor = "white";
				star.style.position = "absolute";
				star.style.width = "1px";
				star.style.height = "1px";
				cluster.appendChild(star);
			}
		}
		// Create shooting stars
		setInterval(() => {
			const shootingStar = document.createElement("div");
			shootingStar.classList.add("shooting-star");
			shootingStar.style.top = `${Math.random() * 100}%`;
			shootingStar.style.left = "-5%";
			shootingStar.style.zIndex = "10";

			shootingStar.style.width = "20px";
			shootingStar.style.height = "20px";
			shootingStar.style.position = "absolute";
			shootingStar.style.backgroundColor =
				satelliteColors[
					Math.floor(Math.random() * satelliteColors.length)
				];
			container.appendChild(shootingStar);

			const trail = document.createElement("div");
			trail.classList.add("trail");
			trail.style.backgroundColor =
				trailColors[Math.floor(Math.random() * trailColors.length)];
			shootingStar.appendChild(trail);

			const animation = shootingStar.animate(
				[
					{ transform: "translateX(0)" },
					{ transform: "translateX(110%)" },
				],
				{
					duration: Math.random() * 3000 + 2000,
					easing: "linear",
					delay: Math.random() * 5000,
				}
			);

			animation.onfinish = () => {
				shootingStar.remove();
			};
		}, 10000);
	}, [satelliteColors, trailColors]);
	return <div className="background" ref={containerRef}></div>;
}

export default SpaceBackground;
