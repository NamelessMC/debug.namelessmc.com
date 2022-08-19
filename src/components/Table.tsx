import {useTranslation} from "react-i18next";

interface Props {
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
    classes?: string[];
    body: string;
    click?: () => void;
}

export interface TableEmptyState {
    textKey: string;
}

function Table({
    columnHeaders,
    rows,
    emptyState,
}: Props) {

    const { t } = useTranslation();

    return <>
        <table className="table-container">
            <tr>
                {columnHeaders.map(columnHeader => <th className={`table-title ${columnHeader.classes?.join(' ')}`}>{ t(columnHeader.key) }</th>)}
            </tr>

            {rows.length > 0 || !emptyState
                ?
                <tr>
                    {rows.map(row => row.cells.map(cell => <td onClick={cell.click} className={`table-data ${cell.classes?.join(' ')}`}>{cell.body}</td>))}
                </tr>
                :
                <td className="table-data" colSpan={columnHeaders.length}>{ t(emptyState.textKey) }</td>
            }
        </table>
    </>
}

export default Table;
