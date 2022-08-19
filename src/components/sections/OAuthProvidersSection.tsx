import {DebugData} from "../../types/DebugData";
import Table, {TableColumnHeader, TableEmptyState, TableRow} from "../Table";
import {OAuthProvider} from "../../types/OAuthProvider";
import {booleanValue, goToModule} from "../../utils";

interface Props {
    debugData: DebugData;
}

function OAuthProvidersSection({
    debugData
}: Props) {
    // wip
    const tableRows: TableRow[] = debugData.namelessMc.oauthProviders.map(oauthProvider => {
        return {
            cells: [
                {
                    body: oauthProvider.providerName,
                },
                {
                    body: oauthProvider.module,
                    classes: ['hover:underline', 'cursor-pointer'],
                    click: () => goToModule(oauthProvider.module),
                },
                {
                    body: oauthProvider.class,
                }
            ],
        };
    });

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
    ];

    const emptyState: TableEmptyState = {
        textKey: 'oauth_providers_section.no_providers',
    }

    const table = <Table columnHeaders={tableColumnHeaders} rows={tableRows} emptyState={emptyState} />
}

export default OAuthProvidersSection;
