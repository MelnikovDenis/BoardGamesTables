import React, { useState, useEffect, useMemo } from 'react';
import MemberService from '../services/MemberService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';

const MembersPage = () => {
      const [members, setMembers] = useState([]);
      const [fetchMembers, membersError] = useFetching(async () => {
            const response = await MemberService.readMembers();
            setMembers(response.data);
      });

      useEffect(() => {
            fetchMembers();
      }, []);

      const sortedMembers = useMemo(() => {
            return [...members].sort((a, b) => a['name'].localeCompare(b['name']));
      }, [members]);

      return (
            <div className='pageDiv'>
                  <BoardTable 
                        headTitles={['id', 'имя', 'email']}
                        fieldNames={['id', 'name', 'email']} 
                        rows={sortedMembers} 
                        caption='Участники'/>
            </div>
      );
}

export default MembersPage;