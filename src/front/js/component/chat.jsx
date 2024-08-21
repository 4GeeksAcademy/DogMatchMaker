import React, { useState } from "react";
//import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
//import { ChatEngineWrapper, Socket, ChatList, ChatFeed, ChatSettings, ChatSocket, NewMessageForm } from 'react-chat-engine'
import "../../styles/home.css";

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
		<div className="chats">
        

        <ChatEngine
			height='70vh'
 			projectID='229944ba-3c50-4575-9ad6-8715d919d3dc'
 			userName={props.name}
 			userSecret='123456'
			renderNewChatForm={(creds) => {}}
            renderChatSettings={(creds) => {}}
           
 		/>
		</div>
        </>
    );
};