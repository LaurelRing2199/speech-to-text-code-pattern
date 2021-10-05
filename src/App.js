import React from 'react';
import Header from './components/Header';
import ServiceContainer from './components/ServiceContainer';
import useScript from './hooks/useScript';

const HEADER_TITLE = 'Watson Speech to Text demo';
const HEADER_DESCRIPTION =
  'Use for checkride';

export const App = () => {
  useScript(
    'https://cdn.jsdelivr.net/gh/watson-developer-cloud/watson-developer-cloud.github.io@master/analytics.js',
  );

  return (
    <div className="app-container">
      <Header
        description={HEADER_DESCRIPTION}
        title={HEADER_TITLE}
      />
      <ServiceContainer />
    </div>
  );
};

export default App;
