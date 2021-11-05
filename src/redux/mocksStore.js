import configureMockStore from 'redux-mock-store';

export const mockStore = (state = {}) => configureMockStore([])(state);
