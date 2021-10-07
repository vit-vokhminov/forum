import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Home,
    SignIn,
    SignUp,
    Posts,
    Post,
    AddPost,
    EditPost,
    Contacts,
    NotFound,
} from './pages';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
    const { token, login, logout, userId } = useAuth();
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
            }}
        >
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/posts' component={Posts} />
                    <Route path='/post/:id' component={Post} />
                    <Route path='/add-post' component={AddPost} />
                    <Route path='/edit/:id' component={EditPost} />
                    <Route path='/contacts' component={Contacts} />

                    <Route component={NotFound} />
                </Switch>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
