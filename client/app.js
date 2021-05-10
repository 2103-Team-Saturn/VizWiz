import React from 'react';

import Navbar from './components/navbar';
import Routes from './routes';
import LineGraph from './components/LineGraph';
import EditChart from './components/EditChart';
import PieGraph from './components/PieGraph';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <EditChart /> */}
      <Routes />
    </div>
  );
};

export default App;
