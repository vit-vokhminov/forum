import React from 'react';
import { useSelector } from 'react-redux';

function IsLoading() {
    const isLoading = useSelector((state) => state.userReducer.isLoading);

    return <>{isLoading && <div>Загрузка...</div>}</>;
}

export default IsLoading;
