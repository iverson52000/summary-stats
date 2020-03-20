import React from 'react';

const CustomForm = (props) => {
  const { handleInputChange, handleSubmit } = props;
  return (
    <div>
       <form onSubmit = { handleSubmit }>
            <input type = "text" 
              onChange = { handleInputChange } 
              placeholder = 'Enter numbers seperated by ,'
            />
            <button className = "button" onClick = { handleSubmit }> 
              Calculate
            </button>
        </form> 
    </div>
  );
};

export default CustomForm;