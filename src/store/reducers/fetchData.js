import { FETCH_DATA, FETCH_APP_NAME } from '../types';
const initialState = { data: [], appName: [], loading: true };

export default function fetchData(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, data: action.payload, loading: false };
    case FETCH_APP_NAME:
      return { ...state, appName: action.payload, loading: false };
    default:
      return state;
  }
}
