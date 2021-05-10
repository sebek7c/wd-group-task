import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { SEND_MESSAGE } from '../graphql/mutations/SEND_MESSAGE';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { MESSAGES_SUBSCRIPTION } from '../graphql/subscriptions/MESSAGES_SUBSCRIPTION';
import { IS_TYPING_SUBSCRIPTION } from '../graphql/subscriptions/IS_TYPING_SUBSCRIPTION';
import { GET_MESSAGES } from '../graphql/queries/GET_MESSAGES';
import { GET_ROOM } from '../graphql/queries/GET_ROOM';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = ({ route }: any) => {
	const [messages, setMessages] = useState([]);
	const [messageContent, setMessageContent] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const navigation = useNavigation();
	const { roomId, user } = route.params;

	const [sendMessage] = useMutation(SEND_MESSAGE);

	const { data: typingData, loading: typingLoading } = useSubscription(
		IS_TYPING_SUBSCRIPTION,
		{
			variables: { roomId: roomId },
		}
	);

	const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
		variables: { roomId: roomId },
	});

	const {
		data: messagesData,
		loading: messagesLoading,
		subscribeToMore,
	} = useQuery(GET_MESSAGES, {
		variables: { id: roomId },
	});

	const { data: roomData, loading: roomLoading } = useQuery(GET_ROOM, {
		variables: { id: roomId },
	});

	useEffect(() => {
		const unsubscribe = subscribeToMore({
			document: MESSAGES_SUBSCRIPTION,
			variables: { roomId: roomId },
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newMessageAdded = subscriptionData.data.messageAdded;
				return {
					room: {
						messages: [...prev.room.messages, newMessageAdded],
					},
				};
			},
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (!messagesLoading) {
			const giftedChatMessages = messagesData.room.messages.map(
				(chatMessage: any) => {
					let gcm = {
						_id: chatMessage.id,
						text: chatMessage.body,
						createdAt: chatMessage.insertedAt,
						user: {
							_id: chatMessage.id,
							name: chatMessage.name,
							avatar: chatMessage.profilePic,
						},
					};
					return gcm;
				}
			);
			setMessages(giftedChatMessages.reverse());
		}
	}, [messagesData, data]);

	useEffect(() => {
		if (!roomLoading) {
			navigation.setOptions({
				title: roomData.room.name,
			});
		}
	}, [roomData]);

	return (
		<GiftedChat
			messages={messages}
			onSend={() =>
				sendMessage({ variables: { body: messageContent, roomId: roomId } })
			}
			user={{ _id: 1, name: user.firstName }}
			renderBubble={renderBubble}
			alwaysShowSend
			scrollToBottom
			text={messageContent}
			onInputTextChanged={(text) => setMessageContent(text)}
			isTyping={true}
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

const renderBubble = (props: any) => {
	return (
		<Bubble
			{...props}
			wrapperStyle={{
				left: {
					backgroundColor: '#d0d4f6',
				},
			}}
			textStyle={{
				left: {
					color: 'black',
				},
			}}
		/>
	);
};
