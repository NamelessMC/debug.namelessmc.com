import { useTranslation } from 'react-i18next';

interface Props {
    value: boolean
}

function BooleanValue({
    value,
}: Props): JSX.Element {
    const { t } = useTranslation();

    return <span className="text-base text-normal font-normal">{ value ? t('misc.yes') : t('misc.no') }</span>;
}

export default BooleanValue;
