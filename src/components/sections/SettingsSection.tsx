import SimpleSection from "../SimpleSection";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import {SectionContent} from "../../types/SectionContent";
import {useTranslation} from "react-i18next";
import {DebugData} from "../../types/DebugData";
import {booleanBadge, capitalize} from "../../utils";

interface Props {
    debugData: DebugData;
}

function SettingsSection({
    debugData,
}: Props) {

    const { t } = useTranslation();

    const content: SectionContent[] = [
        {
            header: t('settings_section.phpmailer_enabled'),
            body: booleanBadge(debugData.namelessMc.settings.phpMailer),
        },
        {
            header: t('settings_section.api_enabled'),
            body: booleanBadge(debugData.namelessMc.settings.apiEnabled),
        },
        {
            header: t('settings_section.email_verification_enabled'),
            body: booleanBadge(debugData.namelessMc.settings.emailVerification),
        },
        {
            header: t('settings_section.login_method'),
            body: capitalize(debugData.namelessMc.settings.loginMethod),
        },
        {
            header: t('settings_section.captcha_type'),
            body: capitalize(debugData.namelessMc.settings.captchaType),
        },
        {
            header: t('settings_section.captcha_login_page'),
            body: booleanBadge(debugData.namelessMc.settings.captchaLogin),
        }
    ];

    return (
        <SimpleSection icon={faCogs} titleKey={'settings_section.settings'} content={content}/>
    )
}

export default SettingsSection;
