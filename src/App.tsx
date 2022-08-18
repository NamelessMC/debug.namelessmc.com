import React from 'react';
import Header from './components/includes/Header';
import Loader from "./components/includes/Loader";

function App() {
  const loaded = true;

  return (
      <div className={`bg-gray-200 dark:bg-gray-900 h-full ${loaded ? '' : 'h-screen'}`}>
            <Header
                loaded={loaded}
                publicPath="https://namelessmc.com/assets/"
                generatedAt={1589788800}
            />

            <div className="container mx-auto pt-8">

                <Loader loaded={} error={} />
            </div>
      </div>
  );
}

export default App;
