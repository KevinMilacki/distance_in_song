import React, {  useState } from 'react';
import SongComponent from './SongComponent';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";



const SongForm = ({accessToken, onSongSelect, onSongNameSelect}) => {
    const [query, setQuery] = useState('');
   
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
    };
  
   

    return (
      <div>
        <form  onSubmit={handleSubmit}>
          <input
          className="custom-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a song or artist"
          />
         
          <button className="btn btn-primary mb-5" type="submit">Get Top Songs</button>
        </form>
        {submitted && <SongComponent query={query} accessToken={accessToken} onSongSelect={onSongSelect} onSongNameSelect={onSongNameSelect}
                     />}
      </div>
    );
  };
  
  export default SongForm;
  