import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../components';
import { API } from '../api';

function Contacts() {
    const [contacts, setContacts] = React.useState(null);

    React.useEffect(() => {
        API.getContacts().then((response) => {
            setContacts(response.data);
        });
    }, []);

    // React.useEffect(() => {
    //     console.log(contacts);
    // }, [contacts]);

    return (
        <div className='content'>
            <Nav />

            <h1>Контакты:</h1>

            <ul className='contacts'>
                {!!contacts &&
                    contacts.map((elem) => (
                        <li key={elem.id}>
                            <Link to={{ pathname: elem.link }} target='_blank'>
                                {elem.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Contacts;
