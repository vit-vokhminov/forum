import React from 'react';
import { useSelector } from 'react-redux';

import { RootStateType } from 'Types/ReduxTypes';

function Loading() {
    const isLoading = useSelector(
        (state: RootStateType) => state.userReducer.isLoading
    );

    return <>{isLoading && <div>Загрузка...</div>}</>;
}

export default Loading;
