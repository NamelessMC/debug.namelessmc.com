import {DebugData} from "../../types/DebugData";
import {TableColumnHeader, TableEmptyState, TableProps, TableRow} from "../Table";
import {capitalize, goToModule} from "../../utils";
import SimpleTableSection from "../SimpleTableSection";
import {faUserShield} from "@fortawesome/free-solid-svg-icons";
import BooleanValue from "../utils/BooleanValue";
import Empty from "../utils/Empty";
import Code from "../utils/Code";

interface Props {
    debugData: DebugData;
}

function OAuthProvidersSection({
    debugData
}: Props) {

    const tableColumnHeaders: TableColumnHeader[] = [
        {
            key: 'oauth_providers_section.name',
        },
        {
            key: 'oauth_providers_section.module',
        },
        {
            key: 'oauth_providers_section.class',
            classes: ['w-1/4'],
        },
        {
            key: 'oauth_providers_section.user_id_name',
        },
        {
            key: 'oauth_providers_section.scope_id_name',
        },
        {
            key: 'oauth_providers_section.client_id',
        },
        {
            key: 'oauth_providers_section.enabled',
        }
    ];

    const tableRows: TableRow[] = [];
    for (const [providerName, provider] of Object.entries(debugData.namelessmc.oauth_providers)) {
        tableRows.push({
            cells: [
                {
                    body: capitalize(providerName),
                },
                {
                    body: provider.module, // wtf
                    classes: ['hover:underline', 'cursor-pointer'],
                    click: () => goToModule(provider.module),
                },
                {
                    body: <Code value={provider.class} escape={true} />,
                },
                {
                    body: <Code value={provider.user_id_name} escape={true} />,
                },
                {
                    body: <Code value={provider.scope_id_name} escape={true} />,
                },
                {
                    body: <Empty value={provider.client_id} asCode={true} />,
                },
                {
                    body: <BooleanValue value={provider.enabled} />,
                }
            ],
        } as TableRow);
    }

    const emptyState: TableEmptyState = {
        textKey: 'oauth_providers_section.no_providers',
    }

    const table: TableProps = {
        columnHeaders: tableColumnHeaders,
        rows: tableRows,
        emptyState: emptyState,
    }

    return (
        <SimpleTableSection icon={faUserShield} titleKey={'oauth_providers_section.oauth_providers'} table={table} />
    )
}

export default OAuthProvidersSection;