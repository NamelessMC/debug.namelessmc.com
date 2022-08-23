import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { DebugData } from "../../types/DebugData";
import { ExtensionFloaterProps } from "../ExtensionFloater";
import FloatingSection, { FloatingContent } from "../FloatingSection";

interface Props {
    debugData: DebugData;
}

function TemplatesSection({
    debugData
}: Props) {

    const templatesFloatingExtensionContent: ExtensionFloaterProps[] = Object.keys(debugData.namelessmc.templates.front_end).map((template: any) => (
        {
            name: debugData.namelessmc.templates.front_end[template].name,
            type: 'template',
            enabled: debugData.namelessmc.templates.front_end[template].enabled,
            isDefault: debugData.namelessmc.templates.front_end[template].is_default,
            author: debugData.namelessmc.templates.front_end[template].author,
            namelessMcVersion: debugData.namelessmc.templates.front_end[template].namelessmc_version,
            version: debugData.namelessmc.templates.front_end[template].template_version,
        }
    ));

    const templatesFloatingContent: FloatingContent = {
        extensionFloaters: templatesFloatingExtensionContent
    }

    return (
        <FloatingSection floatingContentFullSpace={true} icon={faPaintBrush} titleKey={"templates_section.templates"} floatingContent={[templatesFloatingContent]} />
    )

}

export default TemplatesSection;