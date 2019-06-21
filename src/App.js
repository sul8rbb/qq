import React from 'react';
import './App.css';
import Routes from './routes';
import AppRoute from './routes/AppRoute'
import './common/js/rem'

function App() {
  return (
    <div className="mains">
      <Routes routes={AppRoute} />
    </div>
  );
}

export default App;
