import SimpleSection from '../SimpleSection';
import type { SectionContent } from '../../types/SectionContent';
import { useTranslation } from 'react-i18next';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import BooleanBadge from '../utils/BooleanBadge';
import BooleanValue from '../utils/BooleanValue';
import Code from '../utils/Code';
import { humanFileSize } from '../../utils';
import { useContext } from 'react';
import DebugDataContext from '../../contexts/DebugDataContext';

function EnvironmentSection(): JSX.Element {
    const { t } = useTranslation();
    const debugData = useContext(DebugDataContext);

    const content: SectionContent[] = [
        {
            header: t('environment_section.php_version'),
            body: <Code value={debugData.environment.php_version} />,
        },
        {
            header: t('environment_section.host_os'),
            body: debugData.environment.host_os,
        },
        {
            header: t('environment_section.host_kernel_version'),
            body: <Code value={debugData.environment.host_kernel_version} />,
        },
        {
            header: t('environment_section.using_docker_image'),
            body: <BooleanValue value={debugData.environment.official_docker_image} />,
        },
        {
            header: t('environment_section.disk_usage'),
            body: humanFileSize(debugData.environment.disk_total_space - debugData.environment.disk_free_space) + ' / ' + humanFileSize(debugData.environment.disk_total_space),
        },
        {
            header: t('environment_section.ram_usage'),
            body: humanFileSize(debugData.environment.memory_used_space) + ' / ' + debugData.environment.memory_total_space,
        },
        {
            header: t('environment_section.config_writable'),
            body: <BooleanBadge value={debugData.environment.config_writable} />,
        },
        {
            header: t('environment_section.cache_writable'),
            body: <BooleanBadge value={debugData.environment.cache_writable} />,
        },
    ];

    return (
        <SimpleSection icon={faServer} titleKey={'environment_section.environment'} content={content} gridCols={4} />
    );
}

export default EnvironmentSection;
