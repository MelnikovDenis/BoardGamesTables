import React, { useState, useEffect, useMemo } from 'react';
import MemberService from '../services/MemberService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';

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
      }, []);

      useEffect(() => {
            if(membersError) {
                  setMembersStatusText('Ошибка получения данных, попробуйте обновить страницу');
            }
            else if(isMembersLoading) {
                  setMembersStatusText('Загружаем таблицу...');
            }
            else {
                  setMembersStatusText('');
            }
      }, [membersError, isMembersLoading]);

      return (
            <div className='pageDiv'>
                  <div className='boardTableCaption'>Участники</div>
                  {
                        membersStatusText ?
                        <div className='boardStatusText'>{membersStatusText}</div> :
                        <BoardTable 
                              headTitles={['Имя', 'Email']}
                              fieldNames={['name', 'email']} 
                              rows={sortedMembers} />
                  }
            </div>
      );
}

export default MembersPage;