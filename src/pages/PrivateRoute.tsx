import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from 'Components';

import { RootStateType } from 'Types/ReduxTypes';

function PrivateRoute({ component: Component, ...rest }) {
    const { userAuth, isLoading } = useSelector(
        (state: RootStateType) => state.userReducer
    );

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return (
                        <div style={{ marginTop: '100px' }}>
                            <Loading />
                        </div>
                    );
                }

                if (userAuth) {
                    return <Component {...props} />;
                }

                return <Redirect to='/signin' />;
            }}
        />
    );
}
export default PrivateRoute;
