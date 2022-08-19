import SimpleSection from "../SimpleSection";
import {SectionContent} from "../../types/SectionContent";
import {DebugData} from "../../types/DebugData";
import {useTranslation} from "react-i18next";
import {asCode, booleanBadge, booleanValue} from "../../utils";
import {faServer} from "@fortawesome/free-solid-svg-icons";

interface Props {
    debugData: DebugData;
}

function EnvironmentSection({
    debugData, // Hook for this?
}: Props) {

    const { t } = useTranslation();

    const humanFileSize = (bytes: number) => {
        if (bytes === 0) {
            return '0 B';
        }
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const content: SectionContent[] = [
        {
            header: t('environment_section.php_version'),
            body: asCode(debugData.environment.phpVersion),
        },
        {
            header: t('environment_section.host_os'),
            body: debugData.environment.hostOs,
        },
        {
            header: t('environment_section.host_kernel_version'),
            body: asCode(debugData.environment.hostKernelVersion),
        },
        {
            header: t('environment_section.using_docker_image'),
            body: booleanValue(debugData.environment.officialDockerImage),
        },
        {
            header: t('environment_section.disk_usage'),
            body: humanFileSize(debugData.environment.diskTotalSpace - debugData.environment.diskFreeSpace) + ' / ' + humanFileSize(debugData.environment.diskTotalSpace),
        },
        {
            header: t('environment_section.ram_usage'),
            body: humanFileSize(debugData.environment.memoryUsedSpace) + ' / ' + debugData.environment.memoryTotalSpace
        },
        {
            header: t('environment_section.config_writable'),
            body: booleanBadge(debugData.environment.configWritable),
        },
        {
            header: t('environment_section.cache_writable'),
            body: booleanBadge(debugData.environment.cacheWritable),
        }
    ]

    return (
        <SimpleSection icon={faServer} titleKey={'environment_section.environment'} content={content} />
    )
}

export default EnvironmentSection;
