interface Props {
    value: string,
    escape?: boolean,
    textSize?: string,
    fontColor?: string,
}

function Code({
    value,
    escape = false,
    textSize = "text-sm",
    fontColor = "text-black",
}: Props) {

    if (escape) {
        value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    return <span className={`${textSize} ${fontColor} text-normal font-normal font-mono`}>{ value }</span>
}

export default Code;
