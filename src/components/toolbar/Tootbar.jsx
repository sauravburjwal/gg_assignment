import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../actions';
import './toolbar.css';
const Tootbar = ({ setSetting }) => {
  const myState = useSelector((state) => state.fetchData);
  const dispatch = useDispatch();
  const handleSettingClick = () => {
    setSetting((prev) => !prev);
  };
  console.log(myState);
  return (
    <div className="toolbar">
      <button className="btn_toolbar btn" onClick={() => dispatch(fetchData)}>
        <FaCalendarAlt className="icon" /> <span>July 08 - July 14, 2021</span>
      </button>
      <button onClick={handleSettingClick} className="btn_toolbar btn">
        <VscSettings className="icon" /> Settings
      </button>
    </div>
  );
};

export default Tootbar;
