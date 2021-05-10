import React, { FC } from 'react';
import { View, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SingleRoomType, UserType } from '../../types/types';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface RoomListItemProps {
	room: SingleRoomType;
	user: UserType;
}

const RoomListItem: FC<RoomListItemProps> = (props): JSX.Element => {

    const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate('Chat', { roomId: props.room.id, user: props.user})}>
			<View style={styles.container}>
				<View style={styles.roomDetails}>
					<Image
						source={require('../../assets/user.png')}
						style={{ height: 50, width: 50 }}
					/>
					<Text style={styles.text}>{props.room.name}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default RoomListItem;
