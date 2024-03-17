import React from 'react';
import { useNavigate } from "react-router-dom";
import BoardButton from '../components/ui/BoardButton.jsx';

const LeftMenu = ({children}) => {
      const navigate = useNavigate();
      return (
            <div className="layout">
                  <div className="leftMenu">
                        <div className="leftMenuTitle">
                              Board
                        </div>

                        <BoardButton 
                              onClick={() => navigate("/boards/page")}
                              divClassName="leftMenuButtonDiv"
                              buttonClassName="leftMenuButton">
                              Настольные игры
                        </BoardButton>

                        <BoardButton 
                              onClick={() => navigate("/members/page")}
                              divClassName="leftMenuButtonDiv"
                              buttonClassName="leftMenuButton">
                              Участники
                        </BoardButton>

                        <BoardButton 
                              onClick={() => navigate("/boardsMembers/page")}
                              divClassName="leftMenuButtonDiv"
                              buttonClassName="leftMenuButton">
                              Участники - игры
                        </BoardButton>
                  </div>
                  <div className="leftMenuChildren">
                        {children}
                  </div>
            </div>
      );
}

export default LeftMenu;