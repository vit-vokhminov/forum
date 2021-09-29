import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Posts, Post, AddPost, EditPost, Contacts, NotFound } from './pages';

function App() {

    return (
        <div className='App'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/posts' component={Posts} />
                <Route path='/post/:id' component={Post} />
                <Route path='/add-post' component={AddPost} />
                <Route path='/edit/:id' component={EditPost} />
                <Route path='/contacts' component={Contacts} />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
