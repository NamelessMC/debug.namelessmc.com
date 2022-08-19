import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {SectionContent} from "../types/SectionContent";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface Props {
    icon: IconDefinition;
    title: string;
    content: SectionContent[];
}

function SimpleSection({
    icon,
    title,
    content,
}: Props) {
    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> { title }
            </div>
            <div className="section-content">
                { content.map(item => (
                    <div>
                        <h5 className="section-heading">{item.header}</h5>
                        <h2 className="section-body">{item.body}</h2>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default SimpleSection;
