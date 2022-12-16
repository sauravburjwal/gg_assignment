import { SELECT_COLUMN } from '../types';
const initialState = {
  initialTableData: [
    'Date',
    'app_id',
    'Requests',
    'Responses',
    'Impressions',
    'Clicks',
    'Revenue',
    'Fill rate',
    'CTR',
  ],
  colData: [
    'Date',
    'app_id',
    'Requests',
    'Responses',
    'Impressions',
    'Clicks',
    'Revenue',
    'Fill rate',
    'CTR',
  ],
};

export default function selectColoumns(state = initialState, action) {
  switch (action.type) {
    case SELECT_COLUMN:
      return { ...state, colData: action.payload };
    default:
      return state;
  }
}
