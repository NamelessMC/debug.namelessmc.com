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

    const DEFAULT_GRID_COLS = 3;
    const DEFAULT_GRID_GAP = 8;

    const getGridColsClass = (cols: number) => {
        switch (cols) {
            case 3: return 'grid-cols-3';
            case 4: return 'grid-cols-4';
            case 5: return 'grid-cols-5';
        }
    }

    const getGridGapClass = (gap: number) => {
        switch (gap) {
            case 8: return 'gap-8';
        }
    }

    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> { t(titleKey) }
            </div>
            <div className={"section-content " + getGridColsClass(gridCols ?? DEFAULT_GRID_COLS) + " " + getGridGapClass(gap ?? DEFAULT_GRID_GAP)} >
                { content.map((item, idx) => (
                    <div key={idx}>
                        <h5 className="section-heading">{item.header}</h5>
                        <h2 className="section-body text-normal" dangerouslySetInnerHTML={{ __html: item.body }}></h2>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default SimpleSection;
