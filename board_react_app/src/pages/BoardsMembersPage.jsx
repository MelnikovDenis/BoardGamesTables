import React, { useState, useEffect, useMemo } from 'react';
import BoardMemberService from '../services/BoardMemberService.js';
import BoardService from '../services/BoardService.js';
import MemberService from '../services/MemberService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';
import CreateBoardMemberModal from '../components/CreateBoardMemberModal.jsx';
import UpdateBoardMemberModal from '../components/UpdateBoardMemberModal.jsx';

const BoardsMembersPage = () => {
      const [boardsMembers, setBoardsMembers] = useState([]);
      const [members, setMembers] = useState([]);
      const [boards, setBoards] = useState([]);


      const sortedBoardsMembers = useMemo(() => {
            return [...boardsMembers].map(
                  a => { 
                        return {...a, id: `${a.boardId}-${a.memberId}`}
                  })
                  .sort((a, b) => a['memberName'].localeCompare(b['memberName']));
      }, [boardsMembers]);

      const [boardsMembersStatusText, setboardsMembersStatusText] = useState(""); 
      const [fetchBoardsMembers, boardsMembersError, isBoardsMembersLoading] = useFetching(async () => {
            let response = await BoardMemberService.readBoardsMembers();
            setBoardsMembers(response.data);
            response = await BoardService.readBoards();
            setBoards(response.data);
            response = await MemberService.readMembers();
            setMembers(response.data);
      });

      useEffect(() => {
            fetchBoardsMembers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


      const [createBoardMemberModalVisible, setCreateBoardMemberModalVisible] = useState(false);
      const [updateBoardMemberModalVisible, setUpdateBoardMemberModalVisible] = useState(false);
      const [updateOldValue, setUpdateOldValue] = useState(null);
      const [fetchDeleteBoardMember, deleteBoardMemberError, isDeleteBoardMemberLoading] = useFetching(
            async (deleteBoardId, deleteMemberId) => {
                  await BoardMemberService.deleteBoardMember(deleteBoardId, deleteMemberId);
                  setBoardsMembers(boardsMembers.filter(bm => bm.boardId !== deleteBoardId || bm.memberId !== deleteMemberId));
            }
      );

      useEffect(() => {
            if(boardsMembersError) {
                  setboardsMembersStatusText('Ошибка получения данных, попробуйте обновить страницу');
            }
            else if(isBoardsMembersLoading) {
                  setboardsMembersStatusText('Загружаем таблицу...');
            }
            else if(isDeleteBoardMemberLoading) {
                  setboardsMembersStatusText('Удаляем запись...');
            }
            else if(deleteBoardMemberError) {
                  setboardsMembersStatusText('Ошибка удаления, обновите страницу и попробуйте снова');
            }
            else {
                  setboardsMembersStatusText('');
            }
      }, [boardsMembersError, isBoardsMembersLoading, deleteBoardMemberError, isDeleteBoardMemberLoading]);

      return (            
            <div className='pageDiv'>
                  <CreateBoardMemberModal 
                        boardsMembers={boardsMembers}
                        setBoardsMembers={setBoardsMembers}
                        boards={boards}
                        members={members}
                        visible={createBoardMemberModalVisible} 
                        setVisible={setCreateBoardMemberModalVisible}/>
                  <UpdateBoardMemberModal 
                        boardsMembers={boardsMembers}
                        setBoardsMembers={setBoardsMembers}
                        boards={boards}
                        members={members}
                        visible={updateBoardMemberModalVisible} 
                        setVisible={setUpdateBoardMemberModalVisible}
                        oldValue={updateOldValue}
                        setOldValue={setUpdateOldValue}/>
                  <div className='boardTableCaption'>Участники - игры</div>
                  {
                        boardsMembersStatusText ?
                        <div className='boardStatusText'>{boardsMembersStatusText}</div> :
                        <BoardTable 
                              headTitles={['Участник', 'Email', 'Игра']}
                              fieldNames={['memberName', 'memberEmail', 'boardName']} 
                              rows={sortedBoardsMembers} 
                              onCreate={() => setCreateBoardMemberModalVisible(true)}
                              onUpdate={(oldValue) => { setUpdateBoardMemberModalVisible(true); setUpdateOldValue(oldValue)}}
                              onDelete={(value) => fetchDeleteBoardMember(value.boardId, value.memberId)}/>
                  }                 
            </div>
      );
}

export default BoardsMembersPage;
