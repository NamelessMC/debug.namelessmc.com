import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";
import Table, {TableProps} from "./Table";

interface Props {
    icon: IconDefinition;
    titleKey: string;
    floatingContent: FloatingContent[];
}

export interface FloatingContent {
    subheadingKey?: string;
    table?: TableProps;
    content?: JSX.Element;
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
        <div className="pt-2 mb-8 grid gap-8 lg:grid-cols-2 md:grid-cols-1">
            { floatingContent.map(content => (
                <div className="section-content-floating">
                    { content.subheadingKey &&
                        <div className="section-subheading">{ t(content.subheadingKey) }</div>
                    }
                    { content.table &&
                        <Table {...content.table} />
                    }
                    { content.content &&
                        content.content // To be used for things like templates or modules, i think. will revisit when converting those sections
                    }
                </div>
            )) }
        </div>
    </>
}

export default FloatingSection;
