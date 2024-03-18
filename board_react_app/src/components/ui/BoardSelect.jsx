import React from 'react';

const BoardSelect = ({options, defaultOption, setValue, value}) => {
      return (
            <div className='boardSelectDiv'>
                  <select className='boardSelect'
                        value={value}
                        onChange={e => setValue(e.target.value)}>
                        <option disabled className='boardOption' value={defaultOption.value}>
                              {defaultOption.name}
                        </option>
                  { options.map(option => 
                        <option key={option.value} 
                              value={option.value}>
                              {option.name}
                        </option>)
                  }
                  </select>
            </div>
      );
}

export default BoardSelect;
