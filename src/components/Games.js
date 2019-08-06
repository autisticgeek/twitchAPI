import React, { useState, useEffect } from 'react'
import api from '../api'


function Games() {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top');
            console.log('result', result.data.data);
            setGames(result.data.data);

        }
        fetchData();
    }, []);
    return <div>
        <h1 style={{textAlign: 'center'}}>Most Popular Games</h1>
        <ol style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-around', listStyle:'none'}}>
            {games.map((game, i) => (
                <li key={i} style={{display:'flex', flexDirection:'column', alignItems: 'center', marginBottom: '1rem'}}>
                    <img style={{borderRadius:'15px'}} src={game.box_art_url.replace('{width}', '300').replace('{height}', '300')} alt={game.name} />
                    <p style={{maxWidth: '300px', textAlign:'center'}}>{i+1}. {game.name}</p>
                </li>
            ))}
        </ol>
    </div>
}

export default Games;