import React from 'react';
import './App.css';
import {TopTracksGenerator} from './components/TopTracksGenerator';

function App() {
  return (
    <div>
      {/* The component is cleaned up but it's not the best way to manage it, next time I will have more of a better managed layout */}
      <TopTracksGenerator />
    </div>
  );
}

export default App;
