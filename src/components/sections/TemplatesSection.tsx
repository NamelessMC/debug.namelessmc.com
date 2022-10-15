import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { ExtensionFloaterProps } from "../ExtensionFloater";
import FloatingSection, { FloatingContent } from "../FloatingSection";
import {Template} from "../../types/Template";
import {useContext} from "react";
import DebugDataContext from "../../contexts/DebugDataContext";

function TemplatesSection() {

    const debugData = useContext(DebugDataContext);

    const templatesFloatingExtensionContent: ExtensionFloaterProps[] = Object.values(debugData.namelessmc.templates.front_end).map((template: Template) => (
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
        <FloatingSection icon={faPaintBrush} titleKey={"templates_section.templates"} floatingContent={[templatesFloatingContent]} />
    )

}

export default TemplatesSection;
