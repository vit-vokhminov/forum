import React from 'react';
import { Nav } from '../components';

function NotFound() {
    return (
        <div className='content error'>
            <Nav />

            <h1 class='error-code'>404</h1>
            <p>Что-то куда то не туда...</p>

        </div>
    );
}

export default NotFound;
