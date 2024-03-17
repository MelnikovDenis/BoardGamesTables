import React from 'react';

const BoardInput = ({placeholder, setValue, value, inputClassName, divClassName}) => {
      return (
            <div className={divClassName}>
                  <input type='text'
                        className={inputClassName} 
                        placeholder={placeholder}
                        onChange={(e) => setValue(e.target.value) }
                        value={value} />
            </div>
      );
}

export default BoardInput;