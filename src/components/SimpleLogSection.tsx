import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import SyntaxHighlighter from "react-syntax-highlighter";
import {atomOneDark, atomOneLight} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
    icon: IconDefinition;
    titleKey: string;
    logs: {
        titleKey: string;
        content: string;
    }[];
}

function SimpleLogSection({
   icon,
   titleKey,
   logs,
}: Props) {

    const { t } = useTranslation();

    const theme = localStorage.getItem('nmc-debug-theme') ?? 'light'

    // would be great to use original github dark theme from vue version, but these are fine for now

    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> { t(titleKey) }
            </div>
            <div className="section-content mx-4 gap-y-4">
                {logs.map((log, idx) => (
                    <div key={idx}>
                        <p className="text-normal text-left pl-4 font-medium">{ t(log.titleKey) }</p>
                        <SyntaxHighlighter className="log-content log" language="accesslog" wrapLongLines={true} style={theme === 'light' ? atomOneLight : atomOneDark}>
                            {log.content.length > 0 ? log.content : t('logs_section.empty_log')}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SimpleLogSection;
