import React, { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Loading } from 'Components';

import { RootStateType } from 'Types/ReduxTypes';

interface PropsTypes {
    component: ReactElement;
    rest: any;
}

function PrivateRoute({ component: Component, ...rest }: PropsTypes) {
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
                    return React.cloneElement<any>(Component, props);
                }

                return <Redirect to='/signin' />;
            }}
        />
    );
}
export default PrivateRoute;
