import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Table, { TableProps } from './Table';
import ExtensionFloater, { ExtensionFloaterProps } from './ExtensionFloater';

interface Props {
    icon: IconDefinition
    titleKey: string
    floatingContent: FloatingContent[]
}

export interface FloatingContent {
    subheadingKey?: string
    table?: TableProps
    extensionFloaters?: ExtensionFloaterProps[]
}

function FloatingSection({
    icon,
    titleKey,
    floatingContent,
}: Props): JSX.Element {
    const { t } = useTranslation();

    const gridColsClass = (floatingContent: FloatingContent[]): string => {
        const count = floatingContent.map(fc => fc?.extensionFloaters).map(ef => ef?.length).reduce(
            (a, b) => Number(a) + Number(b),
        ) || 0;

        if (count === 1) {
            return 'md:grid-cols-1';
        }

        if (count === 2 || count % 2 === 0) {
            return 'md:grid-cols-2';
        }
        console.log(count);
        return 'md:grid-cols-3';
    };

    return (
        <div>
            <div className="section-title-floating">
                <FontAwesomeIcon icon={icon} /> {t(titleKey as any)}
            </div>
            <div className={'pt-2 mb-8 grid gap-4 ' + gridColsClass(floatingContent)}>
                {floatingContent.map((content, idx) => <FloatingSubSection key={idx} content={content} />)}
            </div>
        </div>
    );
}

export default FloatingSection;

interface FloatingSubSectionProps {
    content: FloatingContent
}
function FloatingSubSection({
    content,
}: FloatingSubSectionProps): JSX.Element {
    const { t } = useTranslation();

    if (content.extensionFloaters == null) {
        return (
            <div className="section-content-floating">
                {content.subheadingKey &&
                    <div className="section-subheading">{t(content.subheadingKey as any)}</div>
                }
                {(content.table != null) &&
                    <Table {...content.table} />
                }
            </div>
        );
    }

    return <>
        {content.extensionFloaters.map((floater, idx2) => {
            return <ExtensionFloater key={idx2} {...floater} />;
        })}
    </>;
}
