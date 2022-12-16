import './dataTable.css';
import { FaFilter } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (k) => {
    let key = k.toLowerCase();
    if (k === 'App') {
      key = 'app_id';
    }
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const DataTable = () => {
  const fetchedData = useSelector((state) => state.fetchData.data);
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
                {tableColumn.map((tr) => {
                  let data = val[tr.toLowerCase()];
                  if (tr === 'app_id') {
                    data = appName.filter((id) => data === id.app_id)[0]
                      .app_name;
                  } else if (tr === 'Fill rate')
                    data =
                      ((val?.requests / val?.responses) * 100)?.toFixed(2) +
                      '%';
                  else if (tr === 'CTR')
                    data =
                      ((val?.clicks / val?.impressions) * 100)?.toFixed(2) +
                      '%';
                  else if (tr === 'Revenue') data = '$' + data.toFixed(2);
                  if (tr === 'Date') {
                    data = new Date(data).toLocaleString('default', {
                      day: '2-digit',
                      month: 'long',
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
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
