import React from 'react';
import { DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import EsNotification from '../esNotification';
import { useNavigate } from "react-router-dom";

const EsDataTable = ({rows, headers}) => {
  const navigate = useNavigate();

  if (!rows || rows.length === 0) {
    return <EsNotification kind="warning" title='No items available'/>
  }

  const handleCellClick = (key) => {
    console.log(key);
    console.log(rows);
    const selected = rows.find((rowItem) => rowItem.id === key);
    if (selected && selected.redirect) {
      navigate(selected.redirect);
    }
  }

  return (<DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow {...getRowProps({ row })} >
                {row.cells.map((cell) => (
                  <TableCell
                    onClick={() => handleCellClick(getRowProps({ row }).key)}
                    key={cell.id}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  )
}

export default EsDataTable
