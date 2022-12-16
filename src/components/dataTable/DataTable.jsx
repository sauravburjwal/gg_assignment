import { useSelector } from 'react-redux';
import { FaFilter } from 'react-icons/fa';

import errorImage from '../../img/errorImg.png';
import useSortableData from '../../hooks/useSortableData';
import './dataTable.css';

const DataTable = () => {
  const fetchedData = useSelector((state) => state.fetchData.data);
  const isError = useSelector((state) => state.fetchData.hasError);
  const appName = useSelector((state) => state.fetchData.appName);
  const tableColumn = useSelector((state) => state.tableReducer.colData);
  const { items, requestSort, sortConfig } = useSortableData(fetchedData);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table">
      {!isError ? (
        <table>
          <thead>
            <tr>
              {tableColumn.map((tr, key) => (
                <th
                  key={key}
                  className={`name ${getClassNamesFor(tr.toLowerCase())}`}
                  onClick={() => {
                    requestSort(tr);
                  }}
                >
                  <FaFilter /> <p> {tr === 'app_id' ? 'App' : tr}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items?.map((val, key) => {
              return (
                <tr key={key} className="data">
                  {tableColumn?.map((tr) => {
                    let data = val[tr.toLowerCase()];
                    switch (tr) {
                      case 'app_id':
                        data = appName.filter((id) => data === id.app_id)[0]
                          ?.app_name;
                        break;
                      case 'Fill rate':
                        data =
                          ((val?.requests / val?.responses) * 100)?.toFixed(2) +
                          '%';
                        break;
                      case 'CTR':
                        data =
                          ((val?.clicks / val?.impressions) * 100)?.toFixed(2) +
                          '%';
                        break;
                      case 'Revenue':
                        data = '$' + data?.toFixed(2);
                        break;
                      case 'Date':
                        data = new Date(data)?.toLocaleString('default', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        });
                        break;
                      default:
                        data = data?.toLocaleString();
                    }
                    return <td key={tr}>{data}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <img className="error" src={errorImage} alt="error" />
      )}
    </div>
  );
};

export default DataTable;
