import React, { useState, useEffect, useMemo } from 'react';
import BoardService from '../services/BoardService.js';
import BoardTable from '../components/BoardTable.jsx';
import useFetching from '../hooks/useFetching.js';

const BoardsPage = () => {
      const [boards, setBoards] = useState([]);
      const [fetchBoards, boardsError] = useFetching(async () => {
            const response = await BoardService.readBoards();
            setBoards(response.data);
      });

      useEffect(() => {
            fetchBoards();
      }, []);

      const sortedBoards = useMemo(() => {
            return [...boards].sort((a, b) => a['name'].localeCompare(b['name']));
      }, [boards]);

      return (
            <div className='pageDiv'>
                  <BoardTable 
                        headTitles={['id', 'название']}
                        fieldNames={['id', 'name']}  
                        rows={sortedBoards} 
                        caption='Настольные игры'/>
            </div>
      );
}

export default BoardsPage;
