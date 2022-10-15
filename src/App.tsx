import { useEffect, useState } from 'react';
import Header from './components/includes/Header';
import Footer from './components/includes/Footer';
import Loader from './components/includes/Loader';
import Error from './components/includes/Error';

import useRequest from './hooks/useRequest';
import ConfigSection from './components/sections/ConfigSection';
import VersionSection from './components/sections/VersionSection';
import SettingsSection from './components/sections/SettingsSection';
import EnvironmentSection from './components/sections/EnvironmentSection';
import { useTranslation } from 'react-i18next';
import OAuthProvidersSection from './components/sections/OAuthProvidersSection';
import GroupsSection from './components/sections/GroupsSection';
import GroupSyncSection from './components/sections/GroupSyncSection';
import IntegrationsSection from './components/sections/IntegrationsSection';
import WebhooksSection from './components/sections/WebhooksSection';
import ModulesSection from './components/sections/ModulesSection';
import TemplatesSection from './components/sections/TemplatesSection';
import PanelTemplatesSection from './components/sections/PanelTemplatesSection';
import LogsSection from './components/sections/LogsSection';

import { DebugDataProvider } from './contexts/DebugDataContext';

function App(): JSX.Element {
    const { t, i18n } = useTranslation();
    const debugId = window.location.pathname.slice(1);
    const [data, loaded, error] = useRequest(`https://bytebin.rkslot.nl/${debugId}`);
    const [theme, setTheme] = useState<'dark' | 'light'>('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const theme = localStorage.getItem('nmc-debug-theme') ?? 'light';
        setTheme(theme as 'light' | 'dark');

        const preferredLanguage = localStorage.getItem('nmc-debug-locale') ?? 'en';
        i18n.changeLanguage(preferredLanguage);
    }, [i18n]);

    const shouldDisplayTemplateSectionsSideBySide = (): boolean => {
        return Object.entries(data.namelessmc.templates.front_end).length === 1 &&
        Object.entries(data.namelessmc.templates.panel).length === 1;
    };

    return (
        <DebugDataProvider value={data}>
            <div className={`bg-gray-200 dark:bg-gray-900 h-full ${loaded && !error ? '' : 'h-screen'}`}>
                <Header
                    loaded={loaded}
                    generatedAt={data ? data.generated_at : 0}
                />

                <div className="container mx-auto pt-8">
                    { !loaded && !error && <Loader /> }

                    { error && <Error error={
                        debugId.length === 0
                            ? t('errors.no_id_provided')
                            : t('errors.invalid_link_id')
                    } /> }

                    { loaded && !error && <>
                        <VersionSection />
                        <SettingsSection />
                        <ConfigSection />
                        <ModulesSection />
                        <GroupsSection />
                        <GroupSyncSection />
                        <IntegrationsSection />
                        <WebhooksSection />
                        <OAuthProvidersSection />
                        <div className={
                            shouldDisplayTemplateSectionsSideBySide()
                                ? 'grid gap-4 grid-cols-2'
                                : ''
                        }>
                            <TemplatesSection />
                            <PanelTemplatesSection />
                        </div>
                        <LogsSection />
                        <EnvironmentSection />
                    </>}
                </div>

                {data && loaded && (
                    <Footer
                        debugId={debugId}
                        generatedByUuid={data.generated_by_uuid}
                        generatedByName={data.generated_by_name}
                        namelessMcVersion={data.namelessmc.version}
                        theme={theme}
                        setTheme={setTheme}
                    />
                )}
            </div>
        </DebugDataProvider>
    );
}

export default App;
