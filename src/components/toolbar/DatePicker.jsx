import React, { useState, forwardRef, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

import { formatDate } from './dateUtil';

const DatePicker = ({ handleClick }) => {
  const [startDate, setStartDate] = useState(new Date('2021-05-01'));
  const [endDate, setEndDate] = useState(new Date('2021-05-11'));

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const startD = formatDate(startDate);
    const endD = formatDate(endDate);

    handleClick(startD, endD);
    // eslint-disable-next-line
  }, []);

  const handleCalendarClose = () => {
    const startD = formatDate(startDate);
    const endD = formatDate(endDate);
    handleClick(startD, endD);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    const dates = value.split('-');
    const startDate = new Date(dates[0]).toLocaleDateString('en-us', {
      day: '2-digit',
      month: 'long',
    });

    const endDate = new Date(dates[1]).toLocaleDateString('en-us', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return (
      <button className="btn_toolbar btn" onClick={onClick}>
        <FaCalendarAlt className="icon" />{' '}
        <span>
          {startDate} - {endDate}
        </span>
      </button>
    );
  });

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      onCalendarClose={handleCalendarClose}
      startDate={startDate}
      endDate={endDate}
      customInput={<CustomInput />}
      selectsRange
    />
  );
};

export default DatePicker;
