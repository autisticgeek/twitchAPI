import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return <nav style={{display:'flex', justifyContent: 'space-around'}}>
        <Link to="/">Top Games</Link>
        <Link to="/top-streams">Top Live Streams</Link>
        </nav>
}

export default Header;