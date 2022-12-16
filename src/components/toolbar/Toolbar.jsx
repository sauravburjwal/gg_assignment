import React from 'react';
import { VscSettings } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
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
      {/* <button className="btn_toolbar btn" onClick={handleClick}>
        <FaCalendarAlt className="icon" /> <span>July 08 - July 14, 2021</span>
      </button> */}
      <DatePicker handleClick={handleClick} />
      <button onClick={handleSettingClick} className="btn_toolbar btn">
        <VscSettings className="icon" /> Settings
      </button>
    </div>
  );
};

export default Toolbar;
