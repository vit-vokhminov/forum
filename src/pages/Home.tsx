import React from 'react';
import Logo from '_/logo.jpg';

function Home() {
    return (
        <div className='home content'>
            <div className='main_content'>
                {/* <h1>P E R N сайт</h1> */}
                <div className='img_home'>
                    <img src={Logo} alt="" />
                </div>
                <div className='technologies'>
                    <div className='technologies_left'>
                        <h2>Frontend:</h2>
                        <ul>
                            <li>TypeScript</li>
                            <li>ReactJS</li>
                            <li>Redux, Redux Saga</li>
                            <li>ESLint, Prettier</li>
                            <li>Webpack</li>
                            <li>Jest + Enzyme</li>
                            <li>Service Worker</li>
                        </ul>
                    </div>
                    <div className='technologies_right'>
                        <h2>Backend:</h2>
                        <ul>
                            <li>Node.JS / Express</li>
                            <li>PostgreSQL / Sequalize</li>
                            <li>JWT</li>
                            <li>Socket.io</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
