import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrentMessage, addMessages } from '../../store/GameSlice.ts';
import io from 'socket.io-client';
import CrossIcon from '../Icons/CrossIcon.tsx';
import ZeroIcon from '../Icons/ZeroIcon.tsx';
import Message from '../Message/index.tsx';
import InputField from '../InputField/index.tsx';
import { RootState, AppDispatch } from '../../store/index.ts';
import { ChatProps, Data } from '../../interfaces/index.ts'

const socket = io('http://localhost:3000');

const Chat: React.FC<ChatProps> = ({playerId}) => {
    const currentMessage = useSelector((state: RootState) => state.game.currentMessage);
    const messages = useSelector((state: RootState) => state.game.messages);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        socket.on('response', (data: Data) => {

            if (data.id === playerId) {
                dispatch(addMessages(data));
            } else {
                return;
            };
        });

        return () => {
            socket.off('response');
        }
    }, []);

    const updateCurrentMessage  = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(addCurrentMessage({value: event.target.value, id: playerId}));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        socket.emit('message', {
            value: ( playerId === '1' ? currentMessage.field_1 : currentMessage.field_2 ),
            id: playerId,
        });

        dispatch(addCurrentMessage({value: '', id: playerId}));
    };

    return (
        <div className="chat">
          <header className="chat-header">
            <div className="icon-background">
              { playerId === '1'
                ? <CrossIcon />
                : <ZeroIcon /> }
            </div>
            <p>Player {playerId}</p>
          </header>
          <div className="chat-content-container">
            <main className="chat-body">
              {messages.map((message: Data, index: number) => (
                    message.id === playerId ?
                      <Message nameOfClass='message-sender' value={message.value} key={index}/> :
                      <Message nameOfClass='message-recipient' value={message.value} key={index}/>
                ))}
              <InputField
                onSubmit={handleSubmit}
                onChange={updateCurrentMessage}
                value={ playerId === '1' ?
                         currentMessage.field_1 :
                         currentMessage.field_2 }
              />
            </main>
          </div>
        </div>
    )
}

export default Chat
