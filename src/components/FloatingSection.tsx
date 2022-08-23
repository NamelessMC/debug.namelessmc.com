import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";
import Table, {TableProps} from "./Table";
import ExtensionFloater, {ExtensionFloaterProps} from "./ExtensionFloater";

interface Props {
    icon: IconDefinition;
    titleKey: string;
    floatingContent: FloatingContent[];
}

export interface FloatingContent {
    subheadingKey?: string;
    table?: TableProps;
    extensionFloaters?: ExtensionFloaterProps[];
}

function FloatingSection({
    icon,
    titleKey,
    floatingContent,
}: Props) {

    const { t } = useTranslation();

    return <>
        <div className="section-title-floating">
            <FontAwesomeIcon icon={icon}/> { t(titleKey) }
        </div>
        <div className="pt-2 mb-8 grid gap-4 lg:grid-cols-2 md:grid-cols-1">
            { floatingContent.map(content => <>
                { content.extensionFloaters ?
                    content.extensionFloaters.map(floater => {
                        return <ExtensionFloater {...floater}/>
                    })
                    :
                    <div className="section-content-floating">
                        { content.subheadingKey &&
                            <div className="section-subheading">{ t(content.subheadingKey) }</div>
                        }
                        { content.table &&
                            <Table {...content.table} />
                        }
                    </div>
                }
            </>) }
        </div>
    </>
}

export default FloatingSection;
