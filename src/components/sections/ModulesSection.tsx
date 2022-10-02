import {DebugData} from "../../types/DebugData";
import FloatingSection, {FloatingContent} from "../FloatingSection";
import {faPuzzlePiece} from "@fortawesome/free-solid-svg-icons";

interface Props {
    debugData: DebugData;
}

function ModulesSection({
    debugData
}: Props) {

    const moduleFloatingContent = {
        extensionFloaters: Object.values(debugData.namelessmc.modules).map(module => {
            return {
                id: module.name,
                name: module.name,
                type: 'module',
                enabled: module.enabled,
                author: module.author,
                namelessMcVersion: module.namelessmc_version,
                version: module.module_version,
                debugInfo: module.debug_info,
            }
        }),
    } as FloatingContent;

    return (
        <FloatingSection icon={faPuzzlePiece} titleKey={'modules_section.modules'} floatingContent={[moduleFloatingContent]}/>
    )
}

export default ModulesSection;
