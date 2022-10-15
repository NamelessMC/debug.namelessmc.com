import FloatingSection, {FloatingContent} from "../FloatingSection";
import {faPuzzlePiece} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import DebugDataContext from "../../contexts/DebugDataContext";

function ModulesSection() {

    const debugData = useContext(DebugDataContext);

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
