import SimpleTableSection from '../SimpleTableSection';
import { faPlug } from '@fortawesome/free-solid-svg-icons';
import type { TableProps } from '../Table';
import BooleanBadge from '../utils/BooleanBadge';
import BooleanValue from '../utils/BooleanValue';
import { useContext } from 'react';
import DebugDataContext from '../../contexts/DebugDataContext';

function IntegrationsSection(): JSX.Element {
    const debugData = useContext(DebugDataContext);

    const table: TableProps = {
        columnHeaders: [
            {
                key: 'integrations_section.name',
            },
            {
                key: 'integrations_section.enabled',
            },
            {
                key: 'integrations_section.can_unlink',
            },
            {
                key: 'integrations_section.required',
            },
        ],
        rows: Object.values(debugData.namelessmc.integrations).map(integration => {
            return {
                cells: [
                    {
                        body: integration.name,
                    },
                    {
                        body: <BooleanBadge value={integration.enabled} />,
                    },
                    {
                        body: <BooleanValue value={integration.can_unlink} />,
                    },
                    {
                        body: <BooleanValue value={integration.required} />,
                    },
                ],
            };
        }),
        emptyState: {
            textKey: 'integrations_section.no_integrations',
        },
    };

    return (
        <SimpleTableSection icon={faPlug} titleKey={'integrations_section.integrations'} table={table} />
    );
}

export default IntegrationsSection;
