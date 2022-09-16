import {DebugData} from "../../types/DebugData";
import {TableColumnHeader, TableEmptyState, TableProps, TableRow} from "../Table";
import SimpleTableSection from "../SimpleTableSection";
import {faAddressBook} from "@fortawesome/free-solid-svg-icons";
import BooleanBadge from "../utils/BooleanBadge";
import BooleanValue from "../utils/BooleanValue";
import Code from "../utils/Code";

interface Props {
    debugData: DebugData;
}

function GroupsSection({
    debugData,
}: Props) {

    const tableColumnHeaders: TableColumnHeader[] = [
        {
            key: 'groups_section.id',
            classes: ['w-1/12'],
        },
        {
            key: 'groups_section.name',
            classes: ['w-1/6'],
        },
        {
            key: 'groups_section.group_html',
        },
        {
            key: 'groups_section.can_view_staff_cp',
            classes: ['w-1/12'],
        },
        {
            key: 'groups_section.staff',
            classes: ['w-1/12'],
        },
        {
            key: 'groups_section.default',
            classes: ['w-1/12'],
        },
        {
            key: 'groups_section.order',
            classes: ['w-1/12'],
        },
        {
            key: 'groups_section.force_tfa',
            classes: ['w-1/12'],
        }
    ];

    const tableRows: TableRow[] = [];
    for (const [groupId, group] of Object.entries(debugData.namelessmc.groups)) {
        tableRows.push({
            cells: [
                {
                    body: groupId,
                },
                {
                    body: group.name,
                },
                {
                    body: <Code value={group.group_html} escape={true} />,
                },
                {
                    body: <BooleanValue value={group.admin_cp} />,
                },
                {
                    body: <BooleanValue value={group.staff} />,
                },
                {
                    body: <BooleanValue value={group.default_group} />,
                },
                {
                    body: String(group.order),
                },
                {
                    body: <BooleanBadge value={group.force_tfa} />,
                }
            ]
        });
    }

    const emptyState: TableEmptyState = {
        textKey: 'groups_section.no_groups',
    }

    const table: TableProps = {
        columnHeaders: tableColumnHeaders,
        rows: tableRows,
        emptyState: emptyState,
    }

    return (
        <SimpleTableSection icon={faAddressBook} titleKey={'groups_section.groups'} table={table} />
    )
}

export default GroupsSection;
