import React, { useState, useEffect } from 'react';
import useFetching from '../hooks/useFetching.js';
import MemberService from '../services/MemberService.js';
import BoardModal from './ui/BoardModal/BoardModal.jsx';
import BoardInput from './ui/BoardInput.jsx';
import BoardButton from './ui/BoardButton';

const CreateMemberModal = ({visibile, setVisible, members, setMembers}) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');

      const [createMemberStatusText, setCreateMemberStatusText] = useState(""); 
      const [fetchCreateMember, createMemberError, isMemberLoading] = useFetching(async () => {
            const response = await MemberService.createMember(name, email);
            setMembers([...members, response.data]);
            setName('');
            setEmail('');
            setCreateMemberStatusText('');
            setVisible(false);
      });

      useEffect(() => {
            if(createMemberError) {
                  setCreateMemberStatusText('Произошла ошибка, попробуйте позднее');
            }
            else if(isMemberLoading) {
                  setCreateMemberStatusText('Отправляем запрос...');
            }
            else {
                  setCreateMemberStatusText('');
            }
      }, [createMemberError, isMemberLoading]);

      return (
            <BoardModal 
                  visible={visibile} 
                  setVisible={(value) => { 
                        if(!value) {
                              setCreateMemberStatusText('');
                              setName(''); 
                              setEmail(''); 
                        }
                        setVisible(value);
                  }}>
                  <div className='modalStatusText'>{createMemberStatusText}</div>
                  <BoardInput 
                        divClassName='modalInputDiv'
                        inputClassName='modalInput'                        
                        value={name} 
                        setValue={setName} 
                        placeholder='Имя участника'/>
                  <BoardInput 
                        divClassName='modalInputDiv'
                        inputClassName='modalInput'                        
                        value={email} 
                        setValue={setEmail} 
                        placeholder='Email'/>
                  <BoardButton 
                        divClassName='modalButtonDiv' 
                        buttonClassName='modalButton'
                        onClick={fetchCreateMember}>
                        Создать
                  </BoardButton>
            </BoardModal>
      );
}

export default CreateMemberModal;
