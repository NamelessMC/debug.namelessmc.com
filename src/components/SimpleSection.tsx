import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {SectionContent} from "../types/SectionContent";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

interface Props {
    icon: IconDefinition;
    titleKey: string;
    content: SectionContent[];
    gridCols?: number
    gap?: number
}

function SimpleSection({
    icon,
    titleKey,
    content,
    gridCols,
    gap
}: Props) {

    const { t } = useTranslation();

    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> { t(titleKey) }
            </div>
            <div className={"section-content " + (gridCols ? `grid-cols-${gridCols}` : 'grid-cols-3') + " " + (gap !== undefined ? (gap > 0 ? `gap-${gap}` : '') : 'gap-8')} >
                { content.map((item, idx) => (
                    <div key={idx}>
                        <h5 className="section-heading">{item.header}</h5>
                        <h2 className="section-body text-normal" dangerouslySetInnerHTML={{__html: item.body}}></h2>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default SimpleSection;
