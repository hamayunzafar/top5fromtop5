// TopAlbumInput.js
import React from 'react';

export const TopAlbumInput = ({ value, placeholder, onChange }) => {
  return (
    <input
      className='album_inputs'
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};