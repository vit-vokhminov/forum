import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from 'Components';

function PrivateRoute({ component: Component, ...rest }) {
    const { userAuth, isLoading } = useSelector((state) => state.userReducer);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <Loading {...props} />;
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
