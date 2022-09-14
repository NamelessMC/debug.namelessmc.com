import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import Highlight from "react-highlight";

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

    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> { t(titleKey) }
            </div>
            <div className="section-content mx-4 gap-y-4">
                {logs.map((log, idx) => (
                    <>
                        <p className="text-normal text-left pl-4 font-medium">{ t(log.titleKey) }</p>
                        <Highlight className='log-content log'>{log.content.length > 0 ? log.content : t('logs_section.empty_log')}</Highlight>
                    </>
                ))}
            </div>
        </div>
    );
}

export default SimpleLogSection;
