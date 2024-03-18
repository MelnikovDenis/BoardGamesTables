import React, { useState, useEffect } from 'react';
import useFetching from '../hooks/useFetching.js';
import BoardModal from './ui/BoardModal/BoardModal.jsx';
import MemberService from '../services/MemberService.js';
import BoardInput from './ui/BoardInput.jsx';
import BoardButton from './ui/BoardButton';

const UpdateMemberModal = ({visible, setVisible, oldValue, members, setMembers}) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [updateMemberStatusText, setUpdateMemberStatusText] = useState(''); 
      
      const [fetchUpdateMember, updateMemberError, isUpdateMemberLoading] = useFetching(async () => {
            const response = await MemberService.updateMember(oldValue.id, name, email);
            setMembers([...members.filter(m => m.id !== oldValue.id), response.data]);
            setName('');
            setEmail('');
            setUpdateMemberStatusText('');
            setVisible(false);
      });

      useEffect(() => {
            setName(oldValue ? oldValue.name : '');
            setEmail(oldValue ? oldValue.email : '');
      }, [oldValue]);

      useEffect(() => {
            if(updateMemberError) {
                  setUpdateMemberStatusText('Произошла ошибка, попробуйте позднее');
            }
            else if(isUpdateMemberLoading) {
                  setUpdateMemberStatusText('Отправляем запрос...');
            }
            else {
                  setUpdateMemberStatusText('');
            }
      }, [updateMemberError, isUpdateMemberLoading]);

      return (
            <BoardModal 
                  visible={visible} 
                  setVisible={(value) => { 
                        if(!value) {
                              setUpdateMemberStatusText('');
                              setName(''); 
                              setEmail(''); 
                        }
                        setVisible(value);
                  }}>
                  <div className='modalStatusText'>{updateMemberStatusText}</div>
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
                        onClick={fetchUpdateMember}>
                        Обновить
                  </BoardButton>
            </BoardModal>
      );
}

export default UpdateMemberModal;
