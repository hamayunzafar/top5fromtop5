// TopTracksButton.js
import React from 'react';

export const TopTracksButton = ({ onClick, label }) => {
  return (
    <button className='buttons' onClick={onClick}>{label}</button>
  );
};