import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";


const SongComponent = ({ query, accessToken, onSongSelect }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: query,
            type: 'track',
            limit: 5,
          },
        });

        setSongs(response.data.tracks.items);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, [query, accessToken]);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    onSongSelect(song.duration_ms);
  };

  return (
    <div>
      {songs.length > 0 ? (
        <ListGroup>
          {songs.map((song) => (
            <ListGroup.Item
              key={song.id}
              active={selectedSong === song}
              onClick={() => handleSongClick(song)}
            >
              <img src={song.album.images[2].url} alt={song.name} />
              
              {song.artists[0].name} - {song.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Loading songs...</p>
      )}
    </div>
  );
};

export default SongComponent;