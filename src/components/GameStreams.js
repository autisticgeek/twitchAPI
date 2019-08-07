import React, { useState, useEffect } from 'react';
import api from '../api';

function GamesStreams({match, location}) {
  if (typeof location.id === 'undefined'){
    window.location.replace("..");
  }
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);
  const [language, setLanguage] = useState('')


  useEffect(()=>{
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.id}&language=${language}`
      );
      setStreamData(result.data.data.map(stream => {
        stream.thumbnail_url = stream.thumbnail_url.replace('{width}', '300').replace('{height}', '200')
        return stream
    }));
      setViewers(result.data.data.reduce((acc, stream)=>{
        return acc + stream.viewer_count
      },0))
      
    }
    document.title = location.name;
    fetchData();
  },[language])

  
  
  
  
  return <div>
    <div style={{display :'flex', margin: '0, 98%', marginBottom:'0.5rem'}}>
      <img src={location.box_art_url} alt="location.name" />
      <div style={{marginLeft:'0.5rem'}}>
        <h1>{location.name}</h1>
        <h3>{viewers} Viewers</h3>
        <select id="language" value={language} onChange={(event) => {
          console.log(document.getElementById('language').value)
          setLanguage(document.getElementById('language').value)
        }} >
          <option value="">All languages</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          </select>
        </div>
      </div>
      <ol style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-around', listStyle:'none'}}>
            {streamData.map((stream, i) => {
             return (
             <li style={{width: "300px", marginBottom: '1rem', display:'flex', flexDirection: 'column', justifyContent: 'space-between'}} key={stream.id}>
               <img className="rounded" src={stream.thumbnail_url} />
               <h4>{i+1}. {stream.title}</h4>
               <h5>User: {stream.user_name} &mdash; {stream.viewer_count} viewers</h5>
               <a className="btn btn-primary" href={`https://twitch.tv/${stream.user_name}`}><i className="fa fa-play"></i> View Stream</a>
              </li>
               )})}
        </ol>
    </div>
}

export default GamesStreams;