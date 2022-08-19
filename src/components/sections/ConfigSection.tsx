import SimpleSection from "../SimpleSection";
import {SectionContent} from "../../types/SectionContent";
import {DebugData} from "../../types/DebugData";
import {useTranslation} from "react-i18next";
import {booleanBadge, isEmpty} from "../../utils";
import {faWrench} from "@fortawesome/free-solid-svg-icons";

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
            body: isEmpty(debugData.namelessMc.config.core.path, true),
        },
        {
            header: t('config_section.friendly_urls'),
            body: booleanBadge(debugData.namelessMc.config.core.friendly),
        },
        {
            header: t('config_section.force_https'),
            body: booleanBadge(debugData.namelessMc.config.core.forceHttps),
        },
        {
            header: t('config_section.force_www'),
            body: booleanBadge(debugData.namelessMc.config.core.forceWww),
        },
        {
            header: t('config_section.trusted_proxies'),
            body: isEmpty(debugData.namelessMc.settings.trustedProxies, true),
        }
    ]

    return (
        <SimpleSection icon={faWrench} titleKey={'config_section.config'} content={content} />
    )
}

export default ConfigSection;
