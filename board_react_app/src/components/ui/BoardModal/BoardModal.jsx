import React from "react";
import cl from "./BoardModal.module.css";

const BoardModal = ({children, visible, setVisible}) => {

      const boardModalClasses = [cl.boardModal];

      if(visible) {
            boardModalClasses.push(cl.active);
      }

      return (
            <div className={boardModalClasses.join(' ')} onClick={() => setVisible(false)}>
                  <div className={cl.boardModalContent} onClick={(e) => e.stopPropagation()}>
                        {children}
                  </div>
            </div>
      );
}

export default BoardModal;