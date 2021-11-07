import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    Home,
    SignIn,
    SignUp,
    Posts,
    Post,
    AddPost,
    EditPost,
    Contacts,
    NotFound
} from 'Pages/';
import { Nav, PrivateRoute } from 'Components';
import { fetchCheckAuth } from 'ReduxStore/userReducer';

// TODO typescript webpack проблема с элиасами

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCheckAuth());
    }, [dispatch]);

    return (
        <div className='App'>
            <Nav />

            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/posts' component={Posts} />
                <Route path='/post/:id' component={Post} />

                <PrivateRoute path='/add-post' component={AddPost} />
                <PrivateRoute path='/edit/:id' component={EditPost} />
                <PrivateRoute path='/contacts' component={Contacts} />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
