import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoSettings } from 'react-icons/go';

import DatePicker from './DatePicker';
import { fetchData, toggleSettings, fetchAppName } from '../../store/actions';
import './toolbar.css';

const Toolbar = () => {
  const dispatch = useDispatch();
  const showSettings = useSelector((state) => state.toggleSettings.showSetting);

  const handleSettingClick = () => {
    dispatch(toggleSettings(!showSettings));
  };

  const handleClick = (startD, endD) => {
    dispatch(fetchData(startD, endD));
    dispatch(fetchAppName());
  };

  return (
    <div className="toolbar">
      <DatePicker handleClick={handleClick} />
      <button onClick={handleSettingClick} className="btn_toolbar btn">
        <GoSettings className="icon" /> Settings
      </button>
    </div>
  );
};

export default Toolbar;
