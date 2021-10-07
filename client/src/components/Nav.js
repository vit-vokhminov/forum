import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Домашняя</Link>
                    </li>
                    <li>
                        <Link to='/posts'>Обсуждение</Link>
                    </li>
                    <li>
                        <Link to='/add-post'>Создать Пост</Link>
                    </li>
                    <li>
                        <Link to='/contacts'>Контакты</Link>
                    </li>
                    <li>
                        <Link to='/signin'>Войти</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default React.memo(Home);
