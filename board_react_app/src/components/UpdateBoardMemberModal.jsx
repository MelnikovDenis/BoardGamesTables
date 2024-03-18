/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import BoardModal from './ui/BoardModal/BoardModal.jsx';
import BoardSelect from './ui/BoardSelect.jsx';
import BoardButton from './ui/BoardButton.jsx';
import BoardMemberService from '../services/BoardMemberService.js';
import useFetching from '../hooks/useFetching.js';

const UpdateBoardMemberModal = ({visible, setVisible, members, boards, boardsMembers, setBoardsMembers, oldValue, setOldValue }) => {
      const [selectedMemberId, setSelectedMemberId] = useState(-1);
      const [selectedBoardId, setSelectedBoardId] = useState(-1);

      const [updateBoardMemberStatusText, setUpdateBoardMemberStatusText] = useState("");
      const [fetchUpdateBoardMember, updateBoardMemberError, isUpdateBoardMemberLoading] = useFetching(
            async () => {
                  const response = await BoardMemberService.updateBoardMember(
                        oldValue.boardId, 
                        oldValue.memberId, 
                        selectedBoardId, 
                        selectedMemberId);
                  setBoardsMembers(
                        [...boardsMembers.filter(bm => bm.boardId !== oldValue.boardId || bm.memberId !== oldValue.memberId), 
                              {
                                    boardId: response.data.boardId, 
                                    memberId: response.data.memberId, 
                                    boardName: boards.find(board => board.id === selectedBoardId).name,
                                    memberName: members.find(member => member.id === selectedMemberId).name,
                                    memberEmail: members.find(member => member.id === selectedMemberId).email
                              }
                  ]);
                  setOldValue(null);
                  setSelectedMemberId(-1);
                  setSelectedBoardId(-1);
                  setVisible(false);
            });

      useEffect(() => {
            if(updateBoardMemberError) {
                  console.log(updateBoardMemberError);
                  setUpdateBoardMemberStatusText('Произошла ошибка, попробуйте позднее');
            }
            else if(isUpdateBoardMemberLoading) {
                  setUpdateBoardMemberStatusText('Отправляем запрос...');
            }
            else {
                  setUpdateBoardMemberStatusText('');
            }
      }, [updateBoardMemberError, isUpdateBoardMemberLoading]);

      useEffect(() => {
            setSelectedMemberId(oldValue ? oldValue.memberId : -1);
            setSelectedBoardId(oldValue ? oldValue.boardId : -1);
      }, [oldValue]);

      return (
            <BoardModal visible={visible} 
            setVisible={(value) => { 
                  if(!value) {
                        setSelectedMemberId(-1);
                        setSelectedBoardId(-1);
                        setOldValue(null);
                        setUpdateBoardMemberStatusText('');
                  }
                  setVisible(value);
            }}>
                  <div className='modalStatusText'>{updateBoardMemberStatusText}</div>
                  <BoardSelect 
                        value={selectedMemberId}
                        setValue={(value) => setSelectedMemberId(parseInt(value))}
                        defaultOption={{value: -1, name: 'Выберите email участника'}}
                        options={[...members.map(member => { return {value: member.id, name: member.email }; })]} />
                  <BoardSelect 
                        value={selectedBoardId}
                        setValue={(value) => setSelectedBoardId(parseInt(value))} 
                        defaultOption={{value: -1, name: 'Выберите игру'}}
                        options={[...boards.map(board => { return {value: board.id, name: board.name }; })]} />
                  <BoardButton 
                        divClassName='modalButtonDiv' 
                        buttonClassName='modalButton'
                        onClick={fetchUpdateBoardMember}>
                        Обновить
                  </BoardButton>      
            </BoardModal>
      );
}

export default UpdateBoardMemberModal;