import SimpleSection from "../SimpleSection";
import {SectionContent} from "../../types/SectionContent";
import {DebugData} from "../../types/DebugData";
import {useTranslation} from "react-i18next";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import Empty from "../utils/Empty";
import BooleanBadge from "../utils/BooleanBadge";

interface Props {
    debugData: DebugData;
}

function ConfigSection({
    debugData,
}: Props) {

    const { t } = useTranslation();

    const content: SectionContent[] = [
        {
            header: t('config_section.path'),
            body: <Empty value={debugData.namelessmc.config.core.path} asCode={true} />,
        },
        {
            header: t('config_section.friendly_urls'),
            body: <BooleanBadge value={debugData.namelessmc.config.core.friendly} />,
        },
        {
            header: t('config_section.force_https'),
            body: <BooleanBadge value={debugData.namelessmc.config.core.force_https} />,
        },
        {
            header: t('config_section.force_www'),
            body: <BooleanBadge value={debugData.namelessmc.config.core.force_www} />,
        },
        {
            header: t('config_section.trusted_proxies'),
            body: <Empty value={debugData.namelessmc.settings.trusted_proxies} asCode={true} />,
        }
    ]

    return (
        <SimpleSection icon={faWrench} titleKey={'config_section.config'} content={content} gridCols={5} />
    )
}

export default ConfigSection;
