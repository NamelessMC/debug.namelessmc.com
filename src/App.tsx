import React from 'react';
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Loader from "./components/includes/Loader";
import Error from "./components/includes/Error";

import useRequest from './hooks/useRequest';
import {DebugData} from "./types/DebugData";
import ConfigSection from "./components/sections/ConfigSection";
import VersionSection from "./components/sections/VersionSection";

function App() {
  const debugId = window.location.pathname.slice(1);

  const [data, loaded, error] = useRequest(`https://bytebin.rkslot.nl/${debugId}`) as [data: DebugData, loaded: boolean, error: any];

  return (
      <div className={`bg-gray-200 dark:bg-gray-900 h-full ${loaded && !error ? '' : 'h-screen'}`}>
          <Header
              loaded={loaded}
              generatedAt={data.generatedAt}
          />

          <div className="container mx-auto pt-8">
              <Loader
                  loaded={loaded}
                  error={error}
              />

              { error &&
                  <Error loaded={loaded} error={error.message} />
              }

              <VersionSection debugData={data} />

              <ConfigSection debugData={data} />
          </div>

          <Footer
              debugId={debugId}
              loaded={loaded}
              generatedByUuid={data.generatedByUuid}
              generatedByName={data.generatedByName}
              namelessMcVersion={data.namelessMc.version}
              theme={'light'}
          />
      </div>
  );
}

export default App;
