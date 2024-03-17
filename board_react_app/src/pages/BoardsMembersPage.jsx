import React, { useState, useEffect, useMemo } from 'react';
import BoardMemberService from '../services/BoardMemberService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';

const BoardsMembersPage = () => {
      const [boardsMembers, setBoardsMembers] = useState([]);
      const [fetchBoardsMembers, boardsMembersError] = useFetching(async () => {
            const response = await BoardMemberService.readBoardsMembers();
            setBoardsMembers(response.data);
      });

      useEffect(() => {
            fetchBoardsMembers();
      }, []);

      const sortedBoardsMembers = useMemo(() => {
            return [...boardsMembers].map(
                  a => { 
                        return {...a, id: `${a.boardId}-${a.memberId}`}
                  })
                  .sort((a, b) => a['memberName'].localeCompare(b['memberName']));
      }, [boardsMembers]);

      return (            
            <div className='pageDiv'>
                  <BoardTable 
                        headTitles={['id', 'участник', 'email', 'настольная игра']}
                        fieldNames={['id', 'memberName', 'memberEmail', 'boardName']} 
                        rows={sortedBoardsMembers} 
                        caption='Участники - настольные игры'/>
            </div>
      );
}

export default BoardsMembersPage;
