import { useTranslation } from 'react-i18next';

interface Props {
    value: boolean
    inverted?: boolean
}

function BooleanBadge({
    value,
    inverted = false,
}: Props): JSX.Element {
    const { t } = useTranslation();

    const yesClassName = inverted
        ? 'text-yellow-600'
        : 'text-green-600';

    const noClassName = inverted
        ? 'text-green-600'
        : 'text-yellow-600';

    return <span className={'font-bold text-base ' + (value ? yesClassName : noClassName)}>{ value ? t('misc.yes') : t('misc.no') }</span>;
}

export default BooleanBadge;
