import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import api from '../api'



function Games() {
  const title = 'Most Popular Games';
  const [games, setGames] = useState([]);
  const fetchData = async () => {
    const result = await api.get('https://api.twitch.tv/helix/games/top');
    setGames(result.data.data.map(game => {
      game.box_art_url = game.box_art_url.replace('{width}', '200').replace('{height}', '200')
      return game;
    }));
  }
  useEffect(() => {
    document.title = title;
    fetchData();
  }, []);
  
  return <div>
    <h1 style={{textAlign: 'center', marginBottom:'0.5rem'}}>{title}</h1>
    <ol style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-around', listStyle:'none'}}>
      {games.map((game, i) => (
        <li key={i} style={{display:'flex', flexDirection:'column', alignItems: 'center', marginBottom: '1rem', minWidth: '300px'}}>
           <Link className='hover' to={{pathname: "game/" + game.id, ...game}}>
             <img className="rounded" src={game.box_art_url} alt={game.name} />
             <p style={{maxWidth: '200px', textAlign:'center'}}>{i+1}. {game.name}</p>
            </Link>
          </li>
      ))}
    </ol>
  </div>
}

export default Games;