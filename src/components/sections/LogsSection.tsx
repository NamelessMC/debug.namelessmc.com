import {DebugData} from "../../types/DebugData";
import {faFilePen} from "@fortawesome/free-solid-svg-icons";
import SimpleLogSection from "../SimpleLogSection";


interface Props {
    debugData: DebugData;
}

function LogsSection({
    debugData, // Hook for this?
}: Props) {

    const logs = [
        {
            titleKey: 'logs_section.fatal_log',
            content: debugData.logs.fatal       
        },
        {
            titleKey: 'logs_section.warning_log',
            content: debugData.logs.warning
        },
        {
            titleKey: 'logs_section.notice_log',
            content: debugData.logs.notice
        },
        {
            titleKey: 'logs_section.other_log',
            content: debugData.logs.other
        },
        {
            titleKey: 'logs_section.custom_log',
            content: debugData.logs.custom
        }
    ]

    return (
        <SimpleLogSection icon={faFilePen} titleKey={'logs_section.logs'} logs={logs} />
    )
}

export default LogsSection;
