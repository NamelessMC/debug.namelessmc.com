import SimpleSection from "../SimpleSection";
import {SectionContent} from "../../types/SectionContent";
import {useTranslation} from "react-i18next";
import {formatDate} from "../../utils";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import BooleanBadge from "../utils/BooleanBadge";
import Code from "../utils/Code";
import {useContext} from "react";
import DebugDataContext from "../../contexts/DebugDataContext";

function VersionSection() {

    const { t } = useTranslation();
    const debugData = useContext(DebugDataContext);

    const content: SectionContent[] = [
        {
            header: t('version_section.version'),
            body: <Code value={debugData.namelessmc.version} />,
        },
        {
            header: t('version_section.update_available'),
            body: <BooleanBadge value={debugData.namelessmc.update_available} inverted={true} />,
        },
        {
            header: t('version_section.last_update_check'),
            body: formatDate(debugData.namelessmc.update_checked),
        },
    ]

    return (
        <SimpleSection icon={faDownload} titleKey={'version_section.version'} content={content} />
    )
}

export default VersionSection;
