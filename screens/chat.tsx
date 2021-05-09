import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { SEND_MESSAGE } from '../graphql/mutations/SEND_MESSAGE'
import { useMutation } from '@apollo/client';

const ChatScreen = () => {
	const [messageBody, setMessageBody] = useState('');

	// const [sendMessage] = useMutation(SEND_MESSAGE);

	// useEffect(() => {
	// 	setMessages([
	// 		{
	// 			_id: 1,
	// 			text: 'Hello developer',
	// 			createdAt: new Date(),
	// 			user: {
	// 				_id: 2,
	// 				name: 'React Native',
	// 				avatar: 'https://placeimg.com/140/140/any',
	// 			},
	// 		},
	// 		{
	// 			_id: 2,
	// 			text: 'Hello world',
	// 			createdAt: new Date(),
	// 			user: {
	// 				_id: 1,
	// 				name: 'React Native',
	// 				avatar: 'https://placeimg.com/140/140/any',
	// 			},
	// 		},
	// 	]);
	// }, []);

	// const onSend = useCallback((messages = []) => {
	// 	setMessages((previousMessages) =>
	// 		GiftedChat.append(previousMessages, messages)
	// 	);
	// }, []);

	const renderSend = (props: any) => {
		return (
			<Send {...props}>
				<View>
					<Image
						source={require('../assets/send.png')}
						style={{height: 40, width: 40 }}
					/>
				</View>
			</Send>
		);
	};

	const renderBubble = (props: any) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#2e64e5',
					},
				}}
				textStyle={{
					right: {
						color: '#fff',
					},
				}}
			/>
		);
	};

	return (
		<GiftedChat
			// onSend={() => sendMessage({ variables: { body: messageBody  } })}
			user={{
				_id: 1,
			}}
			renderBubble={renderBubble}
			alwaysShowSend
			renderSend={renderSend}
			scrollToBottom
		/>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
