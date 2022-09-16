interface Props {
    value: string,
    escape?: boolean,
}

function Code({
    value,
    escape = false,
}: Props) {

    if (escape) {
        value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    return <span className="text-sm text-black text-normal font-normal font-mono">{ value }</span>
}

export default Code;
