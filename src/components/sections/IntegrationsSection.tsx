import SimpleTableSection from "../SimpleTableSection";
import {faPlug} from "@fortawesome/free-solid-svg-icons";
import {DebugData} from "../../types/DebugData";
import {booleanBadge, booleanValue} from "../../utils";
import {TableProps} from "../Table";

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
                        body: booleanBadge(integration.enabled),
                    },
                    {
                        body: booleanValue(integration.can_unlink),
                    },
                    {
                        body: booleanValue(integration.required),
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
