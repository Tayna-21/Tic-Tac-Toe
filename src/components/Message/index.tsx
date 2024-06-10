import React from 'react';
import { MessageProps } from '../../interfaces/index.ts';

const Message: React.FC<MessageProps> = ({nameOfClass, value}) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return(
        <div className={nameOfClass}>
          <p className="message">{value}</p>
          <span className="time">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}</span>
        </div>
    )
}

export default Message;
