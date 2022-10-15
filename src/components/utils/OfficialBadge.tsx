import {useTranslation} from "react-i18next";

function OfficialBadge() {

    const { t } = useTranslation();

    return <span className="rounded-md text-white bg-blue-500 px-2 py-1 text-xs ml-1">{ t('misc.official') }</span>
}

export default OfficialBadge;
