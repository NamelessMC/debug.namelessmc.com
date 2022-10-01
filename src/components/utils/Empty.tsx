import {useTranslation} from "react-i18next";
import Code from "./Code";

interface Props {
    value: string | Array<any>,
    asCode?: boolean,
}

function Empty({
    value,
    asCode = false
}: Props) {

    const { t } = useTranslation();

    if (!value || (Array.isArray(value) && value.length === 0)) {
        return <i className="font-normal text-base text-normal">{ t('misc.empty') }</i>
    }

    if (asCode) {
        return <Code value={Array.isArray(value) ? value.join(', ') : value} />
    }

    return <span className="font-normal text-base text-normal">{ value }</span>
}

export default Empty;
