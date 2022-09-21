import {useTranslation} from "react-i18next";

interface Props {
    value: boolean,
    inverted?: boolean,
    textSize?: string,
}

function BooleanBadge({
    value,
    inverted = false,
    textSize = "text-base",
}: Props) {

    const { t } = useTranslation();

    const yesClassName = inverted
        ? 'text-yellow-600'
        : 'text-green-600';

    const noClassName = inverted
        ? 'text-green-600'
        : 'text-yellow-600';

    return <span className={`font-bold ${textSize} ` + (value ? yesClassName : noClassName)}>{ value ? t('misc.yes') : t('misc.no') }</span>
}

export default BooleanBadge;
