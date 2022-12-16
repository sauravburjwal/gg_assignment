import { useSelector } from 'react-redux';

import { Toolbar, Settings, DataTable } from './components';
import './App.css';

function App() {
  const showSettings = useSelector((state) => state.toggleSettings.showSetting);

  return (
    <div className="App">
      <div className="side_line" />
      <div className="main_box">
        <h1 className="heading">Analytics</h1>
        <Toolbar />
        {showSettings && <Settings />}
        <DataTable />
      </div>
    </div>
  );
}

export default App;
