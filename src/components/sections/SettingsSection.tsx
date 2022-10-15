import SimpleSection from '../SimpleSection';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { SectionContent } from '../../types/SectionContent';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../utils';
import BooleanBadge from '../utils/BooleanBadge';
import { useContext } from 'react';
import DebugDataContext from '../../contexts/DebugDataContext';

function SettingsSection(): JSX.Element {
    const debugData = useContext(DebugDataContext);

    const { t } = useTranslation();

    const content: SectionContent[] = [
        {
            header: t('settings_section.phpmailer_enabled'),
            body: <BooleanBadge value={debugData.namelessmc.settings.phpmailer} />,
        },
        {
            header: t('settings_section.api_enabled'),
            body: <BooleanBadge value={debugData.namelessmc.settings.api_enabled} />,
        },
        {
            header: t('settings_section.email_verification_enabled'),
            body: <BooleanBadge value={debugData.namelessmc.settings.email_verification} />,
        },
        {
            header: t('settings_section.login_method'),
            body: capitalize(debugData.namelessmc.settings.login_method),
        },
        {
            header: t('settings_section.captcha_type'),
            body: capitalize(debugData.namelessmc.settings.captcha_type),
        },
        {
            header: t('settings_section.captcha_login_page'),
            body: <BooleanBadge value={debugData.namelessmc.settings.captcha_login} />,
        },
    ];

    return (
        <SimpleSection icon={faCogs} titleKey={'settings_section.settings'} content={content}/>
    );
}

export default SettingsSection;
