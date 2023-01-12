import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import githubDarkDimmed from '../../theme/github-dark-dimmed';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import DebugDataContext from '../../contexts/DebugDataContext';

function LogsSection(): JSX.Element {
    const { t } = useTranslation();
    const debugData = useContext(DebugDataContext);

    const theme = localStorage.getItem('nmc-debug-theme') ?? 'light';

    const logs = [
        {
            titleKey: 'logs_section.fatal_log',
            content: debugData.logs.fatal,
        },
        {
            titleKey: 'logs_section.warning_log',
            content: debugData.logs.warning,
        },
        {
            titleKey: 'logs_section.notice_log',
            content: debugData.logs.notice,
        },
        {
            titleKey: 'logs_section.other_log',
            content: debugData.logs.other,
        },
        {
            titleKey: 'logs_section.custom_log',
            content: debugData.logs.custom,
        },
    ];

    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={faFilePen} /> {t('logs_section.logs')}
            </div>
            <div className="section-content mx-4 gap-y-4">
                {logs.map((log, idx) => (
                    <div className="overflow-clip" key={idx}>
                        <p className="text-normal text-left font-medium">{t(log.titleKey as any)}</p>
                        <SyntaxHighlighter className="log-content" language="accesslog" wrapLongLines={true} style={theme === 'light' ? githubGist : githubDarkDimmed as any}>
                            {log.content.length > 0 ? log.content : t('logs_section.empty_log')}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LogsSection;
