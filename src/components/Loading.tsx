import React from 'react';
import { useSelector } from 'react-redux';

import {RootState} from 'ReduxStore/userReducer';

function Loading() {
    const isLoading = useSelector((state: RootState) => state.userReducer.isLoading);

    return <>{isLoading && <div>Загрузка...</div>}</>;
}

export default Loading;
