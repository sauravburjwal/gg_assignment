import { TOGGLE_SETTINGS } from '../types';
const initialState = {
  showSetting: true,
};

export default function toggleSettings(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return { ...state, showSetting: action.payload };
    default:
      return state;
  }
}
