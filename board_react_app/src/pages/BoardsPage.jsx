import React, { useState, useEffect, useMemo } from 'react';
import BoardService from '../services/BoardService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';
import CreateBoardModal from '../components/CreateBoardModal.jsx';
import UpdateBoardModal from '../components/UpdateBoardModal.jsx';

const BoardsPage = () => {
      const [boards, setBoards] = useState([]);
      const sortedBoards = useMemo(() => {
            return [...boards].sort((a, b) => a['name'].localeCompare(b['name']));
      }, [boards]);

      const [boardsStatusText, setBoardsStatusText] = useState(""); 
      const [fetchBoards, boardsError, isBoardsLoading] = useFetching(async () => {
            const response = await BoardService.readBoards();
            setBoards(response.data);
      });

      useEffect(() => {
            fetchBoards();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const [createBoardModalVisible, setCreateBoardModalVisible] = useState(false);
      const [updateBoardModalVisible, setUpdateBoardModalVisible] = useState(false);
      const [updateOldValue, setUpdateOldValue] = useState(null);

      const [fetchDeleteBoard, deleteBoardError, isDeleteBoardLoading] = useFetching(async (deleteId) => {
            const response = await BoardService.deleteBoard(deleteId);
            setBoards(boards.filter(b => b.id !== response.data.id));
      });

      useEffect(() => {
            if(boardsError) {
                  setBoardsStatusText('Ошибка получения данных, попробуйте обновить страницу');
            }
            else if(isBoardsLoading) {
                  setBoardsStatusText('Загружаем таблицу...');
            }
            else if(isDeleteBoardLoading) {
                  setBoardsStatusText('Удаляем запись...');
            }
            else if(deleteBoardError) {
                  setBoardsStatusText('Ошибка удаления, обновите страницу и попробуйте снова');
            }
            else {
                  setBoardsStatusText('');
            }
      }, [boardsError, isBoardsLoading, deleteBoardError, isDeleteBoardLoading]);

      return (
            <div className='pageDiv'>
                  <CreateBoardModal 
                        visible={createBoardModalVisible} 
                        setVisible={setCreateBoardModalVisible}
                        boards={boards}
                        setBoards={setBoards}/>
                  <UpdateBoardModal 
                        visible={updateBoardModalVisible} 
                        setVisible={setUpdateBoardModalVisible}
                        boards={boards}
                        oldValue={updateOldValue}
                        setBoards={setBoards}
                        setOldValue={setUpdateOldValue}/>
                  <div className='boardTableCaption'>Настольные игры</div>
                  {
                        boardsStatusText ?
                        <div className='boardStatusText'>{boardsStatusText}</div> :
                        <BoardTable
                              onCreate={() => setCreateBoardModalVisible(true)}
                              onUpdate={oldValue => { setUpdateBoardModalVisible(true); setUpdateOldValue(oldValue); }}
                              onDelete={value => { fetchDeleteBoard(value.id); }}
                              headTitles={['Название']}
                              fieldNames={['name']}  
                              rows={sortedBoards} />
                  } 
            </div>
      );
}

export default BoardsPage;