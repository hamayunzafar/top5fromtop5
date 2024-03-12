// TopTracksButton.js
import React from 'react';
import '../App.css';

export const TopTracksButton = ({ onClick, label }) => {
  return (
    <button className='buttons' onClick={onClick}>{label}</button>
  );
};