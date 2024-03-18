import React, { useState, useEffect } from 'react';
import BoardModal from './ui/BoardModal/BoardModal.jsx';
import BoardSelect from './ui/BoardSelect.jsx';
import BoardButton from './ui/BoardButton.jsx';
import BoardMemberService from '../services/BoardMemberService.js';
import useFetching from '../hooks/useFetching.js';

const CreateBoardMemberModal = ({visible, setVisible, members, boards, boardsMembers, setBoardsMembers}) => {
      const [selectedMemberId, setSelectedMemberId] = useState(-1);
      const [selectedBoardId, setSelectedBoardId] = useState(-1);

      const [createBoardMemberStatusText, setCreateBoardMemberStatusText] = useState("");
      const [fetchCreateBoardMember, createBoardMemberError, isCreateBoardMemberLoading] = useFetching(async () => {
            const response = await BoardMemberService.createBoardMember(setSelectedBoardId, selectedMemberId);
            setBoardsMembers([...boardsMembers, {
                  boardId: response.boardId, 
                  memberId: response.memberId, 
                  boardName: boards.find(board => board.id === selectedBoardId).name,
                  memberName: members.find(member => member.id === selectedMemberId).name,
                  memberEmail: members.find(member => member.id === selectedMemberId).email}]);
            setSelectedMemberId(-1);
            setSelectedBoardId(-1);
            setVisible(false);
      });

      useEffect(() => {
            if(createBoardMemberError) {
                  setCreateBoardMemberStatusText('Произошла ошибка, попробуйте позднее');
            }
            else if(isCreateBoardMemberLoading) {
                  setCreateBoardMemberStatusText('Отправляем запрос...');
            }
            else {
                  setCreateBoardMemberStatusText('');
            }
      }, [createBoardMemberError, isCreateBoardMemberLoading]);

      return (
            <BoardModal visible={visible} 
            setVisible={(value) => { 
                  if(!value) {
                        setSelectedMemberId(-1);
                        setSelectedBoardId(-1);
                        setCreateBoardMemberStatusText('');
                  }
                  setVisible(value);
            }}>
                  <div className='modalStatusText'>{createBoardMemberStatusText}</div>
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
                        onClick={() => fetchCreateBoardMember()}>
                        Создать
                  </BoardButton>      
            </BoardModal>
      );
}

export default CreateBoardMemberModal;
