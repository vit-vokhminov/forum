import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../redux/store/userReducer';

function Home() {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();

    const handleExit = () => {
        const conf = window.confirm(`Тебе здесь не место?`);
        if (conf) {
            dispatch(fetchLogout());
        }
    };

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
                    {user ? (
                        <>
                            <li>
                                <Link to='/add-post'>Создать Пост</Link>
                            </li>
                            <li>
                                <Link to='/contacts'>{user.login}</Link>
                            </li>
                            <li onClick={() => handleExit()}>
                                <span>Выйти</span>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to='/signin'>Войти</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default React.memo(Home);
