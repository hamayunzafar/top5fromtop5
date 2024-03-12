import React from 'react';
import { useSpring, animated } from 'react-spring';
import '../App.css';
import '../resources/top5fromtop5.svg';

export const IconButton = ({ icon, text, onClick }) => {
  // Define the gradient animation
  const animatedStyles = useSpring({
    from: { background: 'radial-gradient(81.46% 210.8% at 50% 151.14%, #00AA30 0%, #005258 58.78%, #000 100%)' },
    to: { background: 'radial-gradient(104.3% 269.89% at 50% 0%, #00AA30 0%, #005258 58.78%, #000 100%)' },
    config: { duration: 3000 },
    loop: { reverse: true },
  });

  // Use the animated component from react-spring for the `button`
  return (
    <animated.button style={animatedStyles} type="button" className="icon-button" onClick={onClick}>
      <img src={icon} alt="" aria-hidden="true" />
      <span>{text}</span>
    </animated.button>
  );
};
