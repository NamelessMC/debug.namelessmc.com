interface Props {
    value: string,
}

function Code({
    value,
}: Props) {

    return <span className="text-sm text-black text-normal font-normal font-mono">{ value }</span>
}

export default Code;
