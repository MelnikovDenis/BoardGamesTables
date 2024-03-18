import React, { useState, useEffect } from 'react';
import useFetching from '../hooks/useFetching.js';
import BoardModal from './ui/BoardModal/BoardModal.jsx';
import BoardService from '../services/BoardService.js';
import BoardInput from './ui/BoardInput.jsx';
import BoardButton from './ui/BoardButton';

const UpdateBoardModal = ({visible, setVisible, oldValue, setOldValue, boards, setBoards}) => {
      const [name, setName] = useState('');

      const [updateBoardStatusText, setUpdateBoardStatusText] = useState(""); 
      const [fetchUpdateBoard, updateBoardError, isUpdateBoardLoading] = useFetching(async () => {
            const response = await BoardService.updateBoard(oldValue.id, name);
            setBoards([...boards.filter(b => b.id !== oldValue.id), response.data]);
            setName('');
            setUpdateBoardStatusText('');
            setOldValue(null);
            setVisible(false);
      });

      useEffect(() => {
            setName(oldValue ? oldValue.name : '');
      }, [oldValue]);

      useEffect(() => {
            if(updateBoardError) {
                  setUpdateBoardStatusText('Произошла ошибка, попробуйте позднее');
            }
            else if(isUpdateBoardLoading) {
                  setUpdateBoardStatusText('Отправляем запрос...');
            }
            else {
                  setUpdateBoardStatusText('');
            }
      }, [updateBoardError, isUpdateBoardLoading]);

      return (
            <BoardModal 
                  visible={visible} 
                  setVisible={(value) => { 
                        if(!value) {
                              setUpdateBoardStatusText('');
                              setOldValue(null);
                              setName(''); 
                        }
                        setVisible(value);
                  }}>
                  <div className='modalStatusText'>{updateBoardStatusText}</div>
                  <BoardInput 
                        divClassName='modalInputDiv'
                        inputClassName='modalInput'                        
                        value={name} 
                        setValue={setName} 
                        placeholder='Название игры'/>
                  <BoardButton 
                        divClassName='modalButtonDiv' 
                        buttonClassName='modalButton'
                        onClick={fetchUpdateBoard}>
                        Обновить
                  </BoardButton>
            </BoardModal>
      );
}

export default UpdateBoardModal;
