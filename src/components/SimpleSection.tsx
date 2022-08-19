import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {SectionContent} from "../types/SectionContent";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

interface Props {
    icon: IconDefinition;
    titleKey: string;
    content: SectionContent[];
}

function SimpleSection({
    icon,
    titleKey,
    content,
}: Props) {

    const { t } = useTranslation();

    // TODO: allow grid gap class config
    // TODO: how to handle grid-cols?
    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> { t(titleKey) }
            </div>
            <div className="section-content grid-cols-3 gap-8">
                { content.map(item => (
                    <div>
                        <h5 className="section-heading">{item.header}</h5>
                        <h2 className="section-body" dangerouslySetInnerHTML={{__html: item.body}}></h2>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default SimpleSection;
