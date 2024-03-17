import React from 'react';

const BoardButton = ({children, onClick, buttonClassName, divClassName}) => {
      return (
            <div className={divClassName}>
                  <button className={buttonClassName} onClick={onClick}> 
                        {children}
                  </button>
            </div>
      );
}

export default BoardButton;
