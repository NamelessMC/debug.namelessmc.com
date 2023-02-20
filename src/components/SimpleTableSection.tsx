import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Table, { type TableProps } from './Table';

interface Props {
    icon: IconDefinition
    titleKey: string
    table: TableProps
}

function SimpleTableSection({
    icon,
    titleKey,
    table,
}: Props): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className="section-background">
            <div className="section-title">
                <FontAwesomeIcon icon={icon} /> {t(titleKey as any)}
            </div>
            <div className="section-content mx-4">
                <Table columnHeaders={table.columnHeaders} rows={table.rows} emptyState={table.emptyState} />
            </div>
        </div>
    );
}

export default SimpleTableSection;
