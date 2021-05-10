import React from 'react';
import { View, Text } from 'react-native';
import { GET_ROOMS } from '../graphql/queries/GET_ROOMS';
import { useQuery } from '@apollo/client';
import RoomListItem from '../components/RoomListItem/room-list-item';
import {SingleRoomType, UsersRoomsDataType } from '../types/types';
import styles from './rooms-styles'

export default function Rooms() {
	const { data, loading } = useQuery<UsersRoomsDataType>(GET_ROOMS);

	if (loading) return <Text>Loading</Text>;


	return (
		<View style={styles.container}>
			{data ? data.usersRooms.rooms.map((room: SingleRoomType) => {
				return <RoomListItem key={room.id} room={room} user={data.usersRooms.user} />;
			}) : null }
		</View>
	);
}
