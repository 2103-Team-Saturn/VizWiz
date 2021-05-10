import React from 'react';

import Navbar from './components/navbar';
import Routes from './routes';
import LineGraph from './components/graphCharts/LineGraph';
import PieGraph from './components/graphCharts/PieGraph';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
