import React from 'react';
import { useSelector } from 'react-redux';

function Loading() {
    const isLoading = useSelector((state) => state.userReducer.isLoading);

    return <>{isLoading && <div>Загрузка...</div>}</>;
}

export default Loading;
