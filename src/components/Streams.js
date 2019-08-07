import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import api from '../api'


function Streams() {
    const [streams, setStreams] = useState([]);
    const [language, setLanguage] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?language=${language}`);
            console.log(result.data.data[0])
            setStreams(result.data.data.map(stream => {
                stream.box_art_url = stream.thumbnail_url.replace('{width}', '300').replace('{height}', '200')
                return stream
            }));

        }
        document.title = "Top Live Streams";
        fetchData();
    }, [language]);
    return <div><div style={{textAlign:'center', marginBottom:'0.5rem'}}>
        <h1>Top Live Streams</h1><select id="language" value={language} onChange={(event) => {
          setLanguage(document.getElementById('language').value)
        }} >
          <option value="">All languages</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          </select></div>
        <ol style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-around', listStyle:'none'}}>
            {streams.map((stream, i) => (
                <li key={i} style={{display:'flex', flexDirection:'column', justifyContent: 'space-between', marginBottom: '1rem', minWidth: '300px'}}>
                        <div><img className="rounded" src={stream.box_art_url} alt={stream.title} /> 
                        <p style={{maxWidth: '300px'}}>{i+1}. {stream.title}</p></div>
                        <div><h5>User: {stream.user_name} &mdash; {stream.viewer_count} viewers </h5>
                        <Link className='btn btn-primary' to={`https://twitch.tv/${stream.user_name}`} style={{width:'100%'}}><i className="fa fa-play"></i>&nbsp;View Stream</Link></div>   
                </li>
            ))}
        </ol>
    </div>
}

export default Streams;