'use client'

import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat';
import {
    Chat,
    Channel,
    ChannelList,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    useCreateChatClient,
    LoadingIndicator
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY

const user = {
    id: 'john',
    name: 'john',
    image: 'https://getstream.io/random_png/?id=user-id&name=user-name'
}


const ChatWithFriends = () => {

    const [client, setClient] = useState(null)
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        const initChat = async () => {
            const chatClient = StreamChat.getInstance(apiKey);
            await chatClient.connectUser(user, chatClient.devToken(user.id));
            const channel = chatClient.channel('messaging', 'rune', {
                name: 'Rune',
                image: 'https://getstream.imgix.net/images/random_svg/R.png',
                members: ['john'],
            });
            await channel.watch();
            setClient(chatClient)
            setChannel(channel)
        }
        initChat()
        if (client) return () => client.disconnectUser()
    }, [])

    if (!client || !channel) return <LoadingIndicator />

    return (
        <Chat client={client} theme='messaging light'>
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}

export default ChatWithFriends