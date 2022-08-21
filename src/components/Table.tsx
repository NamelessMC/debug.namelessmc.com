import {useTranslation} from "react-i18next";

export interface TableProps {
    columnHeaders: TableColumnHeader[];
    rows: TableRow[];
    emptyState?: TableEmptyState;
}

export interface TableColumnHeader {
    key: string;
    classes?: string[];
}

export interface TableRow {
    cells: TableCell[];
}

export interface TableCell {
    body: string;
    title?: string;
    classes?: string[];
    click?: () => void;
}

export interface TableEmptyState {
    textKey: string;
}

function Table({
    columnHeaders,
    rows,
    emptyState,
}: TableProps) {

    const { t } = useTranslation();

    return <>
        <table className="table-container">
            <tr>
                {columnHeaders.map(columnHeader => <th className={`table-title ${columnHeader.classes?.join(' ')}`}>{ t(columnHeader.key) }</th>)}
            </tr>

            {rows.length > 0 &&
                rows.map(row =>
                    <tr> {
                        row.cells.map(cell => <td onClick={cell.click} title={cell.title} className={`table-data ${cell.classes?.join(' ')}`} dangerouslySetInnerHTML={{__html: cell.body}}></td>)
                    }
                    </tr>
                )
            }

            {rows.length === 0 && emptyState &&
                <td className="table-data" colSpan={columnHeaders.length}>{ t(emptyState.textKey) }</td>
            }
        </table>
    </>
}

export default Table;
