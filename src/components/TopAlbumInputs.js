// TopAlbumInputs.js
import React from 'react';
import '../App.css';
import {TopAlbumInput} from './TopAlbumInput';

export const TopAlbumInputs = ({ albumNames, handleAlbumNameChange, addAlbumInput }) => {
  return (
    <div className='input-container'>
      {albumNames.map((name, index) => (
        <TopAlbumInput
          key={index}
          value={name}
          placeholder={`Album Name #${index + 1}`}
          onChange={(e) => handleAlbumNameChange(index, e)}
        />
      ))}
    </div>
  );
};