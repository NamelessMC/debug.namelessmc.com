import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";
import Table, {TableProps} from "./Table";
import ExtensionFloater, {ExtensionFloaterProps} from "./ExtensionFloater";

interface Props {
    icon: IconDefinition;
    titleKey: string;
    floatingContent: FloatingContent[];
    floatingContentFullSpace?: boolean;
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
    floatingContentFullSpace
}: Props) {

    const { t } = useTranslation();

    return <div>
        <div className="section-title-floating">
            <FontAwesomeIcon icon={icon}/> { t(titleKey) }
        </div>
        <div className={`pt-2 mb-8 grid gap-4 ${!floatingContentFullSpace && 'lg:grid-cols-2'} md:grid-cols-1`}>
            { floatingContent.map((content, idx) => <FloatingSubSection key={idx} content={content} />) }
        </div>
    </div>
}

export default FloatingSection;

function FloatingSubSection({ content }: { content: FloatingContent }) {

    const { t } = useTranslation();
    
    return (
        <>
            { content.extensionFloaters ?
                content.extensionFloaters.map((floater, idx2) => {
                    return <ExtensionFloater key={idx2} {...floater}/>
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
        </>
    )
}