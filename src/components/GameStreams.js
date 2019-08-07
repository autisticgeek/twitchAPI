import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import api from '../api';

function GamesStreams({match, location}) {
  if (typeof location.id === 'undefined'){
    window.location.replace("..");
  }
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0)

  useEffect(()=>{
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.id}`
      );
      setStreamData(result.data.data.map(stream => {
        stream.thumbnail_url = stream.thumbnail_url.replace('{width}', '300').replace('{height}', '200')
        return stream
    }));
      setViewers(result.data.data.reduce((acc, stream)=>{
        return acc + stream.viewer_count
      },0))
      
    }
    fetchData();
  },[])

  
  
  
  
  return <div>
    <div style={{display :'flex', marginBottom: '1rem'}}>
      <img src={location.box_art_url} alt="location.name" />
      <div style={{marginLeft:'0.5rem'}}>
        <h1>{location.name}</h1>
        <h3>{viewers} Viewers</h3>
        </div>
      </div>
      <ol style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-around', listStyle:'none'}}>
            {streamData.map((stream, i) => {
             return (
             <li style={{width: "300px", marginBottom: '1rem', display:'flex', flexDirection: 'column', justifyContent: 'space-between'}} key={stream.id}>
               <img className="rounded" src={stream.thumbnail_url} />
               <h4>{i+1}. {stream.title}</h4>
               <h5>User: {stream.user_name}</h5>
               <p>Viewers: {stream.viewer_count}</p>
               <a className="btn btn-primary" href={`https://twitch.tv/${stream.user_name}`}><i class="fa fa-play"></i> View Stream</a>
              </li>
               )})}
        </ol>
    </div>
}

export default GamesStreams;