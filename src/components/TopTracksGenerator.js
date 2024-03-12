import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import fetchAlbumsIcon from '../resources/ic_fetchTopAlbums.svg';
import { Navbar } from './Navbar.js';
import {TopAlbumInputs} from './TopAlbumInputs';
import {TopTracksButton} from './TopTracksButton';
import { IconButton } from './designElements.js';

export const TopTracksGenerator = () => {
  const [albumNames, setAlbumNames] = useState(['']); // Start with one input field
  const [topTracks, setTopTracks] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  const handleAlbumNameChange = (index, event) => {
    const newAlbumNames = [...albumNames];
    newAlbumNames[index] = event.target.value;
    setAlbumNames(newAlbumNames);
  };

  const fetchWeeklyAlbums = async () => {
    try {
      const response = await axios.post('/api/mongodb_proxy', {
        action: 'find',  // Use the correct action as per your MongoDB function
        data: {
          collection: "Top 5 Weekly Albums",
          database: "top5fromtop5",
          dataSource: "top5fromtop5",
          projection: {"album_name": 1}
        }
      });
  
      // Assuming the response format from your serverless function matches this
      const albumNames = response.data.documents.map(doc => doc.album_name);
      setAlbumNames(albumNames);
  
      // After setting the album names, automatically generate the top tracks
      await generateTopTracks(albumNames);
    } catch (error) {
      console.error('Error fetching weekly albums:', error);
    }
  };
  

  const addAlbumInput = () => {
    setAlbumNames([...albumNames, '']); // Add a new input field
  };
  
  const fetchAccessToken = async () => {
    try {
      const response = await axios.get('/api/spotify_auth ');
      return response.data.accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  };
  

  const generateTopTracks = async (inputAlbumNames = albumNames) => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Replace with your actual client ID
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Replace with your actual client secret

    // Fetch access token
    const token = await fetchAccessToken(clientId, clientSecret);
    if (!token) {
      console.error('Failed to fetch access token.');
      return;
    }
    setAccessToken(token);

    // Use access token to fetch top tracks
    const nonEmptyAlbumNames = albumNames.filter(name => name.trim() !== '');
    if (nonEmptyAlbumNames.length === 0) {
      console.error('No album names provided.');
      return;
    }

    const allTopTracks = await Promise.all(nonEmptyAlbumNames.map(albumName => fetchTracks(albumName)));
    setTopTracks(allTopTracks.flat());
  };

  const fetchTracks = async (albumName) => {
    try {
      const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          q: albumName,
          type: 'album'
        }
      });

      const albums = searchResponse.data.albums.items;
      if (albums.length > 0) {
        const albumId = albums[0].id;
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const tracks = tracksResponse.data.items;
        const topTracks = tracks.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
        return topTracks.map(track => track.uri);
      }

      return [];
    } catch (error) {
      console.error('Error fetching tracks from Spotify:', error);
      return [];
    }
  };

  const copyPlaylist = () => {
    const urisString = topTracks.join('\n');
    navigator.clipboard.writeText(urisString).then(() => {
      console.log('Playlist URIs copied to clipboard.');
    }).catch(err => {
      console.error('Failed to copy playlist URIs: ', err);
    });
  };

  return (
    <div>
      <Navbar />
      <div className='main-content'>
        <span className='topHeader'>Quickest way to get top tracks from new top releases this week!</span>
        
        <IconButton icon={fetchAlbumsIcon} text="Get This Week's Top Albums" onClick={fetchWeeklyAlbums} />

        <span className='subHeader'>ALBUM INPUTS</span>

        <TopAlbumInputs
          albumNames={albumNames}
          handleAlbumNameChange={handleAlbumNameChange}
          addAlbumInput={addAlbumInput}
        />
        <div className='button-containers'>
          <TopTracksButton onClick={generateTopTracks} label="Generate Top Tracks" />
          <TopTracksButton onClick={addAlbumInput} label="Add Album" />
          {/* <TopTracksButton onClick={fetchWeeklyAlbums} label="Fetch Weekly Albums" /> */}
        </div>
        {topTracks.length > 0 && (
          <>
            <div className='uri-container'>
              <div className='headerAndButton'>
                <span>Copy the code, paste in an empty or filled spotify</span>
                <TopTracksButton onClick={copyPlaylist} label="Copy Playlist" />
              </div>
              {topTracks.map((trackURI, index) => (
                <div className='trackURIs' key={index}>{trackURI}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};