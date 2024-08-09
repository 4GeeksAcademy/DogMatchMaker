import React, { useState } from "react";
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { ChatEngineWrapper, Socket, ChatList, ChatFeed, ChatSettings, ChatSocket, NewMessageForm } from 'react-chat-engine'

export const Chat = (props) => {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}
    

    function renderChatlist() {
		return (
			<ChatList renderNewChatForm={(creds) => {}} />
		)
	}

	return (
        <>
        {props.name}{props.pass}

        <ChatEngine
 			projectID='229944ba-3c50-4575-9ad6-8715d919d3dc'
 			userName={props.name}
 			userSecret={props.pass}
            renderChatSettings={(creds) => {}}
            renderNewChatForm={(creds) => {}}
 		/>
        </>
    );
};