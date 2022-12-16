import { FETCH_DATA, FETCH_APP_NAME, SET_ERROR } from '../types';
const initialState = { data: [], appName: [], hasError: false };

export default function fetchData(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, data: action.payload };
    case FETCH_APP_NAME:
      return { ...state, appName: action.payload };
    case SET_ERROR:
      return { ...state, hasError: action.payload };
    default:
      return state;
  }
}
