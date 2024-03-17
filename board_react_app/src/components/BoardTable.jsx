import React from 'react';

const BoardTable = ({headTitles, fieldNames, rows, caption}) => {
      return (            
            <div className='boardTableDiv'>
                  <div className='boardTableCaption'>{caption}</div>
                  {
                        rows.length === 0 ?
                              <div className='emptyTableText'>Таблица пуста</div> :
                              <table className='boardTable'>
                                    <thead className='boardTableHead'>
                                          <tr className='boardTableHeadRow'>
                                          { headTitles.map(headTitle => 
                                                <th key={headTitle} className='boardTableTh'>
                                                      {headTitle}
                                                </th>)}
                                          </tr>
                                    </thead>
                              <tbody className='boardTableBody'>
                                    { rows.map(row =>
                                          <tr className='boardTableBodyRow' key={row.id}>
                                          { fieldNames.map(fieldName => 
                                                <td className='boardTableTd' key={fieldName}>
                                                      {row[fieldName]}
                                                </td>)
                                          }</tr>) }
                              </tbody>
                              </table>
                  }
            </div>
      );
}

export default BoardTable;