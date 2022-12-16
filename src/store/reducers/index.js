import fetchData from './fetchData';
import tableReducer from './tableReducer';
import toggleSettings from './settingsReducer';
import { combineReducers } from 'redux';

export default combineReducers({ fetchData, tableReducer, toggleSettings });
