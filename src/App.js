import { useState } from 'react';
import './App.css';
import { Toolbar, Settings, DataTable } from './components';
function App() {
  const tableData = [
    'Date',
    'app_id',
    'Requests',
    'Responses',
    'Impressions',
    'Clicks',
    'Revenue',
    'Fill rate',
    'CTR',
  ];

  const [tableColumn, setTableColumn] = useState(tableData);
  const [setting, setSetting] = useState(true);
  return (
    <div className="App">
      <div className="side_line" />
      <div className="main_box">
        <h1 className="heading">Analytics</h1>
        <Toolbar setSetting={setSetting} />
        {setting && (
          <Settings
            setSetting={setSetting}
            setTableColumn={setTableColumn}
            tableColumn={tableColumn}
          />
        )}
        <DataTable tableColumn={tableColumn} />
      </div>
    </div>
  );
}

export default App;
