import axios from 'axios';

const initialState = [];

const fetchData = async (state = initialState, action) => {
  let data = state;
  if (action.type === 'FETCH_DATA') {
    data = await axios.get(
      'http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03',
    );
    return data.data.data;
  }
};

export default fetchData;
