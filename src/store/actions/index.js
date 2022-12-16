import axios from 'axios';
import {
  FETCH_DATA,
  TOGGLE_SETTINGS,
  SELECT_COLUMN,
  FETCH_APP_NAME,
  SET_ERROR,
} from '../types';

export const fetchData = (startD, endD) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://go-dev.greedygame.com/v3/dummy/report?startDate=${startD}&endDate=${endD}`,
    );
    dispatch({ type: FETCH_DATA, payload: res.data.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: true });
  }
};

export const fetchAppName = () => async (dispatch) => {
  try {
    const res = await axios.get('https://go-dev.greedygame.com/v3/dummy/apps');
    dispatch({ type: FETCH_APP_NAME, payload: res.data.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: true });
  }
};

export const toggleSettings = (setting) => {
  return {
    type: TOGGLE_SETTINGS,
    payload: setting,
  };
};

export const selectColoumns = (cols) => {
  return { type: SELECT_COLUMN, payload: cols };
};
