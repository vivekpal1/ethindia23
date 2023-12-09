import React, { useState, useEffect } from 'react';
import { useWaku, useContentPair, useLightPush, useFilterMessages } from '@waku/react';
import { ChatMessage } from './chat_message';
import ChatList from './ChatList';
import MessageInput from './MessageInput';

function RoomController({ roomTopic, userNick }) {
    const { node } = useWaku<LightNode>();
    const { encoder, decoder } = useContentPair({ contentTopic: roomTopic });
    const { push: onPush } = useLightPush({ node, encoder });
    const { messages: filterMessages } = useFilterMessages({ node, decoder });

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const newMessages = filterMessages.map(wakuMessage => ChatMessage.decode(wakuMessage.payload));
        setChatMessages(prevMessages => [...prevMessages, ...newMessages]);
    }, [filterMessages]);

    const onSend = async (text) => {
        if (!onPush || !text) return;

        const timestamp = Date.now();
        const chatMessage = ChatMessage.create({
            timestamp: timestamp,
            sender: userNick,
            message: text
        });
        const payload = ChatMessage.encode(chatMessage).finish();

        await onPush({ payload, timestamp });
        setChatMessages(prevMessages => [...prevMessages, chatMessage]);
    };

    return (
        <div className="room-controller">
            <ChatList messages={chatMessages} />
            <MessageInput onSend={onSend} />
        </div>
    );
}

export default RoomController;
