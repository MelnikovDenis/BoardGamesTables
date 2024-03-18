import React, { useState, useEffect } from 'react';
import useFetching from '../hooks/useFetching.js';
import BoardService from '../services/BoardService.js';
import BoardModal from './ui/BoardModal/BoardModal.jsx';
import BoardInput from './ui/BoardInput.jsx';
import BoardButton from './ui/BoardButton';

const CreateBoardModal = ({visible, setVisible, boards, setBoards}) => {
      const [name, setName] = useState('');

      const [createBoardStatusText, setCreateBoardStatusText] = useState("");
      const [fetchCreateBoard, createBoardError, isCreateBoardLoading] = useFetching(async () => {
            const response = await BoardService.createBoard(name);
            setBoards([...boards, response.data]);
            setName('');
            setCreateBoardStatusText('');
            setVisible(false);
      });

      useEffect(() => {
            if(createBoardError) {
                  setCreateBoardStatusText('Произошла ошибка, попробуйте позднее');
            }
            else if(isCreateBoardLoading) {
                  setCreateBoardStatusText('Отправляем запрос...');
            }
            else {
                  setCreateBoardStatusText('');
            }
      }, [createBoardError, isCreateBoardLoading]);

      return (
            <BoardModal 
                  visible={visible} 
                  setVisible={(value) => { 
                        if(!value) {
                              setCreateBoardStatusText('');
                              setName(''); 
                        }
                        setVisible(value);
                  }}>
                  <div className='modalStatusText'>{createBoardStatusText}</div>
                  <BoardInput 
                        divClassName='modalInputDiv'
                        inputClassName='modalInput'                        
                        value={name} 
                        setValue={setName} 
                        placeholder='Название игры'/>
                  <BoardButton 
                        divClassName='modalButtonDiv' 
                        buttonClassName='modalButton'
                        onClick={fetchCreateBoard}>
                        Создать
                  </BoardButton>
            </BoardModal>
      );
}

export default CreateBoardModal;
