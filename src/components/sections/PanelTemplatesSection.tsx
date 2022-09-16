import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { DebugData } from "../../types/DebugData";
import { ExtensionFloaterProps } from "../ExtensionFloater";
import FloatingSection, { FloatingContent } from "../FloatingSection";
import {Template} from "../../types/Template";

interface Props {
    debugData: DebugData;
}

function PanelTemplatesSection({
    debugData
}: Props) {

    const templatesFloatingExtensionContent: ExtensionFloaterProps[] = Object.values(debugData.namelessmc.templates.panel).map((template: Template) => (
        {
            name: template.name,
            type: 'template',
            enabled: template.enabled,
            isDefault: template.is_default,
            author: template.author,
            namelessMcVersion: template.namelessmc_version,
            version: template.template_version,
        }
    ));

    const templatesFloatingContent: FloatingContent = {
        extensionFloaters: templatesFloatingExtensionContent
    }

    return (
        <FloatingSection icon={faTachometerAlt} titleKey={"panel_templates_section.panel_templates"} floatingContent={[templatesFloatingContent]} />
    )

}

export default PanelTemplatesSection;
