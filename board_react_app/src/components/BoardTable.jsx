import React from 'react';
import BoardButton from './ui/BoardButton.jsx';

const BoardTable = ({headTitles, fieldNames, rows, onCreate, onUpdate, onDelete}) => {
      return (            
            <div className='boardTableDiv'>
            <BoardButton 
                  onClick={onCreate} 
                  divClassName='boardTableCreateButtonDiv'
                  buttonClassName='boardTableCreateButton'>
                        добавить запись
            </BoardButton>
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
                                    <th></th>
                                    <th></th>
                                    </tr>
                              </thead>
                        <tbody className='boardTableBody'>
                              { rows.map(row =>
                                    <tr className='boardTableBodyRow' key={row.id}>
                                    { fieldNames.map(fieldName => 
                                          <td className='boardTableTd' key={fieldName}>
                                                {row[fieldName]}
                                          </td>)
                                    }
                                    <td>
                                          <BoardButton 
                                                onClick={() => { onUpdate(row); }}
                                                divClassName='boardTableUpdateButtonDiv'
                                                buttonClassName='boardTableUpdateButton'>
                                                изменить
                                          </BoardButton>
                                    </td>
                                    <td>
                                          <BoardButton 
                                                onClick={() => onDelete(row)} 
                                                divClassName='boardTableDeleteButtonDiv'
                                                buttonClassName='boardTableDeleteButton'>
                                                удалить
                                          </BoardButton>
                                    </td>
                                    </tr>) }
                        </tbody>
                        </table>
            }
            </div>
      );
}

export default BoardTable;