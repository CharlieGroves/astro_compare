import { useEffect } from 'react';

function SpaceBackground() {
  useEffect(() => {
    const container = document.querySelector('.background');
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.color = "white";
      star.style.backgroundColor = "white";
      star.style.position = "absolute";
      star.style.width = "1px";
      star.style.height = "1px";
      star.style.zIndex = "10";
      container.appendChild(star);
    }
  }, []);

  return (
    <div className="background"></div>
  );
}

export default SpaceBackground;
