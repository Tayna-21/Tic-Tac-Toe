import React from 'react';
import SendIcon from '../Icons/SendIcon.tsx';
import { InputProps } from '../../interfaces/index.ts';

const InputField: React.FC<InputProps> = ({onSubmit, onChange, value}) => {
    return (
      <form onSubmit={onSubmit}>
        <div className="message-input">
          <input type="text" placeholder="Message" onChange={onChange} value={value}/>
          <button type="submit">
            <SendIcon />
          </button>
        </div>
      </form>
    )
}

export default InputField;
