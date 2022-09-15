import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import OAuthProvidersSection from "./components/sections/OAuthProvidersSection";
import GroupsSection from "./components/sections/GroupsSection";
import GroupSyncSection from "./components/sections/GroupSyncSection";
import IntegrationsSection from "./components/sections/IntegrationsSection";
import WebhooksSection from "./components/sections/WebhooksSection";
import ModulesSection from "./components/sections/ModulesSection";
import TemplatesSection from './components/sections/TemplatesSection';
import PanelTemplatesSection from './components/sections/PanelTemplatesSection';
import LogsSection from './components/sections/LogsSection';

function App() {
  const { t, i18n } = useTranslation();
  const debugId = window.location.pathname.slice(1);
  const [data, loaded, error] = useRequest(`https://bytebin.rkslot.nl/${debugId}`) as [data: DebugData, loaded: boolean, error: any];
  const [theme, setTheme] = useState<"dark" | "light">('light');

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const theme = localStorage.getItem('nmc-debug-theme') ?? 'light' as "dark" | "light";
    console.log(theme);
    setTheme(theme as any);

    const preferredLanguage = localStorage.getItem('nmc-debug-locale') ?? "en";
    i18n.changeLanguage(preferredLanguage);

  }, [])

  return (
      <div className={`bg-gray-200 dark:bg-gray-900 h-full ${loaded && !error ? '' : 'h-screen'}`}>
          <Header
              loaded={loaded}
              generatedAt={data ? data.generated_at : 0}
          />

          <div className="container mx-auto pt-8">
              <Loader
                  loaded={loaded}
                  error={error}
              />

              { error && error.name === "TypeError" && debugId.length === 0 && (<Error error={ t('errors.no_id_provided') } />) }
              { error && debugId.length && (<Error error={ t('errors.invalid_link_id') } />) }

              { loaded && !error && data && (
                <>
                  <VersionSection debugData={data} />
                  <SettingsSection debugData={data} />
                  <ConfigSection debugData={data} />
                  <ModulesSection debugData={data} />
                  <GroupsSection debugData={data} />
                  <GroupSyncSection debugData={data} />
                  <IntegrationsSection debugData={data} />
                  <WebhooksSection debugData={data} />
                  <OAuthProvidersSection debugData={data} />
                  <div className='md:grid grid-cols-2 gap-4'>
                    <TemplatesSection debugData={data} />
                    <PanelTemplatesSection debugData={data} />
                  </div>
                  <LogsSection debugData={data} />
                  <EnvironmentSection debugData={data} />
                </>
              )}
          </div>

          {data && (
              <Footer
              debugId={debugId}
              loaded={loaded}
              generatedByUuid={data.generated_by_uuid}
              generatedByName={data.generated_by_name}
              namelessMcVersion={data.namelessmc.version}
              theme={theme}
              setTheme={setTheme}
          />
        )}
      </div>
  );
}

export default App;
