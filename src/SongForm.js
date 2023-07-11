import React, {  useState } from 'react';
import SongComponent from './SongComponent';



const SongForm = ({accessToken, onSongSelect}) => {
    const [query, setQuery] = useState('');
   
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
    };
  
   

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a song or artist"
          />
         
          <button type="submit">Get Top Songs</button>
        </form>
        {submitted && <SongComponent query={query} accessToken={accessToken} onSongSelect={onSongSelect}
                     />}
      </div>
    );
  };
  
  export default SongForm;
  