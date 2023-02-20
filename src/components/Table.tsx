import { useTranslation } from 'react-i18next';
import type { ReactElement } from 'react';

export interface TableProps {
    columnHeaders: TableColumnHeader[]
    rows: TableRow[]
    emptyState?: TableEmptyState
}

export interface TableColumnHeader {
    key: string
    classes?: string[]
}

export interface TableRow {
    cells: TableCell[]
}

export interface TableCell {
    body: ReactElement | string | number
    title?: string
    classes?: string[]
    click?: () => void
}

export interface TableEmptyState {
    textKey: string
}

function Table({
    columnHeaders,
    rows,
    emptyState,
}: TableProps): JSX.Element {
    const { t } = useTranslation();

    return <>
        <table className="table-container">
            <tbody>
                <tr>
                    {columnHeaders.map((columnHeader, idx) => {
                        let classes = 'table-title';
                        if (columnHeader.classes != null) {
                            classes += ` ${columnHeader.classes.join(' ')}`;
                        }
                        return (
                            <th key={idx} className={classes}>{t(columnHeader.key as any)}</th>
                        );
                    })}
                </tr>

                {rows.length > 0 &&
                    rows.map((row, idx) =>
                        <tr key={idx}>{
                            row.cells.map((cell, idx2) => {
                                let classes = 'table-data';
                                if (cell.classes != null) {
                                    classes += ` ${cell.classes.join(' ')}`;
                                }
                                return (
                                    <td
                                        key={idx2}
                                        onClick={cell.click}
                                        title={cell.title}
                                        className={classes}
                                    >
                                        {cell.body}
                                    </td>
                                );
                            })
                        }</tr>,
                    )
                }

                {rows.length === 0 && (emptyState != null) &&
                    <tr>
                        <td className="table-data" colSpan={columnHeaders.length}><i>{t(emptyState.textKey as any)}</i></td>
                    </tr>
                }
            </tbody>
        </table>
    </>;
}

export default Table;
