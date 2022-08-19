import SimpleSection from "../SimpleSection";
import {SectionContent} from "../../types/SectionContent";
import {DebugData} from "../../types/DebugData";
import {useTranslation} from "react-i18next";
import {asCode, booleanBadge, formatDate} from "../../utils";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

interface Props {
    debugData: DebugData;
}

function VersionSection({
    debugData, // Hook for this?
}: Props) {

    const { t } = useTranslation();

    const content: SectionContent[] = [
        {
            header: t('version_section.version'),
            body: asCode(debugData.namelessMc.version),
        },
        {
            header: t('version_section.update_available'),
            body: booleanBadge(debugData.namelessMc.updateAvailable, true),
        },
        {
            header: t('version_section.last_update_check'),
            body: formatDate(debugData.namelessMc.updateChecked),
        },
    ]

    return (
        <SimpleSection icon={faDownload} title={t('version_section.version')} content={content} />
    )
}

export default VersionSection;
