import './dataTable.css';
import { FaFilter } from 'react-icons/fa';
import { data, appName } from './dummyData.js';

const DataTable = ({ tableColumn }) => {
  return (
    <div className="table">
      <table>
        <tr>
          {tableColumn.map((tr, key) => (
            <th key={key} className="name">
              <FaFilter /> <p>{tr === 'app_id' ? 'App' : tr}</p>
            </th>
          ))}
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key} className="data">
              {tableColumn.map((tr) => {
                let data = val[tr.toLowerCase()];
                if (tr === 'app_id') {
                  data = appName.filter((id) => data === id.app_id)[0].app_name;
                } else if (tr === 'Fill rate')
                  data =
                    ((val.requests / val.responses) * 100).toFixed(2) + '%';
                else if (tr === 'CTR')
                  data =
                    ((val.clicks / val.impressions) * 100).toFixed(2) + '%';
                else if (tr === 'Revenue') data = '$' + data.toFixed(2);
                if (tr === 'Date') {
                  data =
                    new Date(data).toLocaleString('default', {
                      day: '2-digit',
                    }) +
                    ' ' +
                    new Date(data).toLocaleString('default', {
                      month: 'long',
                    }) +
                    ' ' +
                    new Date(data).toLocaleString('default', {
                      year: 'numeric',
                    });
                } else {
                  data = data.toLocaleString();
                }
                return <td key={tr}>{data}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default DataTable;
