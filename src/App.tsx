import React from 'react';
import Header from './components/includes/Header';
import Loader from "./components/includes/Loader";
import Error from "./components/includes/Error";

import useRequest from './hooks/useRequest';

function App() {
  const debugId = window.location.pathname.slice(1);

  const [data, loaded, err] = useRequest(`https://bytebin.rkslot.nl/${debugId}`) as [data: any, loaded: boolean, err: any];

  return (
      <div className={`bg-gray-200 dark:bg-gray-900 h-full ${loaded && !err ? '' : 'h-screen'}`}>
            <Header
                loaded={loaded}
                publicPath="/"
                generatedAt={1589788800}
            />

            <div className="container mx-auto pt-8">
                <Loader loaded={loaded} error={err} />
                { err && <Error loaded={loaded} error={err.message} /> }
            </div>
      </div>
  );
}

export default App;
