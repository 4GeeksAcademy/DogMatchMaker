import React, { useState } from "react";
import { ChatEngine } from 'react-chat-engine';
import { getOrCreateChat, ChatList } from 'react-chat-engine';
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
				projectID='bfbbfc3d-6972-42a7-84d3-b55e82c4891f'
				userName={props.name}
				userSecret='123456'
				renderNewChatForm={(creds) => {}}
				renderChatSettings={(creds) => {}}
			/>
		</div>
        </>
    );
};