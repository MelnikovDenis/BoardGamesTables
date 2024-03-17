import React, { useState, useEffect, useMemo } from 'react';
import BoardMemberService from '../services/BoardMemberService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';

const BoardsMembersPage = () => {
      const [boardsMembers, setBoardsMembers] = useState([]);
      const sortedBoardsMembers = useMemo(() => {
            return [...boardsMembers].map(
                  a => { 
                        return {...a, id: `${a.boardId}-${a.memberId}`}
                  })
                  .sort((a, b) => a['memberName'].localeCompare(b['memberName']));
      }, [boardsMembers]);

      const [boardsMembersStatusText, setboardsMembersStatusText] = useState(""); 
      const [fetchBoardsMembers, boardsMembersError, isBoardsMembersLoading] = useFetching(async () => {
            const response = await BoardMemberService.readBoardsMembers();
            setBoardsMembers(response.data);
      });

      useEffect(() => {
            fetchBoardsMembers();
      }, []);

      useEffect(() => {
            if(boardsMembersError) {
                  setboardsMembersStatusText('Ошибка получения данных, попробуйте обновить страницу');
            }
            else if(isBoardsMembersLoading) {
                  setboardsMembersStatusText('Загружаем таблицу...');
            }
            else {
                  setboardsMembersStatusText('');
            }
      }, [boardsMembersError, isBoardsMembersLoading]);

      return (            
            <div className='pageDiv'>
                  <div className='boardTableCaption'>Участники - игры</div>
                  {
                        boardsMembersStatusText ?
                        <div className='boardStatusText'>{boardsMembersStatusText}</div> :
                        <BoardTable 
                              headTitles={['Участник', 'Email', 'Игра']}
                              fieldNames={['memberName', 'memberEmail', 'boardName']} 
                              rows={sortedBoardsMembers} />
                  }                 
            </div>
      );
}

export default BoardsMembersPage;
