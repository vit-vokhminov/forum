import React from 'react';

import { Nav } from 'Components';

import { useSelector } from 'react-redux';

function Contacts() {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <div className='content'>
            <Nav />

            <h1>Контакты:</h1>

            {user && (
                <ul className='contacts'>
                    <li>
                        Email: <i>{user.email}</i>{user.isActivated ? <span>&#10004;</span> : <span>не подтверждена</span>}
                    </li>
                    <li>
                        Login: <i>{user.login}</i>
                    </li>
                    <li>
                        Phone: <i>{user.phone}</i>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Contacts;
