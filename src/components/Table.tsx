import {useTranslation} from "react-i18next";
import {ReactElement} from "react";

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
    body: ReactElement | string;
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
            <tbody>
                <tr>
                    {columnHeaders.map((columnHeader, idx) => <th key={idx} className={`table-title ${columnHeader.classes?.join(' ')}`}>{ t(columnHeader.key) }</th>)}
                </tr>

                {rows.length > 0 &&
                    rows.map((row, idx) =>
                        <tr key={idx}> {
                            row.cells.map((cell, idx2) => {
                                if (typeof cell.body !== 'string') {
                                    return <td
                                        key={idx2}
                                        onClick={cell.click}
                                        title={cell.title}
                                        className={`table-data ${cell.classes?.join(' ')}`}
                                    >
                                        {cell.body}
                                    </td>
                                }
                                return <td
                                    key={idx2}
                                    onClick={cell.click}
                                    title={cell.title}
                                    className={`table-data ${cell.classes?.join(' ')}`}
                                    dangerouslySetInnerHTML={{__html: cell.body}}
                                ></td>
                            })
                        }
                        </tr>
                    )
                }

                {rows.length === 0 && emptyState &&
                    <tr><td className="table-data" colSpan={columnHeaders.length}><i>{ t(emptyState.textKey) }</i></td></tr>
                }
            </tbody>
        </table>
    </>
}

export default Table;
