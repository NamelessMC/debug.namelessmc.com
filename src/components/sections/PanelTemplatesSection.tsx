import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { DebugData } from "../../types/DebugData";
import { ExtensionFloaterProps } from "../ExtensionFloater";
import FloatingSection, { FloatingContent } from "../FloatingSection";

interface Props {
    debugData: DebugData;
}

function PanelTemplatesSection({
    debugData
}: Props) {

    const templatesFloatingExtensionContent: ExtensionFloaterProps[] = Object.keys(debugData.namelessmc.templates.panel).map((template: any) => (
        {
            name: debugData.namelessmc.templates.panel[template].name,
            type: 'template',
            enabled: debugData.namelessmc.templates.panel[template].enabled,
            isDefault: debugData.namelessmc.templates.panel[template].is_default,
            author: debugData.namelessmc.templates.panel[template].author,
            namelessMcVersion: debugData.namelessmc.templates.panel[template].namelessmc_version,
            version: debugData.namelessmc.templates.panel[template].template_version,
        }
    ));

    const templatesFloatingContent: FloatingContent = {
        extensionFloaters: templatesFloatingExtensionContent
    }

    return (
        <FloatingSection floatingContentFullSpace={true} icon={faPaintBrush} titleKey={"templates_section.templates"} floatingContent={[templatesFloatingContent]} />
    )

}

export default PanelTemplatesSection;