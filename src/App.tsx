import React from 'react';
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Loader from "./components/includes/Loader";
import Error from "./components/includes/Error";

import useRequest from './hooks/useRequest';
import {DebugData} from "./types/DebugData";
import ConfigSection from "./components/sections/ConfigSection";
import VersionSection from "./components/sections/VersionSection";
import SettingsSection from "./components/sections/SettingsSection";
import EnvironmentSection from "./components/sections/EnvironmentSection";

function App() {
  const debugId = window.location.pathname.slice(1);
  const [data, loaded, error] = useRequest(`https://bytebin.rkslot.nl/${debugId}`) as [data: DebugData, loaded: boolean, error: any];

  return (
      <div className={`bg-gray-200 dark:bg-gray-900 h-full ${loaded && !error ? '' : 'h-screen'}`}>
          <Header
              loaded={loaded}
              generatedAt={data ? data.generatedAt : 0}
          />

          <div className="container mx-auto pt-8">
              <Loader
                  loaded={loaded}
                  error={error}
              />

              { error &&
                  <Error loaded={loaded} error={error.message} />
              }

              { loaded && !error && (
                <>
                  <VersionSection debugData={data} />
                
                </>
              )}

              {/* <SettingsSection debugData={data} /> */}

              {/* <ConfigSection debugData={data} /> */}

              {/* <EnvironmentSection debugData={data} /> */}
          </div>

          {data && (
              <Footer
              debugId={debugId}
              loaded={loaded}
              generatedByUuid={data.generated_by_uuid}
              generatedByName={data.generated_by_name}
              namelessMcVersion={data.namelessmc.version}
              theme={'light'}
          />
        )}
      </div>
  );
}

export default App;
