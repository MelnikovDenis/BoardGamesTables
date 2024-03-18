import React, { useState, useEffect, useMemo } from 'react';
import MemberService from '../services/MemberService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';
import CreateMemberModal from '../components/CreateMemberModal.jsx';
import UpdateMemberModal from '../components/UpdateMemberModal.jsx';

const MembersPage = () => {
      const [members, setMembers] = useState([]);
      const sortedMembers = useMemo(() => {
            return [...members].sort((a, b) => a['name'].localeCompare(b['name']));
      }, [members]);

      const [membersStatusText, setMembersStatusText] = useState(""); 
      const [fetchMembers, membersError, isMembersLoading] = useFetching(async () => {
            const response = await MemberService.readMembers();
            setMembers(response.data);
      });

      useEffect(() => {
            fetchMembers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const [createMemberModalVisible, setCreateMemberModalVisible] = useState(false);
      const [updateMemberModalVisible, setUpdateMemberModalVisible] = useState(false);
      const [updateOldValue, setUpdateOldValue] = useState(null);

      const [fetchDeleteMember, deleteMemberError, isDeleteMemberLoading] = useFetching(async (deleteId) => {
            const response = await MemberService.deleteMember(deleteId);
            setMembers(members.filter(b => b.id !== response.data.id));
      });

      useEffect(() => {
            if(membersError) {
                  setMembersStatusText('Ошибка получения данных, попробуйте обновить страницу');
            }
            else if(isMembersLoading) {
                  setMembersStatusText('Загружаем таблицу...');
            }
            else if(isDeleteMemberLoading) {
                  setMembersStatusText('Удаляем запись...');
            }
            else if(deleteMemberError) {
                  setMembersStatusText('Ошибка удаления, попробуйте обновить страницу');
            }
            else {
                  setMembersStatusText('');
            }
      }, [membersError, isMembersLoading, deleteMemberError, isDeleteMemberLoading]);

      return (
            <div className='pageDiv'>
                  <CreateMemberModal 
                        visible={createMemberModalVisible} 
                        setVisible={setCreateMemberModalVisible}
                        members={members}
                        setMembers={setMembers}/>
                  <UpdateMemberModal 
                        visible={updateMemberModalVisible} 
                        setVisible={setUpdateMemberModalVisible}
                        members={members}
                        setMembers={setMembers}
                        oldValue={updateOldValue}
                        setOldValue={setUpdateOldValue}/>
                  <div className='boardTableCaption'>Участники</div>
                  {
                        membersStatusText ?
                        <div className='boardStatusText'>{membersStatusText}</div> :
                        <BoardTable 
                              headTitles={['Имя', 'Email']}
                              fieldNames={['name', 'email']} 
                              rows={sortedMembers}
                              onCreate={() => setCreateMemberModalVisible(true)}
                              onUpdate={(oldValue) => {setUpdateMemberModalVisible(true); setUpdateOldValue(oldValue);}}
                              onDelete={(value) => fetchDeleteMember(value.id)} />
                  }
            </div>
      );
}

export default MembersPage;