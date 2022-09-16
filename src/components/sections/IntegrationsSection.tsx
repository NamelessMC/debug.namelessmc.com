import SimpleTableSection from "../SimpleTableSection";
import {faPlug} from "@fortawesome/free-solid-svg-icons";
import {DebugData} from "../../types/DebugData";
import {TableProps} from "../Table";
import BooleanBadge from "../utils/BooleanBadge";
import BooleanValue from "../utils/BooleanValue";

interface Props {
    debugData: DebugData;
}

function IntegrationsSection({
    debugData,
}: Props) {

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
            }
        }),
        emptyState: {
            textKey: 'integrations_section.no_integrations',
        },
    }

    return (
        <SimpleTableSection icon={faPlug} titleKey={'integrations_section.integrations'} table={table} />
    )
}

export default IntegrationsSection;
